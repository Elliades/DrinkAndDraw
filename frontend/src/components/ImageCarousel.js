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
      <div className="history">
        <Slider {...settings}>
          {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Image ${index}`} />
          </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default ImageCarousel;
