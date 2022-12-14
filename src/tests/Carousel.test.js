import React from 'react';
import { mount, shallow } from 'enzyme';
import Carousel, { Carousel as CoreCarousel } from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
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

  describe('component with HOC', () => {
    let mounted;

    beforeEach(() => {
      mounted = mount(<Carousel slides={slides} />);
    });

    it('allows `slideIndex` to be controlled', () => {
      mounted = mount(<Carousel slides={slides} slideIndex={1} />);
      mounted.setProps({ slideIndex: 0 });
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('sets slideIndex={0} on the core component', () => {
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('passes `slides` down to the core component', () => {
      expect(mounted.find(CoreCarousel).prop('slides')).toBe(slides);
    });

    it('advances the slide after `autoAdvanceDelay` elapses', () => {
      jest.useFakeTimers();
      const autoAdvanceDelay = 10e3;
      mounted = mount(
        <Carousel slides={slides} autoAdvanceDelay={autoAdvanceDelay} />
      );
      jest.advanceTimersByTime(autoAdvanceDelay);
      mounted.update(); // 1
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(1);
    });
  });

  describe('component without HOC', () => {
    const slideIndexDecrement = jest.fn();
    const slideIndexIncrement = jest.fn();
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <CoreCarousel
          slides={slides}
          slideIndex={0}
          slideIndexDecrement={slideIndexDecrement}
          slideIndexIncrement={slideIndexIncrement}
        />
      );
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

    it('renders the current slide as a CarouselSlide', () => {
      let slideProps;
      slideProps = wrapper.find(CarouselSlide).props();

      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[0],
      });

      wrapper.find('[data-action="next"]').simulate('click');
      slideProps = wrapper.find(CarouselSlide).props();

      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[0],
      });
    });

    it('decrements `slideIndex` when Prev is clicked', () => {
      wrapper.find('[data-action="prev"]').simulate('click');

      expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });

    it('increments `slideIndex` when Next is clicked', () => {
      wrapper.find('[data-action="next"]').simulate('click');

      expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
    });

    it('passes defaultImg and defaultHeight to the CarouselSlide', () => {
      const defaultImage = () => 'Test';
      const defaultImageHeight = 1234;
      wrapper.setProps({ defaultImage, defaultImageHeight });

      expect(wrapper.find(CarouselSlide).prop('StyledImage')).toBe(
        defaultImage
      );
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
});
