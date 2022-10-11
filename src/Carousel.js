import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';

const Carousel = ({ slides, ...rest }) => {
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
      <CarouselSlide {...slides[slideIndex]} />
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
  slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
    .isRequired,
};

export default Carousel;
