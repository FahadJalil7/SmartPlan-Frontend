import React, { useState } from "react";
import Card from "@mui/material/Card";;
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardContent, CardHeader, CardMedia, Modal } from "@mui/material";

const RecipeCard = ({ recipe,id }) => {
  const [open,setOpen] = useState(false);
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100vh',
    minHeight: '70vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
     <Card sx={{ maxWidth:150,maxHeight: 155,  }}>
      <CardActionArea onClick={()=>setOpen(true)}>
        <CardMedia component="img" height="90" image={recipe.image}/>
        <CardContent>
        <Typography variant="subtitle2" component={"div"} gutterBottom>{recipe.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Modal open={open} onClose={()=>setOpen(false)}>
      <Card style={modalStyle}>
        <Typography variant="subtitle2" component={"div"} gutterBottom>{recipe.title}</Typography>
      </Card>
    </Modal>
    </>
  );
};

export default RecipeCard;
