import axios from "axios";
import { getRecipeInfoBulk } from "./getRecipeInfoBulk";


export const SearchRecipesByIng = async(number=5,minCalories,minCarbs,minProtein) =>{
    console.log("test 1");

    try{
        const response = await axios.get("https://smartplan-backend.onrender.com/api/recipes/findByNutrients",{
            params:{
                number,
                minCalories,
                minCarbs,
                minProtein,
            }
            });
    
        return response.data

    }
    catch(error){
        console.log("SearchRecipesByIng ran into this Error:", error);
        throw ("error")
    }


}