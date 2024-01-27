import React, { useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images, currentImageIndex, onImageClick }) => {
  const sliderRef = useRef();

  useEffect(() => {
    // Forcer la mise à jour du carrousel
    sliderRef.current.slickGoTo(currentImageIndex);
  }, [images, currentImageIndex]);

  const settings = {
    // Vos réglages existants
  };

  return (
    <div className="history">
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide" onClick={() => onImageClick(image)}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
