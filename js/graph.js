const selectElem = document.querySelector('#short-code');
const resDiv = document.querySelector('#results');
const boxedClass = document.querySelector('.materialboxed');
M.Materialbox.init(boxedClass, {});

getCode();

function getCode() {
  fetch('https://restcountries.com/v3.1/all')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      generateHTML(data);
    })
    .catch((err) => {
      console.log(`There was an error ${err}`);
    });
}

function generateHTML(ourData) {
  let output = '<option selected disabled>Select any country</option>';

  ourData.forEach((country) => {
    output += `<option value="${country.cca2}">${country.name.common}</option>`;
  });

  selectElem.innerHTML = output;
}

selectElem.addEventListener('change', (e) => {
  const countryCode = e.target.value;
  const imgTag = document.querySelector('img');
  let now = new Date().getTime();

  if (countryCode) {
    let imgUrl = `https://corona.dnsforfamily.com/graph.png?c=${countryCode}&time=${now}`;

    imgTag.setAttribute('src', imgUrl);
  }
});
