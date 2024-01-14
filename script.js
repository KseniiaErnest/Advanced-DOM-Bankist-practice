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

