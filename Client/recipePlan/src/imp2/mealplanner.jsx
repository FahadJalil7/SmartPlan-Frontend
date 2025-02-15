import React, { useContext, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Grid2, Card, CardMedia,CardHeader, Typography, Box, CardActions } from "@mui/material";
import { Button } from "@mui/material";
import RecipeCard from "../recipeCard";
import { useEffect } from "react";
import { MealContext } from "../App";

const RecipeCard2 = ({ recipe, id, onClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    cursor: "grab",
  };

  return (
    <Card ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <CardMedia component="img" height="90" image={recipe.image}/>
        <Typography variant="h7" gutterBottom>{recipe.title}</Typography>
        <CardActions> <Button variant="contained" size="small" href={recipe.link}>Recipe</Button></CardActions>
    </Card>
  );
};


// Component for a droppable Meal Slot
const MealSlot = ({ id, recipe }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        border: "1px dashed gray",
        borderRadius: 2,
        padding: 2,
        minHeight: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: recipe ? "#f0f0f0" : "transparent",
      }}
    >
      {recipe ? (
        //<Typography variant="body1">{recipe.name}</Typography>
        <RecipeCard id={recipe.id} recipe={recipe}></RecipeCard>
      ) : (
        <Typography variant="body1">Drop a recipe here</Typography>
      )}
    </Box>
  );
};

// Main MealPlanner component
const MealPlanner = ({recipeList}) => {
 
  const [mealPlan,setMealPlan] = useContext(MealContext);

  // Static list of available recipes
  const [recipes,setRecipes] = useState(recipeList)
  useEffect(() => {
    setRecipes(recipeList);
  }, [recipeList]);

  // Handle drag end to update meal plan based on the dragged and dropped items
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // If there's no valid drop target, do nothing
    if (!over) return;

    setMealPlan((prev) => {
      const updatedPlan = [...prev];

      // Extract day and meal type from droppable id
      const [targetDayIndex, targetMeal] = over.id.split("-").slice(1);

      // Find the recipe being dragged
      const draggedRecipe = recipes.find((recipe) => recipe.id === active.id);

      if (draggedRecipe) {
        // Update the meal slot with the dragged recipe
        updatedPlan[targetDayIndex][targetMeal] = draggedRecipe;
      }

      return updatedPlan;
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
     <Box mt={4}>
        <Grid2 container spacing={2}>
          {recipes.map((recipe) => (
            <Grid2 item xs={12} sm={1.7} key={recipe.id}>
                <RecipeCard2 id={recipe.id} recipe={recipe} />
            </Grid2>
            
          ))}
        </Grid2>
      </Box>

      
      <Grid2 sx={{margin:"20px",border:"2px solid #ddd",borderRadius:"2px",  padding: 2,boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)"}} container spacing={2}>
        {mealPlan.map((day, dayIndex) => (
          <Grid2 item xs={12} sm={1.7} key={dayIndex}>
            <Typography variant="h6" align="center">Day {dayIndex + 1}</Typography>
            {Object.keys(day).map((meal) => (
              <Box key={meal} mb={2}>
                <Typography variant="subtitle1" align="center">{meal}</Typography>
                <MealSlot
                  id={`day-${dayIndex}-${meal}`}
                  recipe={day[meal]}
                />
              </Box>
            ))}
          </Grid2>
        ))}
      </Grid2>
    
    </DndContext>
  );
};

export default MealPlanner;
