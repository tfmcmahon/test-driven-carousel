import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';

const Carousel = ({ defaultImage, defaultImageHeight, slides, ...rest }) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slidesLength = slides.length;

  const handleSlideChange = (action) => {
    if (action === 'prev') {
      setSlideIndex(
        (prevIndex) => (prevIndex + slidesLength - 1) % slidesLength
      );
    } else if (action === 'next') {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slidesLength);
    }
  };

  return (
    <div {...rest}>
      <CarouselSlide
        StyledImage={defaultImage}
        imgHeight={defaultImageHeight}
        {...slides[slideIndex]}
      />
      <CarouselButton
        data-action="prev"
        onClick={() => handleSlideChange('prev')}
      >
        Prev
      </CarouselButton>
      <CarouselButton
        data-action="next"
        onClick={() => handleSlideChange('next')}
      >
        Next
      </CarouselButton>
      <p>{slideIndex}</p>
    </div>
  );
};

Carousel.propTypes = {
  defaultImage: PropTypes.elementType,
  defaultImgHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
    .isRequired,
};

Carousel.defaultProps = {
  defaultImage: CarouselSlide.defaultProps.StyledImage,
  defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
};

export default Carousel;
