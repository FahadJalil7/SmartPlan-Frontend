import { useContext, useState } from "react"
import { Box, TextField, Typography, ToggleButton, Button } from '@mui/material';
import { toUnitless } from "@mui/material/styles/cssUtils";
import axios from "axios";
import { tokenContext } from "./ProfileHandler";


export const LoginPage = () =>{
    const [token,setToken] = useContext(tokenContext);
    const [signupButton,setSignupButton] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [signUpName,setSignUpName] = useState("");
    const [signUpPassword,setSignUpPassword] = useState("");
    const [Error,setError] = useState(false);
    

    const handleLogin = async() =>{
        try {
            const response = await axios.post("https://smartplan-backend.onrender.com/api/auth/login",{username:username,password:password});
            setToken(response.data.token);
            setError(false)
            console.log("LOGGED IN!!")
        } catch (error) {
            console.log("invalid credintials")
            setError(true)
        }
    }

    const handleRegister = async()=>{

        try {
            const response = await axios.post("https://smartplan-backend.onrender.com/api/auth/register",{username:signUpName,password:signUpPassword});
            setToken(response.data.token)
            setError(false)
            console.log("SIGNED UP!!")
        } catch (error) {
            setError(true)
            console.log("A user with this username already exists, please pick another username")
        }


    }


    return(
        <>
            {signupButton?

            <Box sx={{display:"flex",flexDirection:"column",maxWidth:"200px",padding:"10px"}}>
            <TextField error={Error} onChange={(e)=>{setSignUpName(e.target.value)}} value={signUpName} label="Username" variant="standard" sx={{marginBlock:"5px"}}/>
            <TextField error={Error} onChange={(e)=>{setSignUpPassword(e.target.value)}} value={signUpPassword} type="password" label="Password" variant="standard" sx={{margin:"5px"}}/>
            <Button  onClick={handleRegister} size="small" variant="contained" sx={{marginBlock:"5px"}}>Register</Button>
            <Button  onClick={()=>{setSignupButton(false)}} size="small" variant="outlined" sx={{marginBlock:"5px"}}>Login</Button>
            </Box>

            :
            <Box sx={{display:"flex",flexDirection:"column",maxWidth:"200px",padding:"10px"}}>
            <TextField error={Error} onChange={(e)=>{setUsername(e.target.value)}} value={username} label="Username" variant="standard" sx={{marginBlock:"5px"}}/>
            <TextField error={Error} onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" label="Password" variant="standard" sx={{margin:"5px"}}/>
            <Button  onClick={handleLogin} size="small" variant="contained" sx={{marginBlock:"5px"}}>Login</Button>
            <Button  onClick={()=>{setSignupButton(true)}} size="small" variant="outlined" sx={{marginBlock:"5px"}}>signup</Button>
            </Box>
            }
        </>
    )
}