
"http://localhost:5000/api/diet/chat"

import axios from "axios"
import { useEffect, useState } from "react";

export const Aichat = async ({messages}) => {

    
        try{
            const response = await axios.post("https://smartplan-backend.onrender.com/api/diet/chat", {message: messages});
            if(response.data[1] == 0){
                const minCalories = response.data[0].minCalorie;
                const minProtein = response.data[0].minProtein;
                const minCarbs = response.data[0].minCarb;
                const ing = response.data[0].includedIng;
                
                const res = await axios.get("https://smartplan-backend.onrender.com/api/recipes/findByNutrients",{
                params:{
                    number:5,
                    minCalories,
                    minCarbs,
                    minProtein,
                }
                });
    
                console.log("react end results spoonacular:", res, minCalories,minCarbs,minProtein) 
            
                //return (response.data.messageToUser);
            
                return ([response.data[0].messageToUser,res,minCalories,minCarbs,minProtein])
            }else{
                return[response.data[0]]
            }
            
    
        } catch(error){
            console.log("ERROR at AiChat:,", error)
            throw error
        }
    }
    

    

   
