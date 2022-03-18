const toggleBtn = document.querySelector(".btn-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

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

// fetchAllCountries().then((countries) => {
//   countries.forEach((country) => console.log(country.flag));
// });
