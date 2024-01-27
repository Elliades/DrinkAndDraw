// components/ImageCarousel.js

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class ImageCarousel extends React.Component {
  render() {
    const { images, currentImageIndex } = this.props;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      adaptiveHeight: true,
      initialSlide: currentImageIndex
    };

    return (
      <div>
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx}>
              <img src={img} alt={`Image ${idx}`} style={{ width: "100%", height: "auto" }} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default ImageCarousel;
