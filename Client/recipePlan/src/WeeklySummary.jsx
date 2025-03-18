import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MealContext } from "./App";

export default function WeeklySummary(){
    
    const [mealplan,setmealplan] = useContext(MealContext)
    //weekly total values below
    const [calories,setCalories] = useState(0)
    const [fat,setFat] = useState(0)
    const [carbs,setCarbs] = useState(0)
    const [protein,setProtein] = useState(0)

    

    //mealpalan strucutred something like this => [{beakfast:{recipe},lunch:,dinner:},{},{},{},{},{},{}] , mealpan => day
    //Change the code below because states are asynchronus so setstate(old + new) is unrealiable
    useEffect(()=>{

        mealplan.map((day,index)=>{ //day
            Object.keys(day).map((meal)=>{
                //console.log(day[meal].title,day[meal].protein);

                if(day[meal]){
                    setCalories((prev)=> (prev+ day[meal].calories))
                    setFat((prev)=> (prev+ day[meal].fat))
                    setCarbs((prev)=> (prev+ day[meal].carbs))
                    setProtein((prev)=> (prev + day[meal].protein))

                }
            })
        })

    },[mealplan])

    

    return(
        <Box sx={{width:"50%",margin:"20px",marignBlockEnd:"30px"}}>
            <Typography variant="h5" gutterBottom>Weekly Nutrition Summary</Typography>
            <Stack spacing={2} sx={{ flex: 1}}>
                <Typography sx={{margin:0}} variant="caption">Calories</Typography>
                <LinearProgress color="primary" variant="determinate" value={(calories / 17000) * 100 > 100 ? 100 : (calories / 17000) * 100}></LinearProgress>
                <Typography variant="caption">Carbs</Typography>
                <LinearProgress color="secondary" variant="determinate" value={(carbs / 2150) * 100 > 100 ? 100 : (carbs / 2150) * 100}></LinearProgress>
                <Typography variant="caption">Protein</Typography>
                <LinearProgress color="success" variant="determinate" value={(protein / 500) * 100 > 100 ? 100 : (protein / 500) * 100}></LinearProgress>
                <Typography variant="caption">Fat</Typography>
                <LinearProgress color="warning" variant="determinate" value={(fat / 560) * 100 > 100 ? 100 : (fat / 560) * 100}></LinearProgress>
            
            </Stack>
        </Box>
    )

}