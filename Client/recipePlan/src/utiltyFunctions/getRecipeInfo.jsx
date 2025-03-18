import axios from 'axios';

export const getRecipeInfo =  async (recipeId) => {
    console.log(recipeId);
    
    try{
        const API_BASE_URL = "https://smartplan-backend.onrender.com/api"; // Backend URL
        const response = await axios.get(`${API_BASE_URL}/recipes/${recipeId}`,{});
        return(response.data);
    }catch(error){
        console.log("Eror at getRecipeInfo",error)
        throw error
    
    }
   
}