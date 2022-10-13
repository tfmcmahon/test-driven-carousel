import React from 'react';
import PropTypes from 'prop-types';

import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import HasIndex from './HasIndex';
import AutoAdvances from './AutoAdvances';

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
  defaultImageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
    .isRequired,
  slideIndex: PropTypes.number.isRequired,
  slideIndexDecrement: PropTypes.func.isRequired,
  slideIndexIncrement: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
  defaultImage: CarouselSlide.defaultProps.StyledImage,
  defaultImageHeight: CarouselSlide.defaultProps.imgHeight,
};

export default HasIndex(
  AutoAdvances(Carousel, 'slideIndex', 'slides'),
  'slideIndex'
);
