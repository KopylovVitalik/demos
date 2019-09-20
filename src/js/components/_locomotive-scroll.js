import LocomotiveScroll from 'locomotive-scroll';

if (document.querySelector('#scroll-container')) {
  const scroll = new LocomotiveScroll({ smooth: true });
}

// scroll.on('scroll', e => console.log(e));
