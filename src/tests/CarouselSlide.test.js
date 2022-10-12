import React from 'react';
import { mount, shallow } from 'enzyme';
import CarouselSlide, { StyledImage } from '../CarouselSlide';
import styled from 'styled-components';

describe('CarouselSlide', () => {
  let wrapper;
  const imgUrl = 'https://example.com/image.jpg';
  const description = 'A cool image';
  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide description={description} imgUrl={imgUrl} />
    );
  });

  it('renders a figure', () => {
    expect(wrapper.type()).toBe('figure');
  });

  it('renders props.StyledImage and a <figcaption> as children', () => {
    expect(wrapper.childAt(0).type()).toEqual(StyledImage);
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes `imgUrl through to the <img>', () => {
    const img = wrapper.find(StyledImage);
    expect(img.prop('src')).toBe(imgUrl);
  });

  it('uses `description` and `attribution` as the <figcaption>', () => {
    const attribution = 'Gonzo';
    wrapper.setProps({ attribution });
    expect(wrapper.find('figcaption').text()).toBe(
      `${description} ${attribution}`
    );
    expect(wrapper.find('figcaption strong').text()).toBe(description);
  });

  it('passes other props through to the <figure>', () => {
    const style = {};
    const onClick = () => {};
    const className = 'my-carousel-slide';

    wrapper.setProps({ style, onClick, className });

    expect(wrapper.prop('style')).toBe(style);
    expect(wrapper.prop('onClick')).toBe(onClick);
    expect(wrapper.prop('className')).toBe(className);
  });

  it('renders correctly', () => {
    wrapper.setProps({
      attribution: 'Gonzo',
      description: 'A cool image',
    });
    expect(wrapper).toMatchSnapshot();
  });
});

describe('StyledImage', () => {
  let mounted;
  const imgUrl = 'https://example.com/default.jpg';

  beforeEach(() => {
    mounted = mount(<StyledImage src={imgUrl} imgHeight={500} />);
  });

  it('renders an <img> with a given source', () => {
    expect(mounted.containsMatchingElement(<img src={imgUrl} />)).toBe(true);
  });

  it('uses imgHeight as the height style property', () => {
    expect(mounted).toHaveStyleRule('height', '500px');
    mounted.setProps({ imgHeight: 'calc(100vh - 100px)' });
    expect(mounted).toHaveStyleRule('height', 'calc(100vh - 100px)');
  });

  it('allows styles to be overridden', () => {
    const TestImg = styled(CarouselSlide.defaultProps.StyledImage)`
      width: auto;
      height: auto;
      object-fit: fill;
    `;

    mounted = mount(
      <CarouselSlide StyledImage={TestImg} imgUrl={imgUrl} description="Test" />
    );

    expect(mounted.find(TestImg)).toHaveStyleRule('width', 'auto');
    expect(mounted.find(TestImg)).toHaveStyleRule('height', 'auto');
    expect(mounted.find(TestImg)).toHaveStyleRule('object-fit', 'fill');
  });

  it('renders correctly', () => {
    expect(mounted.find('img')).toMatchSnapshot();
  });
});
