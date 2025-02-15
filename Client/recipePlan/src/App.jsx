import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import Stack from '@mui/material/Stack'
import RecipeCard from './recipeCard';
import MealPlanner from './imp2/mealplanner';
import { fetchRandomRecipes } from './utiltyFunctions/FetchRandomRecipes';
import HandleShoppingList from './ShoppingList';
import SearchRecipes from './utiltyFunctions/SearchRecipes';
import WeeklySummary from './WeeklySummary';
import Chat from './DietAi';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function App() {
  const [recipes,setRecipes] = useState([{"id":665744,"title":"Zucchini Flutes Piped With Basil Ricotta Mousse","ingredients":[{"name":"zucchini","amount":2,"unit":"medium"},{"name":"basil leaves - torn","amount":0.25,"unit":"cup"},{"name":"garlic","amount":2,"unit":"tablespoons"},{"name":"ricotta","amount":1.5,"unit":"cups"},{"name":"parmesan cheese","amount":4,"unit":"tablespoons"},{"name":"extra virgin olive oil","amount":1,"unit":"tablespoon"}],"link":"https://www.foodista.com/recipe/LZDJVWT5/zucchini-flutes-piped-with-basil-ricotta-mousse","image":"https://img.spoonacular.com/recipes/665744-556x370.jpg"},{"id":715432,"title":"Buffalo Ranch Chicken Dip","ingredients":[{"name":"chicken breasts","amount":4,"unit":""},{"name":"cream cheese","amount":16,"unit":"oz"},{"name":"green onions","amount":0.5,"unit":"cup"},{"name":"louisiana hot sauce","amount":12,"unit":"oz"},{"name":"paul prudhommes poultry seasoning","amount":7,"unit":"servings"},{"name":"ranch dressing","amount":16,"unit":"oz"},{"name":"sharp cheddar cheese","amount":8,"unit":"oz"}],"link":"https://www.pinkwhen.com/buffalo-ranch-chicken-dip/","image":"https://img.spoonacular.com/recipes/715432-556x370.jpg"},{"id":656723,"title":"Pork Carnitas Tacos","ingredients":[{"name":"water","amount":7,"unit":"cups"},{"name":"pork butt","amount":2,"unit":"pounds"},{"name":"garlic","amount":4,"unit":"cloves"},{"name":"sea salt and ground pepper","amount":8,"unit":"servings"},{"name":"olive oil","amount":1,"unit":"teaspoon"},{"name":"orange juice","amount":0.5,"unit":"cup"},{"name":"milk","amount":0.5,"unit":"cup"},{"name":"corn tortillas","amount":24,"unit":""},{"name":"salsa fresca","amount":8,"unit":"servings"},{"name":"avocado","amount":1,"unit":"slices"},{"name":"cilantro","amount":8,"unit":"servings"},{"name":"onion","amount":8,"unit":"servings"},{"name":"limes","amount":8,"unit":"servings"}],"link":"https://www.foodista.com/recipe/76ZPMZJN/pork-carnitas-tacos","image":"https://img.spoonacular.com/recipes/656723-556x370.jpg"}])
  const [mealPlan, setMealPlan] = useState(
      Array.from({ length: 7 }, () => ({
        breakfast: null,
        lunch: null,
        dinner: null,
      }))
    );
  const [Searchquery,SetSearchquery] = useState("");
   

  const handleShuffle = async function(){
    const data  = await fetchRandomRecipes(10)
    setRecipes([...data])
    console.log("Shuffle results:",data)

  }

  const handleSearch = async function(Searchquery){
    const data = await SearchRecipes(10,Searchquery)
    setRecipes([...data])
    console.log("Search results",data)

  }

  const handleRandomFill = async function(){
    const data = await fetchRandomRecipes(21);
    const temparr = [...data]; 
    setMealPlan((prev)=>{
      const plan = [...prev];
      for(let i=0;i<7;i++){
        plan[i].breakfast = temparr[3*i];
        plan[i].lunch = temparr[3*i+1];
        plan[i].dinner = temparr[3*i+2];
        //complety overwrites the current mealplan
      }
      return plan;
    });
  }

  return (
    <MealContext.Provider value={[mealPlan,setMealPlan]}>
    <availableRecipeContext.Provider value={[recipes,setRecipes]}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline></CssBaseline>
      <Box sx={{display:'flex',flexDirection:'row'}}>
      <HandleShoppingList recipesList={recipes}></HandleShoppingList>
      <Button variant='outlined' onClick={()=>handleShuffle()}>Shuffle Recipes</Button>
      <TextField id="outlined-basic" label="Search Recipes" variant="outlined"  value={Searchquery} onChange={(event)=>{handleSearch(Searchquery),SetSearchquery(event.target.value)}}/>
      <Button variant='outlined' onClick={()=>handleRandomFill()}>Fill Mealplan</Button>
      </Box>
      <MealPlanner recipeList={recipes}></MealPlanner>
      <WeeklySummary></WeeklySummary>
      <Chat></Chat>
      </ThemeProvider>
    </availableRecipeContext.Provider> 
    </MealContext.Provider>
  )


}

export const MealContext = React.createContext();
export const availableRecipeContext = React.createContext();
export default App
