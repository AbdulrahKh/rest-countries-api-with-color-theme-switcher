const darkModeButton = document.querySelector("#dark-mode-button");
const mainPage = document.documentElement;

darkModeButton.addEventListener("click", () => {
  mainPage.classList.toggle("dark");
});

const countryName = new URLSearchParams(window.location.search).get("name");
const mainContainer = document.querySelector("#country-container");

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then((response) => response.json())
  .then((data) => {
    const countryData = data[0];
    mainContainer.innerHTML = `
    <img
          class="w-96 sm:w-1/2 sm:h-96 sm:object-left sm:object-contain"
          src="
            ${countryData.flags.png}"
          alt="Country Flag"
        />
        <div class="flex flex-col gap-8">
          <h2 class="text-xl font-bold">${countryData.name.official}</h2>
          <div class="flex flex-col gap-8 font-light sm:flex-row sm:gap-12">
          <div class="flex flex-col gap-2 ">
            <p>Native name: ${
              countryData.name.nativeName[Object.keys(countryData.languages)[0]]
                .common
            }</p>
            <p>Population: ${countryData.population.toLocaleString()}</p>
            <p>Region: ${countryData.region}</p>
            <p>Sub Region: ${countryData.subregion}</p>
            <p>Capital: ${countryData.capital}</p>
          </div>
          <div class="flex flex-col gap-2">
            <p>Top level domain: ${countryData.tld}</p>
            <p>Currencies: ${Object.values(countryData.currencies)
              .map((item) => item.name)
              .join(", ")}</p>
            <p>Languages: ${Object.values(countryData.languages).join(", ")}</p>
          </div>
          </div>
          <div class="font-bold">
            Border Countries: <span id="borders" class="flex flex-wrap gap-4 p-4"></span>
          </div>
        </div>`;
    if (countryData.borders) {
      countryData.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((response) => response.json())
          .then(([data]) => {
            const borderContainer = document.createElement("a");
            borderContainer.href = `details.html?name=${data.name.common}`;
            borderContainer.className = `w-fit text-center dark:bg-[#2b3945] p-2 border-0 rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.3)]`;
            borderContainer.innerText = `${data.name.common}`;
            document.getElementById("borders").appendChild(borderContainer);
          });
      });
    }
  });
