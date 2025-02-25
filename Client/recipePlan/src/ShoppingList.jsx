import { Button, Card, Modal, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { MealContext } from "./App";

const HandleShoppingList = ({ recipesList }) => {
  const [open, setOpen] = useState(false);
  const [shoppingList, setShoppinglist] = useState({});
  const [mealPlan,setMealPlan] = useContext(MealContext);
  const [copied,setCopied] = useState(false);


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
    console.log("mealplan",mealPlan);
    console.log("shoppinglist",Object.entries(shoppingList));
  },[mealPlan]);


//////////////////////////////////////////////////////////////////////////////////////

 // Convert shopping list to readable text
 const shoppingListText = Object.entries(shoppingList)
 .map(([name, { quantity, units }]) => `${name}: ${quantity} ${units || ""}`)
 .join("\n");

// Copy to clipboard
const handleCopy = async () => {
 try {
   await navigator.clipboard.writeText(shoppingListText);
   setCopied(true);
   setTimeout(() => setCopied(false), 2000);
 } catch (err) {
   console.error("Failed to copy:", err);
 }
};

// Download as text file
const handleDownload = () => {
 const blob = new Blob([shoppingListText], { type: "text/plain" });
 const link = document.createElement("a");
 link.href = URL.createObjectURL(blob);
 link.download = "shopping_list.txt";
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
};

// Send via Gmail
const handleGmail = () => {
  const recipient = ""; // Change this to a default recipient if needed
  const subject = encodeURIComponent("My Shopping List");
  const body = encodeURIComponent(shoppingListText);

  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`, "_blank");
};

//////////////////////////////////////////////////////////////////////////////////


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
          <Button onClick={handleCopy}>copy</Button>
          <Button onClick={handleDownload}>download</Button>
          <Button onClick={handleGmail}>gmail</Button>
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
