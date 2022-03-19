// Toggle theme
const toggleBtn = document.querySelector(".btn-toggle");
const themeIcon = document.querySelector("i");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (themeIcon.classList.contains("fa-moon")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
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

// Fetch countries
// let countriesArray = [];
async function fetchAllCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const countries = await response.json();
  return countries;
}

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
      console.log(event.currentTarget.classList[0]);
      renderClickedCountry(event.currentTarget.classList[0]);
      searchFilterContainer.classList.add("hidden");
      window.scrollTo(0, 0);
      countryInfoPage.classList.add("active");
    });
  });
};

//Fetch countries and Render on page load

fetchAllCountries().then((countries) => {
  countriesArray = countries;
  console.log(countriesArray);
  renderCard(countriesArray);
});

// function fetchData() {
//   fetch("https://restcountries.com/v3.1/all")
//     .then((response) => response.json())
//     .then((data) => {
//       countriesArray = data;
//       renderCard(countriesArray);
//     });
// }

// fetchData();

// Define Search function using function expression
const search = function () {
  cards.innerHTML = "";
  fetchAllCountries().then((countries) => {
    let matchedCountries = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    );
    renderCard(matchedCountries);

    if (!matchedCountries.length) {
      cards.innerHTML += `<p class="no-found">No Countries Found</p>`;
    }
  });
};

searchInput.addEventListener("input", search);

// Define filter by region function using function expression

// const filterCountries = function () {
//   cards.innerHTML = "";
//   fetchAllCountries().then((countries) => {
//     let filteredCountries = countries.filter(
//       (country) => country.region.toLowerCase() == select.value.toLowerCase()
//     );
//     renderCard(filteredCountries);
//   });
// };

const filterCountries = function () {
  cards.innerHTML = "";
  fetchAllCountries().then((countries) => {
    if (select.value.toLowerCase() == "all") {
      renderCard(countries);
    } else {
      let filteredCountries = countries.filter(
        (country) => country.region.toLowerCase() == select.value.toLowerCase()
      );
      renderCard(filteredCountries);
    }
  });
};

select.addEventListener("change", filterCountries);

// Render Clicked Country

const renderClickedCountry = function (countryName) {
  countryInfoPage.innerHTML = "";
  let borderCountries = "";
  fetchAllCountries().then((countries) => {
    countries.forEach((country) => {
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
            <section class="country-content-middle">
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
            </section>

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
  });
};

// Go back
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("back-btn")) {
    console.log("back btn clicked");
    countryInfoPage.innerHTML = "";
    searchFilterContainer.classList.remove("hidden");
    countryInfoPage.classList.remove("active");
    window.scrollTo(0, 0);
    // Render cards
    fetchAllCountries().then((countries) => {
      countriesArray = countries;
      renderCard(countriesArray);
    });
  }
});

// Render border country on click
document.addEventListener("click", function (e) {
  let clickedCountry = e.target.classList[0];
  fetchAllCountries().then((countries) => {
    countries.forEach((country) => {
      if (clickedCountry == country.cca3) {
        renderClickedCountry(country.name.common);
        window.scrollTo(0, 0);
      }
    });
  });
});
