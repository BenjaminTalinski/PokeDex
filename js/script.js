const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const limit = 26;
let offset = 0;
let isLoading = false;

async function loadData() {
    if (isLoading) return;
    isLoading = true;

    try {
        let response = await fetch(BASE_URL + "?limit=" + limit + "&offset=" + offset);
        let responseAsJson = await response.json();
        showData(responseAsJson.results)
    } catch (error) {
        console.log(error);
    } finally {
        isLoading = false;
    }

}

function showData(pokemonList) {
    let pkmBox = document.getElementById("pkmList");
    for (let i = 0; i < pokemonList.length; i++) {
        let pkmList = document.createElement("div")
        pkmList.classList.add("pkmCard");
        let pkmNames = document.createElement("p")
        pkmNames.classList.add("pkmName");
        pkmNames.innerText = pokemonList[i].name;
        pkmList.appendChild(pkmNames);
        pkmBox.appendChild(pkmList);

    }

}



loadData();