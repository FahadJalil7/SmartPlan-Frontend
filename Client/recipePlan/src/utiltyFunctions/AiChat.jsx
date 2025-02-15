
"http://localhost:5000/api/diet/chat"

import axios from "axios"
import { useEffect, useState } from "react";

export const Aichat = async ({messages}) => {

    
        try{
            const response = await axios.post("http://localhost:5000/api/diet/chat", {message: messages});
            console.log("ai response",response)
            
            const minCalories = response.data.minCalorie;
            const minProtein = response.data.minProtein;
            const minCarbs = response.data.minCarb;
            const ing = response.data.includedIng;
            //const [aiMeals,setAiMeals] = useState([])
        
            
            const res = await axios.get("http://localhost:5000/api/recipes/findByNutrients",{
            params:{
                number:5,
                minCalories,
                minCarbs,
                minProtein,
            }
            });
    
            console.log("react end results spoonacular:", res ) 
            
            //return (response.data.messageToUser);
            
           return ([response.data.messageToUser,res])
    
        } catch(error){
            console.log("ERROR:,", error)
            return('some error at AI:')
        }
    }
    

    

   
