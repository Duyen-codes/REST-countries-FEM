// Toggle theme
const toggleBtn = document.querySelector(".btn-toggle");
const themeIcon = document.querySelector("i");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (themeIcon.classList.contains("fa-moon")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

// Queries
const cards = document.querySelector(".cards");
const searchFilterContainer = document.querySelector(
  ".search-filter-container"
);
const countryInfoPage = document.querySelector(".country-info-page");
const backBtn = document.querySelector(".back-btn");
const searchInput = document.querySelector(".search-input");
let select = document.querySelector("select");

// Reload page when click on logo
const logo = document.querySelector(".logo");
logo.addEventListener("click", function () {
  window.location.reload();
});

let countriesArray = [];
function fetchAllCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      countriesArray = data;
      renderCard(countriesArray);
    });
}

document.addEventListener("DOMContentLoaded", fetchAllCountries);

// Render cards

const renderCard = (countries) => {
  cards.innerHTML = "";
  countries.forEach((country) => {
    const html = `
    <div class="${country.name.common} card">
    <img class="flag" src="${country.flags.svg}" alt="${country.name.common} flag" />
    <div class="content">
      <h3 class="name">${country.name.common}</h3>
      <div><span class="country-info">Population: </span><span class="population">${country.population}</span></div>
      <div><span class="country-info">Region: </span><span class="region">${country.region}</span></div>
  
      <div><span class="country-info">Capital: </span><span class="capital">${country.capital?.[0]}</span></div>
    </div>
  </div>`;
    cards.insertAdjacentHTML("beforeend", html);
  });

  Array.from(cards.children).forEach((card) => {
    card.addEventListener("click", function (event) {
      renderClickedCountry(event.currentTarget.classList[0]);
      searchFilterContainer.classList.add("hidden");
      window.scrollTo(0, 0);
      countryInfoPage.classList.add("active");
    });
  });
};

// search
searchInput.addEventListener("input", (e) => {
  const element = e.target.value.toLowerCase();
  const newCountries = countriesArray.filter((country) =>
    country.name.common.toLowerCase().includes(element)
  );
  renderCard(newCountries);
});

// filter

select.addEventListener("change", (e) => {
  cards.innerHTML = "";
  if (select.value.toLowerCase() == "all") {
    renderCard(countriesArray);
    select.value = "";
  } else {
    let filteredCountries = countriesArray.filter(
      (country) => country.region.toLowerCase() == select.value.toLowerCase()
    );
    renderCard(filteredCountries);
    select.value = "";
  }
});

// Render clicked country
const renderClickedCountry = function (countryName) {
  countryInfoPage.innerHTML = "";
  let borderCountries = "";
  countriesArray.forEach((country) => {
    if (country.name.common == countryName) {
      let currency = Object.values(country.currencies)[0].name;
      let language = Object.values(country.languages)[0];
      if (country.borders == undefined) {
        borderCountries += `<p>None</p>`;
      } else {
        country.borders.forEach((border) => {
          borderCountries += `<button class="${border} btn">${border}</button>`;
        });
      }
      let html = `
      
      <div class="modal-content">

      <button class="btn back-btn">
        <i class="fa-solid fa-arrow-left"></i>Back
      </button>

      <div class="country-details">
        <img src="${country.flags.svg}" alt="${country.name.common} flag" />

        <div class="country-content">
          <h3 class="modal-title">${country.name.common}</h3>
          <div class="country-content-middle">
          <div class="content-middle-left">
          <div>
            <span class="native-name country-info">Native Name:</span>
            <span>${country.name.common}</span>
          </div>
          <div>
            <span class="population country-info">Population: </span>
            <span>${country.population}</span>
          </div>
          <div>
            <span class="region country-info">Region: </span>
            <span>${country.region}</span>
          </div>
          <div>
            <span class="sub-region country-info">Sub Region: </span>
            <span>${country.subregion}</span>
          </div>
          <div>
            <span class="capital country-info">Capital: </span>
            <span>${country.capital[0]}</span>
          </div>
          </div>

          <div class="content-middle-right">
          <div>
            <span class="domain country-info">Top Level Domain: </span>
            <span>${country.tld}</span>
          </div>
          <div>
            <span class="currency country-info">Currencies:</span>
            <span>${currency}</span>
          </div>

          <div>
            <span class="language country-info">Languages: </span>
            <span>${language}</span>
          </div>
         </div>
          </div>

          <div class="border-country-container">
          <span>Border Countries:</span>
          <div class="country-buttons">
         ${borderCountries}
          </div>
        </div>
      </div>
      
        </div>
      </div>
   
      `;
      countryInfoPage.insertAdjacentHTML("beforeend", html);
    }
  });
};

// Go back
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("back-btn")) {
    countryInfoPage.innerHTML = "";
    searchFilterContainer.classList.remove("hidden");
    countryInfoPage.classList.remove("active");
    window.scrollTo(0, 0);
    // Render cards
    renderCard(countriesArray);
  }
});
