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

const cards = document.querySelector(".cards");

// Reload page
const logo = document.querySelector(".logo");
logo.addEventListener("click", function () {
  window.location.reload();
});
// Fetch countries
async function fetchAllCountries() {
  const response = await fetch("https://restcountries.com/v2/all");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const countries = await response.json();
  return countries;
}

fetchAllCountries();
// Render cards
fetchAllCountries().then((countries) => {
  console.log(countries);
  renderCard(countries);
});

const renderCard = (countries) => {
  cards.innerHTML = "";
  countries.forEach((country) => {
    const html = `
    <div class="card">
    <img class="flag" src="${country.flag}" alt="" />
    <div class="content">
      <h3 class="name">${country.name}</h3>
      <div><span class="country-info">Population: </span><span class="population">${country.population}</span></div>
      <div><span class="country-info">Region: </span><span class="region">${country.region}</span></div>
  
      <div><span class="country-info">Capital: </span><span class="capital">${country.capital}</span></div>
    </div>
  </div>`;
    cards.insertAdjacentHTML("beforeend", html);
  });
};

// // Search
const searchInput = document.querySelector(".search-input");

const search = function () {
  cards.innerHTML = "";
  fetchAllCountries().then((countries) => {
    let matchedCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    renderCard(matchedCountries);
  });
};

searchInput.addEventListener("input", search);

// filter

let select = document.querySelector("select");

const filterCountries = function () {
  cards.innerHTML = "";
  fetchAllCountries().then((countries) => {
    let filteredCountries = countries.filter(
      (country) => country.region.toLowerCase() == select.value.toLowerCase()
    );
    renderCard(filteredCountries);
  });
};
select.addEventListener("change", filterCountries);

// MODAL
const modal = document.querySelector(".modal");
