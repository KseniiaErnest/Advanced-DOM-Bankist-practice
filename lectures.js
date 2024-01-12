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
/////////////////////////
const h1 = document.querySelector('h1');

const alertH1 = h1.addEventListener('mouseenter', (e) => {
console.log('blah');

h1.removeEventListener('mouseenter', alertH1);
});

h1.onmouseenter = function(e) {
  console.log('blah');
};

////////////////////
// rgb(255, 255, 255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav_link').addEventListener('click', (e) => {
this.style.backgroundColor = randomColor();

// Stop propagation *not good in practice
e.stopPropagation();
});

document.querySelector('.nav_links').addEventListener('click', (e) => {
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', (e) => {
  this.style.backgroundColor = randomColor();
}, fasle);