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
