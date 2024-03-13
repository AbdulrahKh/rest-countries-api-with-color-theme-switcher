const mainContainer = document.querySelector("#main-container");
function fetchConutryData(query) {
  return fetch(`https://restcountries.com/v3.1/${query}`)
    .then((response) => response.json())
    .then((data) => renderCountries(data));
}
document.addEventListener("DOMContentLoaded", () => fetchConutryData("all"));

function renderCountries(data) {
  mainContainer.innerHTML = "";
  data.forEach((country) => {
    const countryContainer = document.createElement("a");
    countryContainer.classList.add(
      "shadow-[0_0_10px_0_rgba(0,0,0,0.1)]",
      "bg-white",
      "rounded-md",
      "dark:bg-[#2b3945]",
      "max-h-[28rem]",
      "cursor-pointer"
    );
    countryContainer.setAttribute("name", `${country.name.official}`);
    countryContainer.setAttribute(
      "href",
      `details.html?name=${country.name.common}`
    );
    countryContainer.innerHTML = `
    <div class="w-80 sm:w-96">
      <img class="object-cover w-full h-[200px] rounded-md" src="${
        country.flags.png
      }" alt="Country Flag">
    </div>
      <div class="pt-6 pb-12 px-8">
          <h2 class="py-4 text-lg font-bold">${country.name.official}</h2>
          <p class="font-medium">
            Population: <span class="font-light">${country.population.toLocaleString()}</span>
          </p>
          <p class="font-medium">Region: <span class="font-light">${
            country.region
          }</span></p>
          <p class="font-medium">Capital: <span class="font-light">${
            country.capital
          }</span></p>
        </div>
    `;
    mainContainer.appendChild(countryContainer);
  });
}

const darkModeButton = document.querySelector("#dark-mode-button");
const mainPage = document.documentElement;

darkModeButton.addEventListener("click", () => {
  mainPage.classList.toggle("dark");
});

const regionFilter = document.querySelector("#regionFilter");
const regionSelect = document.querySelector("#regionSelect");

regionFilter.addEventListener("click", () => {
  regionSelect.classList.toggle("hidden");
});

const listItems = document.querySelectorAll("ul li");
listItems.forEach((li) => {
  li.classList.add("hover:bg-gray-500", "hover:text-white");
  li.addEventListener("click", () => {
    const region = li.textContent;
    fetchConutryData(`region/${region.toLowerCase()}`);
  });
});

const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("input", () => {
  const filterValue = searchBar.value.toLowerCase();
  fetchConutryData(filterValue == "" ? "all" : `name/${filterValue}`);
});
