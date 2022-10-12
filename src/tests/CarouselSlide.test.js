import React from 'react';
import { mount, shallow } from 'enzyme';
import CarouselSlide, { StyledImage } from '../CarouselSlide';

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
});
