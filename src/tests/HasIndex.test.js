import React from 'react';
import { shallow } from 'enzyme';
import HasIndex from '../HasIndex';

describe('HasIndex', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';
  const MockComponentWithIndex = HasIndex(MockComponent, 'indexPropName');

  it('has the expected displayName', () => {
    expect(MockComponentWithIndex.displayName).toBe('WithIndex(MockComponent)');
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MockComponentWithIndex />);
  });

  it('has initial `indexPropName` state equal to the `defaultIndex` prop', () => {
    expect(wrapper.prop('indexPropName')).toBe(0);
    const wrapper2 = shallow(
      <MockComponentWithIndex defaultIndexPropName={1} />
    );
    expect(wrapper2.prop('indexPropName')).toBe(1);
  });

  it('allways `indexPropName` state to change if the `indexPropName` prop is unset', () => {
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    wrapperWithInitialIndex.setProps({ index: undefined });
    expect(wrapperWithInitialIndex.prop('indexPropName')).toBe(0);
  });

  it('calls `onIndexChange` on decrement/increment', () => {
    const onIndexChange = jest.fn();
    wrapper.setProps({ index: 0, onIndexChange });
    wrapper.prop('indexPropNameDecrement')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 2 } });
    wrapper.prop('indexPropNameIncrement')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 2 } });
  });

  it('passes the initial `indexPropName` state down as the `indexPropName` prop', () => {
    expect(wrapper.prop('indexPropName')).toBe(0);
  });

  it('has an `index` state of 2 on decrement from 3', () => {
    wrapper.prop('indexPropNameDecrement')();
    expect(wrapper.prop('indexPropName')).toBe(-1);
  });

  it('has an `index` state of 1 on increment', () => {
    wrapper.prop('indexPropNameIncrement')();
    expect(wrapper.prop('indexPropName')).toBe(1);
  });

  it('has the max `indexPropName` state on decrement from 0', () => {
    wrapper.prop('indexPropNameDecrement')(3);
    expect(wrapper.prop('indexPropName')).toBe(2);
  });

  it('has the min `index` state on increment from the max', () => {
    wrapper.prop('indexPropNameIncrement')(3);
    wrapper.prop('indexPropNameIncrement')(3);
    wrapper.prop('indexPropNameIncrement')(3);
    expect(wrapper.prop('indexPropName')).toBe(0);
  });
});
