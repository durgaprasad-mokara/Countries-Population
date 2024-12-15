let searchInput = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");
let spinner = document.getElementById("spinner");
let url = "https://apis.ccbp.in/countries-data";
let searchInputValue = "";
let counterNamesList = [];

function display(jsonData) {
    spinner.classList.add("d-none");
    let {
        flag,
        name,
        population
    } = jsonData;
    counterNamesList.push(jsonData);
    let card_Container = document.createElement("div");
    card_Container.classList.add("country-card", "d-flex", "flex-row", "col-11", "col-md-5", "ml-auto", "mr-auto");

    let box1 = document.createElement("div");

    let Imageflag = document.createElement("img");
    Imageflag.src = flag;
    Imageflag.classList.add("country-flag", "mt-auto", "mb-auto", "mr-3");
    box1.appendChild(Imageflag);

    card_Container.appendChild(box1);

    let box2 = document.createElement("div");
    let Countey_Name = document.createElement("p");
    Countey_Name.classList.add("country-name");
    Countey_Name.textContent = name;
    box2.appendChild(Countey_Name);

    let population_Count = document.createElement("p");
    population_Count.classList.add("country-population");
    population_Count.textContent = population;
    box2.appendChild(population_Count);

    card_Container.appendChild(box2);

    resultCountries.appendChild(card_Container);
}

function get_The_values(event) {
    spinner.classList.remove("d-none");
    let option = {
        method: "GET"
    };
    fetch(url, option)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            for (let item of jsonData) {
                display(item);
            }
        });
}

function searchInputVal() {
    resultCountries.textContent = "";
    for (let country of counterNamesList) {
        let countryOfNames = country.name;
        if (countryOfNames.includes(searchInputValue)) {
            display(country);
        }
    }
}

function onsearchChange(event) {
    searchInputValue = event.target.value;
    searchInputVal();
}

get_The_values();
searchInput.addEventListener("keyup", onsearchChange);