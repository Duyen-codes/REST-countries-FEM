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

// Render cards
fetchAllCountries().then((countries) => {
  countries.forEach((country) => {
    renderCard(country);
  });
});

const renderCard = (country) => {
  cards.innerHTML = "";
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
};

// Search
const searchInput = document.querySelector(".search-input");

const search = function () {
  console.log("searching", searchInput.value);
  fetchAllCountries().then((countries) => {
    countries
      .filter((country) =>
        country.name.toLowerCase().includes(searchInput.value.toLowerCase())
      )
      .forEach((country) => {
        console.log("from search", country);
        renderCard(country);
      });
  });
};
searchInput.addEventListener("keyup", search);

// Filter
