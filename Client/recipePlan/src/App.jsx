import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Box, TextField, Typography, ToggleButton, Drawer, Divider } from '@mui/material';
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
import { SearchRecipesByIng } from './utiltyFunctions/SearchRecipesByIng';
import { getRecipeInfo } from './utiltyFunctions/getRecipeInfo';
import { getRecipeInfoBulk } from './utiltyFunctions/getRecipeInfoBulk';
import mealdata from './utiltyFunctions/testMealplan.json'
import RecipeCardSkeleton from './RecipeCardSkeleton';
import { ProfileHandler } from './ProfileHandler';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function App() {
  const [recipes,setRecipes] = useState([])
  const [mealPlan, setMealPlan] = useState(
      Array.from({ length: 7 }, () => ({
        breakfast: null,
        lunch: null,
        dinner: null,
      }))
    );
  
 //const [mealPlan,setMealPlan] = useState(mealdata)
  const [Searchquery,SetSearchquery] = useState("");
  const [userSetting,setUserSetting] = useState(false);
  const [minCalories,setMinCalories] = useState(0);
  const [minCarbs,setMinCarbs] = useState(0);
  const [minProtein,setMinProtien] = useState(0);
  const [loading,setLoading] = useState(false);
  const [drawer,setDrawer] = useState(false);

  const handleShuffle = async function(){
    if(userSetting){
      console.log('!!!')
      var data  = await SearchRecipesByIng(8,minCalories,minCarbs,minProtein);   
    }else{
      var data  = await fetchRandomRecipes(8);
    }
      setRecipes([...data])
      console.log("Shuffle results:",data)
    
  }

  const handleSearch = async function(event){
    const newSearchquery = event.target.value;
    SetSearchquery(newSearchquery);
    if(userSetting){
      //var data = await SearchRecipesByIng(5,minCalories,minCarbs,minProtein);// this needs to have search query somehow
      var data = await SearchRecipes(8,newSearchquery,minCalories,minCarbs,minProtein);
    }else{
      var data = await SearchRecipes(8,newSearchquery);
    }
    setRecipes([...data])
    console.log("Search results",data)
  }

  const handleRandomFill = async function(){
    if(userSetting){
      setLoading(true)
      var data = await SearchRecipesByIng(21,minCalories,minCarbs,minProtein);
    }else{
      setLoading(true)
       var data = await fetchRandomRecipes(21);
    }
    const temparr = [...data]; 
    setLoading(false)
    setMealPlan((prev)=>{
      const plan = [...prev]; //i think this is unnessacery since we overwite anyway 
      for(let i=0;i<7;i++){
        plan[i].breakfast = temparr[3*i]; 
        plan[i].lunch = temparr[3*i+1];
        plan[i].dinner = temparr[3*i+2];
        //complety overwrites the current mealplan, conversly we couldve just checked if plan[i] is filled before setting it
      }
      return plan;
    });
    console.log("mealplan after fill",mealPlan)
  }

  return (
    <MealContext.Provider value={[mealPlan,setMealPlan]}>
    <availableRecipeContext.Provider value={[recipes,setRecipes]}>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      <Drawer open={drawer} onClose={()=>{setDrawer(false)}}><Box sx={{width:"200px"}}><ProfileHandler/></Box>
      <Divider/>
        <Box sx={{display:"flex",flexDirection:"column",maxWidth:"200px",padding:"10px"}}>
          <TextField sx={{marginBlock:"5px"}} onChange={(e)=>{setMinCalories(e.target.value)}} value={minCalories} disabled={!userSetting} type='number' label="calories"></TextField>
          <TextField sx={{marginBlock:"5px"}} onChange={(e)=>{setMinProtien(e.target.value)}} value={minProtein} disabled={!userSetting} type='number' label='protien'></TextField>
          <TextField sx={{marginBlock:"5px"}} onChange={(e)=>{setMinCarbs(e.target.value)}} value={minCarbs} disabled={!userSetting} type='number' label='carbs'></TextField>
          <ToggleButton sx={{marginBlock:"5px"}} selected={!userSetting} onChange={() => setUserSetting((prev) => !prev)}>Random</ToggleButton>
        </Box>
      </Drawer>
      <Box sx={{display:'flex',flexDirection:'row',justifyContent:"space-between", margin:"10px"}}>
        <Typography variant="h4" component={"h4"}> MealPanner</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center"sx={{ maxWidth: 800 }}>
          <Button variant="contained" onClick={()=>{setDrawer(true)}}>User Profile</Button>
          <HandleShoppingList recipesList={recipes}></HandleShoppingList>
          <Button variant='outlined' onClick={()=>handleShuffle()}>Shuffle Recipes</Button>
          <TextField type='search' id="outlined-basic" label="Search Recipes" variant="outlined"  value={Searchquery} onChange={(event)=>{handleSearch(event)}}/>
          <Button variant='outlined' onClick={()=>handleRandomFill()}>Fill Mealplan</Button>
        </Stack> 
      </Box>
      <Box sx={{display:'flex', width:"100%",paddingTop:"15px" }}>
        <Chat setMinCalories={setMinCalories} setMinCarbs={setMinCarbs} setMinProtein={setMinProtien} setUserSetting={setUserSetting}></Chat>
        <WeeklySummary></WeeklySummary>
      </Box>
      <LoadingContext.Provider value={[loading,setLoading]}>
        <MealPlanner recipeList={recipes}></MealPlanner>
      </LoadingContext.Provider>
      </ThemeProvider>
    </availableRecipeContext.Provider> 
    </MealContext.Provider>
  )



  


}

export const MealContext = React.createContext();
export const availableRecipeContext = React.createContext();
export const LoadingContext = React.createContext();
export default App
