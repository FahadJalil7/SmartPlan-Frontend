import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {LinearProgress,Button,Box,} from "@mui/material";
import { Aichat } from "./utiltyFunctions/AiChat";
import { availableRecipeContext } from "./App";
import { blue } from "@mui/material/colors";
import {Typography} from "@mui/material";

const Chat = ({setMinCalories,setMinCarbs,setMinProtein,setUserSetting}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading,setLoading] = useState(false);
  const [recipe,setRecipes] = useContext(availableRecipeContext);

  const sendMessage = async () => {
    if (!input.trim()) return;
    

    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    
    /*
    try {
      
      setLoading(true)
      

      const response = await Aichat({messages});
      if (response){setLoading(false)}
      if (response.length>2){
        // Add AI's response to chat
        const aiMessage = { role: "assistant", content: response[0]};
        setMessages((prev) => [...prev, aiMessage]);
        setRecipes([...response[1].data]);
        setMinCalories(response[2]);
        setMinCarbs(response[3]);
        setMinProtein(response[4]);
        setUserSetting(true);
      }else{setMessages((prev) => [...prev,  {role: "assistant", content: response[0]}   ]);}
    
    } catch (error) {
      console.error("Error at DietAi:", error);
    }
    */
    
  };



  useEffect(()=>{

    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "assistant") return; // Prevent duplicate API calls
    
    const fetchResponse = async() =>{
      try {
      
        setLoading(true)
        
  
        const response = await Aichat({messages});
        if (response){setLoading(false)}
        if (response.length>2){
          // Add AI's response to chat
          const aiMessage = { role: "assistant", content: response[0]};
          setMessages((prev) => [...prev, aiMessage]);
          setRecipes([...response[1].data]);
          setMinCalories(response[2]);
          setMinCarbs(response[3]);
          setMinProtein(response[4]);
          setUserSetting(true);
        }else{setMessages((prev) => [...prev,  {role: "assistant", content: response[0]}   ]);}
      
      } catch (error) {
        console.error("Error at DietAi:", error);
      }

    }
    fetchResponse();
  
  },[messages]);



  const handlekeydown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.role === "user" ? styles.userMsg : styles.aiMsg}>
            <Typography component={"h1"} sx={{color:'black'}}>{msg.content}</Typography>
          </div>
        ))}
      </Box>
      {loading?<LinearProgress variant="indeterminate"></LinearProgress>:<></>}
      <Box sx={styles.inputBox}>
        <input
          type="text"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={handlekeydown}
          placeholder="Type your message..."
          style={styles.input}
        />
        <Button size="small" onClick={sendMessage} sx={styles.button}>Send</Button>
      </Box>
    </Box>
  );
};


const styles = {
  container: { margin:"20px",width:"50%", padding: "20px", textAlign: "center",},
  chatBox: { border: "1px solid #ddd", padding: "10px", maxHeight: "200px", overflowY: "auto",pr: 1,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(144, 202, 249, 0.3)',
      borderRadius: '4px',
    },},
  userMsg: { background: "#DCF8C6", padding: "8px", borderRadius: "5px", margin: "5px", textAlign: "right"},
  aiMsg: { background: "#E8E8E8", padding: "8px", borderRadius: "5px", margin: "5px", textAlign: "left" },
  inputBox: { display: "flex", marginTop: "10px" },
  input: { flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "5px" },
  button: { marginLeft: "10px", padding: "10px 15px", border: "none", background: "#007bff", color: "#fff", cursor: "pointer", borderRadius: "5px" },
};

export default Chat;
