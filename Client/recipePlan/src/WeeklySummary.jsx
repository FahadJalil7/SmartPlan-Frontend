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

    console.log(calories,carbs,protein)

    return(
        <Box>
            <Typography variant="h5" gutterBottom>Weekly Nutrition Summary</Typography>
            <Stack spacing={2} sx={{ flex: 1, maxWidth:500 }}>
                <LinearProgress color="primary" variant="determinate" value={(calories / 14000) * 100 > 100 ? 100 : (calories / 14000) * 100}></LinearProgress>
                <LinearProgress color="secondary" variant="determinate" value={(carbs / 1750) * 100 > 100 ? 100 : (carbs / 1750) * 100}></LinearProgress>
                <LinearProgress color="success" variant="determinate" value={(protein / 350) * 100 > 100 ? 100 : (protein / 350) * 100}></LinearProgress>
                <LinearProgress color="warning" variant="determinate" value={(fat / 560) * 100 > 100 ? 100 : (fat / 560) * 100}></LinearProgress>
            </Stack>
        </Box>
    )

}