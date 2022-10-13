import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default (Component, propName, upperBoundPropName) => {
  const ComponentWithAutoAdvance = (props) => {
    useEffect(() => {
      if (!props.autoAdvanceDelay) return;

      let upperBound;

      if (typeof props[upperBoundPropName] === 'number') {
        upperBound = props[upperBoundPropName];
      } else if (props[upperBoundPropName] != null) {
        upperBound = props[upperBoundPropName].length;
      }

      const timer = setTimeout(() => {
        props[`${propName}Increment`](upperBound);
      }, props.autoAdvanceDelay);

      return () => {
        clearTimeout(timer);
      };
    }, [props[upperBoundPropName], props[propName]]);

    // eslint-disable-next-line no-unused-vars
    const { autoAdvanceDelay, ...rest } = props;

    return <Component {...rest} />;
  };

  ComponentWithAutoAdvance.displayName = `AutoAdvances(${Component.displayName ||
    Component.name})`;

  ComponentWithAutoAdvance.propTypes = {
    autoAdvanceDelay: PropTypes.number.isRequired,
    [propName]: PropTypes.number.isRequired,
    [upperBoundPropName]: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
    ]).isRequired,
    [`${propName}Increment`]: PropTypes.func.isRequired,
  };

  ComponentWithAutoAdvance.defaultProps = {
    autoAdvanceDelay: 10e3,
  };

  return ComponentWithAutoAdvance;
};
