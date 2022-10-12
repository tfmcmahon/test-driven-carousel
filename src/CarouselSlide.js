import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: ${({ imgHeight }) =>
    typeof imgHeight === 'number' ? `${imgHeight}px` : imgHeight};
`;

const CarouselSlide = ({
  attribution,
  description,
  imgHeight,
  imgUrl,
  StyledImage,
  ...rest
}) => {
  return (
    <figure {...rest}>
      <StyledImage imgHeight={imgHeight} src={imgUrl} />
      <figcaption>
        <strong>{description}</strong> {attribution}
      </figcaption>
    </figure>
  );
};

CarouselSlide.propTypes = {
  attribution: PropTypes.node,
  description: PropTypes.node.isRequired,
  imgHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imgUrl: PropTypes.string.isRequired,
  StyledImage: PropTypes.elementType,
};

CarouselSlide.defaultProps = {
  imgHeight: 500,
  StyledImage: StyledImage,
};

export default CarouselSlide;
