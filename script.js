'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
document.getElementsByClassName('btn');

const message = document.createElement('div'); // return DOM element
message.classList.add('cookie-message');
message.textContent = 'blahblahblah';
message.innerHTML =
  'blahblahblah <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
header.append(message.cloneNode(true));

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.backgroundColor = 'blue';
message.style.width = '120%';

document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav_logo');
console.log(logo.getAttribute('designer'));
logo.setAttribute('comapny', 'Bankist');

logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

/////////// Test git
console.log('Hello world!');
