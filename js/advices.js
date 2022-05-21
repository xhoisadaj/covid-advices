'use strict';

(() => {
  const data = localStorage.getItem('covid-app.user');
  if (!data) {
    window.location = 'log-in.html';
  }
})();

document.querySelector('.logout').addEventListener('click', () => {
  localStorage.removeItem('covid-app.user');
});
document.querySelector('.logout-1').addEventListener('click', () => {
  localStorage.removeItem('covid-app.user');
});

function reveal() {
  var reveals = document.querySelectorAll('.reveal');

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);
