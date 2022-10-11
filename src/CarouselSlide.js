import React from 'react';
import PropTypes from 'prop-types';

const CarouselSlide = ({ attribution, description, imgUrl, ...rest }) => {
  return (
    <figure {...rest}>
      <img src={imgUrl} />
      <figcaption>
        <strong>{description}</strong>
        {` ${attribution}`}
      </figcaption>
    </figure>
  );
};

CarouselSlide.propTypes = {
  attribution: PropTypes.node,
  description: PropTypes.node.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default CarouselSlide;
