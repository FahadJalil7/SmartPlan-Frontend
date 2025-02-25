import axios from 'axios';

export const getRecipeInfo =  async (recipeId) => {
    console.log(recipeId);
    
    try{
        const API_BASE_URL = "http://localhost:5000/api"; // Backend URL
        const response = await axios.get(`${API_BASE_URL}/recipes/${recipeId}`,{});
        console.log("GRI",response);
        return(response.data);
    }catch(error){console.log("Error",error)}
   
}