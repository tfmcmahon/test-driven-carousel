import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  let wrapper;

  const slides = [
    {
      imgUrl: 'https://example.com/slide1.png',
      description: 'Slide 1',
      attribution: 'Uno Pizzeria',
    },
    {
      imgUrl: 'https://example.com/slide2.png',
      description: 'Slide 2',
      attribution: 'Dos Equis',
    },
    {
      imgUrl: 'https://example.com/slide3.png',
      description: 'Slide 3',
      attribution: 'Three Amigos',
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides} />);
  });

  it('renders a <div>', () => {
    expect(wrapper.type()).toBe('div');
  });

  it('renders a CarouselButton labeled "Prev"', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(0)
        .prop('children')
    ).toBe('Prev');
  });

  it('renders a CarouselButton labeled "Next"', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(1)
        .prop('children')
    ).toBe('Next');
  });

  it('decrements `slideIndex` when Prev is clicked', () => {
    wrapper.find('[data-action="prev"]').simulate('click');

    expect(wrapper.find('p').text()).toBe('0');
  });

  it('increments `slideIndex` when Next is clicked', () => {
    wrapper.find('[data-action="next"]').simulate('click');

    expect(wrapper.find('p').text()).toBe('2');
  });

  it('renders the current slide as a CarouselSlide', () => {
    let slideProps;
    slideProps = wrapper.find(CarouselSlide).props();

    expect(slideProps).toEqual({
      ...CarouselSlide.defaultProps,
      ...slides[1],
    });

    wrapper.find('[data-action="next"]').simulate('click');
    slideProps = wrapper.find(CarouselSlide).props();

    expect(slideProps).toEqual({
      ...CarouselSlide.defaultProps,
      ...slides[2],
    });
  });

  it('wraps around when the last slide is reached', () => {
    const nextButton = wrapper.find('[data-action="next"]');
    slides.forEach(() => nextButton.simulate('click'));

    expect(wrapper.find('p').text()).toBe('1');
  });

  it('wraps around when the first slide is reached', () => {
    const prevButton = wrapper.find('[data-action="prev"]');
    prevButton.simulate('click');
    prevButton.simulate('click');

    expect(wrapper.find('p').text()).toBe(`${slides.length - 1}`);
  });

  it('passes defaultImg and defaultHeight to the CarouselSlide', () => {
    const defaultImage = () => 'Test';
    const defaultImageHeight = 1234;
    wrapper.setProps({ defaultImage, defaultImageHeight });

    expect(wrapper.find(CarouselSlide).prop('StyledImage')).toBe(defaultImage);
    expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
      defaultImageHeight
    );
  });

  it('allows individual slides to override StyledImage and imgHeight', () => {
    const StyledImage = () => 'Test';
    const imgHeight = 1234;
    const mappedSlides = slides.map((slide) => ({
      ...slide,
      StyledImage,
      imgHeight,
    }));
    wrapper.setProps({ slides: mappedSlides });

    expect(wrapper.find(CarouselSlide).prop('StyledImage')).toEqual(
      StyledImage
    );
    expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
  });
});
