import { Button, Card, Modal, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { MealContext } from "./App";

const HandleShoppingList = ({ recipesList }) => {
  const [open, setOpen] = useState(false);
  const [shoppingList, setShoppinglist] = useState({});
  const [mealPlan,setMealPlan] = useContext(MealContext);


  //mealpalan strucutred something like this => [{beakfast:{recipe},lunch:,dinner:},{},{},{},{},{},{}]

  useEffect(()=>{
    const updatedList = {};
    
    mealPlan.map((day,index)=>{ //gives us acess to 0 through 6 days
      Object.keys(day).map((meal)=>{if(day[meal]){day[meal].ingredients.forEach((ingredient)=>{
        if (!updatedList[ingredient.name]) {
          updatedList[ingredient.name] = {
            quantity: ingredient.amount,
            units: ingredient.unit,
          };
        } else {
          updatedList[ingredient.name].quantity += ingredient.amount;
        }
      })}}) 
      setShoppinglist(updatedList);
      
    })
    console.log("mealplan",mealPlan)
  },[mealPlan]);





  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <Button
        variant="outlined"
        size="medium"
        onClick={() => setOpen(true)}
      >
        Shopping List
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Card sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Shopping List
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {Object.keys(shoppingList).length === 0 ? (
              <p>No items in the shopping list.</p>
            ) : (
              Object.entries(shoppingList).map(([name, { quantity, units }]) => (
                <div key={name}>
                  {name}: {quantity} {units || ""}
                </div>
              ))
            )}
          </Typography>
        </Card>
      </Modal>
    </div>
  );
};

export default HandleShoppingList;
