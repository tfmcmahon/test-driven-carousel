import React from 'react';
import PropTypes from 'prop-types';

import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import HasIndex from './HasIndex';

export const Carousel = ({
  defaultImage,
  defaultImageHeight,
  slides,
  slideIndex,
  slideIndexDecrement,
  slideIndexIncrement,
  ...rest
}) => {
  const slidesLength = slides.length;

  return (
    <div {...rest}>
      <CarouselSlide
        StyledImage={defaultImage}
        imgHeight={defaultImageHeight}
        {...slides[slideIndex]}
      />
      <CarouselButton
        data-action="prev"
        onClick={() => slideIndexDecrement(slidesLength)}
      >
        Prev
      </CarouselButton>
      <CarouselButton
        data-action="next"
        onClick={() => slideIndexIncrement(slidesLength)}
      >
        Next
      </CarouselButton>
    </div>
  );
};

Carousel.propTypes = {
  defaultImage: PropTypes.elementType,
  defaultImgHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
    .isRequired,
  slideIndex: PropTypes.number.isRequired,
  slideIndexDecrement: PropTypes.func.isRequired,
  slideIndexIncrement: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
  defaultImage: CarouselSlide.defaultProps.StyledImage,
  defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
};

export default HasIndex(Carousel, 'slideIndex');
