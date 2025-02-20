import React, { useContext, useState } from "react";
import axios from "axios";
import {LinearProgress} from "@mui/material";
import { Aichat } from "./utiltyFunctions/AiChat";
import { availableRecipeContext } from "./App";
import { blue } from "@mui/material/colors";
import {Typography} from "@mui/material";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading,setLoading] = useState(false);
  const [recipe,setRecipes] = useContext(availableRecipeContext);

  const sendMessage = async () => {
    if (!input.trim()) return;
    

    // Add user's message to chat
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("")

    try {
      // Send request to Express API
      setLoading(true)
      /*
      const response = await axios.post("http://localhost:5000/api/diet/chat", {
        message: input,
      });
      */

      const response = await Aichat({messages:input});
      if (response){setLoading(false)}
      console.log("response to the function wit erthing",response)
      // Add AI's response to chat
      const aiMessage = { role: "assistant", content: response[0]};
      setMessages((prev) => [...prev, aiMessage]);
      setRecipes([...response[1].data]);
      

    } catch (error) {
      console.error("Error:", error);
    }

    
  };


  const handlekeydown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.role === "user" ? styles.userMsg : styles.aiMsg}>
            <Typography component={"h1"} sx={{color:'black'}}>{msg.content}</Typography>
          </div>
        ))}
      </div>
      {loading?<LinearProgress variant="indeterminate"></LinearProgress>:<></>}
      <div style={styles.inputBox}>
        <input
          type="text"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={handlekeydown}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

// Inline styles for basic styling
const styles = {
  container: { maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center", },
  chatBox: { border: "1px solid #ddd", padding: "10px", minHeight: "150px", overflowY: "auto" },
  userMsg: { background: "#DCF8C6", padding: "8px", borderRadius: "5px", margin: "5px", textAlign: "right"},
  aiMsg: { background: "#E8E8E8", padding: "8px", borderRadius: "5px", margin: "5px", textAlign: "left" },
  inputBox: { display: "flex", marginTop: "10px" },
  input: { flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "5px" },
  button: { marginLeft: "10px", padding: "10px 15px", border: "none", background: "#007bff", color: "#fff", cursor: "pointer", borderRadius: "5px" },
};

export default Chat;
