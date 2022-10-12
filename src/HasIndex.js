import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const HasIndex = (Component, indexPropName) => {
  const defaultIndexPropName = `default${capitalize(indexPropName)}`;

  const ComponentWithIndex = (props) => {
    const [index, setIndex] = useState(props[defaultIndexPropName]);

    useEffect(() => {
      if (indexPropName != null && indexPropName !== index) {
        return { index: indexPropName };
      }
    }, [indexPropName]);

    const handleDecrement = (max) => {
      setIndex((prevIndex) => {
        const nextIndex = max ? (prevIndex + max - 1) % max : prevIndex - 1;
        props.onIndexChange?.({ target: { value: nextIndex } });
        return nextIndex;
      });
    };

    const handleIncrement = (max) => {
      setIndex((prevIndex) => {
        const nextIndex = max ? (prevIndex + 1) % max : prevIndex + 1;
        props.onIndexChange?.({ target: { value: nextIndex } });
        return nextIndex;
      });
    };

    const { [defaultIndexPropName]: _, ...rest } = props;

    const indexProps = {
      [indexPropName]: index,
      [`${indexPropName}Decrement`]: (max) => handleDecrement(max),
      [`${indexPropName}Increment`]: (max) => handleIncrement(max),
    };

    return <Component {...rest} {...indexProps} />;
  };

  ComponentWithIndex.displayName = `WithIndex(${Component.displayName ||
    Component.name})`;

  ComponentWithIndex.propTypes = {
    [defaultIndexPropName]: PropTypes.number,
    [indexPropName]: PropTypes.number,
    onIndexChange: PropTypes.func,
  };

  ComponentWithIndex.defaultProps = {
    [defaultIndexPropName]: 0,
  };

  return ComponentWithIndex;
};

export default HasIndex;
