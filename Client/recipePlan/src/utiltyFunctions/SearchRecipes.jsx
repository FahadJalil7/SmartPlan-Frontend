import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL

export const SearchRecipes = async (number = 5,query) => {
  try {
    console.log("search query:",query)
    const response = await axios.get(`${API_BASE_URL}/recipes/search`, {
      params: { number,query },
    });
    console.log("search results",response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching random recipes:", error.message);
    throw error;
  }
};

export default SearchRecipes