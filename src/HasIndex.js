import React, { useState } from 'react';

const HasIndex = (Component, indexPropName) => {
  const ComponentWithIndex = (props) => {
    const [index, setIndex] = useState(0);

    const handleDecrement = (max) => {
      setIndex((prevIndex) =>
        max ? (prevIndex + max - 1) % max : prevIndex - 1
      );
    };

    const handleIncrement = (max) => {
      setIndex((prevIndex) => (max ? (prevIndex + 1) % max : prevIndex + 1));
    };

    const indexProps = {
      [indexPropName]: index,
      [`${indexPropName}Decrement`]: (max) => handleDecrement(max),
      [`${indexPropName}Increment`]: (max) => handleIncrement(max),
    };

    return <Component {...props} {...indexProps} />;
  };

  ComponentWithIndex.displayName = `WithIndex(${Component.displayName ||
    Component.name})`;

  return ComponentWithIndex;
};

export default HasIndex;
