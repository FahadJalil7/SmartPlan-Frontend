import axios from "axios";


export const SearchRecipesByIng = async(number=5,minCalories,minCarbs,minProtein) =>{

    try{
        console.log("just checkig if", number,minCalories,minCarbs,minProtein)
        const response = await axios.get("http://localhost:5000/api/recipes/findByNutrients",{
            params:{
                number,
                minCalories,
                minCarbs,
                minProtein,
            }
            });
    
        console.log("result of searchRecipeByIng: ", response);
        return(response.data);

    }
    catch(error){
        console.log("SearchRecipesByIng rand into this Error:", error );
        return("error")
    }


}