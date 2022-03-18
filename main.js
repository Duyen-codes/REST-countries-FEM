const toggleBtn = document.querySelector(".btn-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
const cards = document.querySelector(".cards");

async function fetchAllCountries() {
  const response = await fetch("https://restcountries.com/v2/all");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const countries = await response.json();
  console.log("from fetch", countries);
  return countries;
}

fetchAllCountries().then((countries) => {
  countries.forEach((country) => {
    cards.insertAdjacentHTML(
      "beforeend",
      `
    <a href="#" class="card">
    <img class="flag" src="${country.flag}" alt="" />
    <div class="content">
      <h3 class="name">${country.name}</h3>
      <p>Population: <span class="population">71234</span></p>
      <p>Region: <span class="region">${country.region}</span></p>
      <p>Capital: <span class="capital">${country.capital}</span></p>
    </div>
  </a>`
    );
  });
});
