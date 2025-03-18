import React from 'react';
import { 
  Card, 
  CardContent, 
  Skeleton,
  Box 
} from '@mui/material';

const RecipeCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Image skeleton */}
      <Skeleton 
        variant="rectangular" 
        height={200} 
        width="100%" 
        animation="wave" 
      />
      
      <CardContent>
        {/* Title skeleton */}
        <Skeleton 
          variant="text" 
          height={32} 
          width="80%" 
          animation="wave" 
          sx={{ mb: 1 }}
        />
        
        {/* Description skeleton - two lines */}
        <Skeleton 
          variant="text" 
          height={20} 
          animation="wave" 
        />
        <Skeleton 
          variant="text" 
          height={20} 
          width="70%" 
          animation="wave" 
        />
      </CardContent>
    </Card>
  );
};

export default RecipeCardSkeleton;