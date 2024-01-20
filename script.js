'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// Tabbed component's elements
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// Menu fade animation elements
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////
// Smooth scrolling
btnScroll.addEventListener('scroll', (e) => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);


  // Scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
     top: s1coords.top + window.pageYOffset,
     behavior: 'smooth'
  })

  // section1.scrollIntoView({behavior: 'smooth'});
});
//////////////////////////////////////////////////
// Page navigation without event delegation
// document.querySelectorAll('.nav__link').forEach((el) => {
//   el.addEventListener('click', (e) => {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

// Page navigation with event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event and for that we can use e.target => .nav__link
document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();
console.log(e.target);

// Matching strategy: we check if target event has matching class name, in our case 'nav__link'
if (e.target.classList.contains('nav__link')) {

  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({behavior: 'smooth'})
}
});
//////////////////////////////////////////////////////////////////
// Tabbed component's functionality

tabsContainer.addEventListener('click', (e) => {
const clicked = e.target.closest('.operations__tab');

// Guard clause
if(!clicked) return

// Remove active classes
tabs.forEach(t => t.classList.remove('operations__tab--active'));
tabsContent.forEach(c => c.classList.remove('.operations__content--active'));

// Active tab
clicked.classList.add('.operations__tab--active');

// Active content area
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

/////////////////////////////////////////////////////////////////////
// Menu fade animation functionality
const handleHover = function(e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelector('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
  
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// Passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0,5));

nav.addEventListener('mouseout', handleHover.bind(1));
//////////////////////////////////////////////////////////////////////
// Sticky navigation by adding 'sticky' class
/*
const initialCoord = section1.getBoundingClientRect();

window.addEventListener('scroll', function() {

  if(window.scrollY > initialCoord.top) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky');
  }
})
*/
// Sticky navigation with Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;


const stickyNav = function(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//////////////////////////////////////////////////////////////////////////////
// Reveal sections functionality
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
const [entry] = entries;

if(!entry.isIntersecting) return;

entry.target.classList.remove('section-hidden');
observer.unobsorve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,

});

allSections.forEach(function(section) { 
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})
///////////////////////////////////////////////////////////////////////////////
// Lazy Images functionality
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observe) {
[entry] = entries;
console.log(entry);

if(!entry.isIntersecting) return;

// Replace src with data-src
entry.target.src = entry.target.dataset.src;
entry.target.addEventListener('load', () => {
  entry.target.classList.remove('lazy-img');
})

observer.unobserve(entry.target)
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: 0,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));
///////////////////////////////////////////////////////////////////////////
// Slider function
const slider = function() {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;

// Functions
const createDots = function() {
  slides.forEach((_, i) => {
dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
};

const activateDot = function(slide) {
document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
document.querySelector(`.dots__dot[data-slide=${slide}]`).classList.add('dots__dot--active')
};

const goToSlide = function(slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
};


const nextSlide = function() {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function() {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}

const init = function() {
  reateDots();
  goToSlide(0);
  activateDot(0);
}
init();

// Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
  console.log(e);
  if (e.key == 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function(e) {
if(e.target.classList.contains('doots__dot')) {
  // const slide = e.target.dataset.slide
  // or we can destracture
  const {slide} = e.target.dataset;
  goToSlide(slide);
  activateDot(slide);
}
})
};
slider();