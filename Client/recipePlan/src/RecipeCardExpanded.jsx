import React from "react";
import { 
    Box, 
    Button, 
    Card, 
    CardMedia, 
    Chip,
    Divider,
    Typography, 
    List, 
    ListItem, 
    ListItemText,
    ListItemIcon,
    Avatar
  } from '@mui/material';
  
  import AccessTimeIcon from '@mui/icons-material/AccessTime';
  import RestaurantIcon from '@mui/icons-material/Restaurant';
  import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
  import LaunchIcon from '@mui/icons-material/Launch';
  import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const ExpandedRecipeCard = ({recipe}) => {
  if (!recipe) return null;

  return (
    <Card sx={{ 
      maxWidth: 800, 
      maxHeight: "90vh",
      margin: "auto", 
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)", 
      borderRadius: 3, 
      overflow: "hidden",
      bgcolor: "background.paper",
      
    }}>
      
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={recipe.image}
          alt={recipe.title}
          sx={{ 
            width: "100%",
            objectFit: "cover"
          }}
        />
        <Box sx={{ 
          position: "absolute", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), transparent)",
          padding: 2
        }}>
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>{recipe.title}</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1,justifyContent:"space-between" }}>
            <div sx={{margin:0,padding:0,}}>
            <Chip 
              icon={<AccessTimeIcon fontSize="small" />} 
              label={`${recipe.readyInMinutes} min`} 
              size="small" 
              sx={{ bgcolor: "rgba(144, 202, 249, 0.2)", color: "#90CAF9",paddingInline:1,marginInlineEnd:1 }}
            />
            <Chip 
              icon={<RestaurantIcon fontSize="small" />} 
              label={`${recipe.servings} servings`} 
              size="small" 
              sx={{ bgcolor: "rgba(144, 202, 249, 0.2)", color: "#90CAF9",paddingInline:1,  }}
            />
            </div>
            <Chip onDelete={()=>{}}  deleteIcon={<ArrowOutwardIcon fontSize="medium"/>} sx={{ bgcolor: "rgba(144, 202, 249, 0.3)", color: "#90CAF9" }} size="medium" label={"View Full Recipe"} onClick={()=>(window.open(recipe.link))}  />
          </Box>
        </Box>
      </Box>
  
      
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-around", 
        py: 1.5, 
        bgcolor: "background.default" 
      }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">Calories</Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="primary.light">{recipe.calories.toFixed(0)} kcal</Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "divider" }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">Protein</Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="primary.light">{recipe.protein.toFixed(1)}g</Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "divider" }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">Carbs</Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="primary.light">{recipe.carbs.toFixed(1)}g</Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "divider" }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">Fat</Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="primary.light">{recipe.fat.toFixed(1)}g</Typography>
        </Box>
      </Box>
  
     
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", md: "row" },
        p: 3,
        gap: 3
      }}>
        <Box sx={{ flex: "0 0 35%"}}>
          <Typography variant="h6" sx={{ 
            mb: 2, 
            pb: 1, 
            borderBottom: "2px solid", 
            borderColor: "#64B5F6" 
          }}>
            Ingredients
          </Typography>
          <Box sx={{maxHeight:375, overflowY:"auto", pr: 1,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(144, 202, 249, 0.3)',
              borderRadius: '4px',
            },}}>
          <List sx={{ pl: 1, overflowY: true,  }}>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index} sx={{ py: 0.5, px: 0 }} disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleOutlineIcon sx={{ color: "#64B5F6" }} fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`} 
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
            ))}
          </List>
          </Box>
        </Box>
        
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, bgcolor: "divider" }} />
        <Divider sx={{ display: { xs: "block", md: "none" }, bgcolor: "divider" }} />
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ 
            mb: 2, 
            pb: 1, 
            borderBottom: "2px solid", 
            borderColor: "#64B5F6" 
          }}>
            Instructions
          </Typography>
          <Box sx={{ 
            maxHeight: 375, 
            overflowY: "auto", 
            pr: 1,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(144, 202, 249, 0.3)',
              borderRadius: '4px',
            },
          }}>
            <List>
              {recipe.instructions.map((step) => (
                <ListItem key={step.instructionNum} sx={{ py: 1, px: 0 }} disableGutters alignItems="flex-start">
                  <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                    <Avatar sx={{ 
                      width: 24, 
                      height: 24, 
                      bgcolor: "rgba(144, 202, 249, 0.2)", 
                      color: "#90CAF9", 
                      fontSize: "0.8rem" 
                    }}>
                      {step.instructionNum}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={step.step} 
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ExpandedRecipeCard;
