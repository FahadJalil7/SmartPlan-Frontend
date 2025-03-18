import axios from "axios"

export const getRecipeInfoBulk = async(listIds) => {

    try {
        const listids2 = ""
        const API_BASE_URL = "https://smartplan-backend.onrender.com/api"; 
        const response = await axios.get(`${API_BASE_URL}/recipes/informationBulk`,{params:{listIds}});

        return response.data

        
    } catch (error) {
        console.log("bulk info error:", error)
        
    }


}