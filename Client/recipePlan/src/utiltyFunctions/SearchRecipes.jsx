import axios from "axios";

const API_BASE_URL = "https://smartplan-backend.onrender.com/api"; // Backend URL

export const SearchRecipes = async (number = 5,query,minCalories=0,minCarbs=0,minProtein=0) => {
  try {
    console.log('working')
    const response = await axios.get(`${API_BASE_URL}/recipes/search`, {
      params: { number,query,minCalories,minCarbs,minProtein }
    });
    return response.data;
  } catch (error) {
    console.error("Error Searching recipes:", error.message);
    throw error;
  }
};

export default SearchRecipes