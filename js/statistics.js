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
fetch('https://corona.lmao.ninja/v2/countries/Albania')
  // fetch('https://corona.lmao.ninja/v2/continents?yesterday&sort')

  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    document.getElementById('country').innerHTML = data.country;
    document.getElementById('active').innerHTML = data.active.toLocaleString();
    document.getElementById('cases').innerHTML = data.cases.toLocaleString();
    document.getElementById('critical').innerHTML =
      data.critical.toLocaleString();
    document.getElementById('death').innerHTML = data.deaths.toLocaleString();
    document.getElementById('recovered').innerHTML =
      data.recovered.toLocaleString();
    document.getElementById('tests').innerHTML = data.tests.toLocaleString();
    document.getElementById('flag').src = data.countryInfo.flag;
  });

fetch('https://corona.lmao.ninja/v2/continents/Europe?yesterday&strict')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    document.getElementById('country-1').innerHTML = data.continent;
    document.getElementById('active-1').innerHTML =
      data.active.toLocaleString();
    document.getElementById('cases-1').innerHTML = data.cases.toLocaleString();
    document.getElementById('critical-1').innerHTML =
      data.critical.toLocaleString();
    document.getElementById('death-1').innerHTML = data.deaths.toLocaleString();
    document.getElementById('recovered-1').innerHTML =
      data.recovered.toLocaleString();
    document.getElementById('tests-1').innerHTML = data.tests.toLocaleString();
  });
