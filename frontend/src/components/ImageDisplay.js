import React from 'react';

function ImageDisplay({ imageUrl }) {
  if (!imageUrl) {
    return <div>Loading image...</div>;
  }

  return (
    <img 
      src={imageUrl} 
      alt="Displayed" 
      style={{ 
        maxWidth: '100%', 
        maxHeight: '100vh', 
        objectFit: 'contain' 
      }} 
    />
  );
}

export default ImageDisplay;
