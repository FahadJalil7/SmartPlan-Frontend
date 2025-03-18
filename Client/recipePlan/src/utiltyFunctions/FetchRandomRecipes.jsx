import axios from "axios";
import { useState } from "react";

const API_BASE_URL = "https://smartplan-backend.onrender.com/api"; // Backend URL

export const fetchRandomRecipes = async (number = 5) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recipes/random`, {
      params: { number },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching random recipes:", error.message);
    throw error;
  }
};

