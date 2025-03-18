import { Box, Button, MenuItem, MenuList, Typography } from "@mui/material"
import { useContext } from "react"
import { tokenContext } from "./ProfileHandler"
import { MealContext } from "./App";
import axios from "axios";

export const Profile = () => {
   const [token,setToken] = useContext(tokenContext);
   const [mealplan,setMealplan] = useContext(MealContext);

   const mealplanGetter = async() => {
    try {
        const response = await axios.get("http://localhost:5000/api/auth/getPlan",{headers:{"auth-token":localStorage.getItem("token")}});
        setMealplan(response.data.meals);
        console.log("mealplan retrived!");
    } catch (error) {
        console.log(error.msg);
    }
    
   }

   const mealplanSetter = async() => {
    try {
        const response = await axios.post("https://smartplan-backend.onrender.com/api/auth/setPlan",
            {meals:mealplan,},
            {headers:{"auth-token":localStorage.getItem("token")}},
    );
        console.log("mealplan setted!!")
    } catch (error) {
        console.log(error);
    }
    
   }

 return(
    <Box sx={{display:"flex",flexDirection:"column",maxWidth:"200px",padding:"10px"}}>
           <Typography sx={{alignSelf:"center"}}>My Profile</Typography>
            <Button variant="outlined" sx={{marginBlock:"5px"}} size="small" onClick={mealplanGetter}>Get saved plan</Button>
            <Button variant="outlined" sx={{marginBlock:"5px"}} size="small" onClick={mealplanSetter}>Save curent plan</Button>
            <Button sx={{marginBlock:"5px"}} size="small" variant="contained" onClick={()=>{setToken("");}}>Logout</Button>
    </Box>

)}