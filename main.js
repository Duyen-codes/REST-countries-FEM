// Toggle theme
const toggleBtn = document.querySelector(".btn-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
const cards = document.querySelector(".cards");

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
  countries.forEach((country) => {
    cards.insertAdjacentHTML(
      "beforeend",
      `
  <a href="#" class="card">
  <img class="flag" src="${country.flag}" alt="" />
  <div class="content">
    <h3 class="name">${country.name}</h3>
    <div><span class="country-info">Population: </span><span class="population">${country.population}</span></div>
    <div><span class="country-info">Region: </span><span class="region">${country.region}</span></div>

    <div><span class="country-info">Capital: </span><span class="capital">${country.capital}</span></div>
  </div>
</a>`
    );
  });
};

// // Search
const searchInput = document.querySelector(".search-input");

const search = function () {
  cards.innerHTML = "";
  console.log("searching");
  fetchAllCountries().then((countries) => {
    let matchedCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    renderCard(matchedCountries);
  });
};

searchInput.addEventListener("keyup", search);

// filter

let select = document.querySelector("select");

const filterCountries = function () {
  cards.innerHTML = "";
  fetchAllCountries().then((countries) => {
    let filteredCountries = countries.filter(
      (country) => country.region.toLowerCase() == select.value.toLowerCase()
    );
    console.log(filteredCountries);
    renderCard(filteredCountries);
  });
};
select.addEventListener("change", filterCountries);
