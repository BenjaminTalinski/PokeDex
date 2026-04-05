const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const limit = 26;
let offset = 0;
let isLoading = false;

async function loadData() {
  if (isLoading) return;
  isLoading = true;

  try {
    let response = await fetch(
      BASE_URL + "?limit=" + limit + "&offset=" + offset,
    );
    let responseAsJson = await response.json();
    showData(responseAsJson.results);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading = false;
  }
}

async function loadDetailData(detailUrl) {
  //   if (isLoading) return;
  //   isLoading = true;
  let response = await fetch(detailUrl);
  let responseAsJson = await response.json();

  try {
  } catch (error) {
    console.log(error);
  } finally {
    // isLoading = false;
  }
  return responseAsJson;
}

function createPkmCard(detailData) {
  let pkmList = document.createElement("div");
  pkmList.classList.add("pkmCard");
  let pkmNames = document.createElement("p");
  pkmNames.classList.add("pkmName");
  let pkmWeight = document.createElement("p");
  pkmWeight.classList.add("pkmWeight");
  let pkmHeight = document.createElement("p");
  pkmHeight.classList.add("pkmHeight");
  let pkmImg = document.createElement("img");
  pkmImg.classList.add("pkmImg");
  let pkmImgShiny = document.createElement("img");
  pkmImgShiny.classList.add("pkmImgShiny");
  let toggleBtn = document.createElement("button");
  toggleBtn.classList.add("toggleBtn");
  let baseName =
    detailData.name.charAt(0).toUpperCase() + detailData.name.slice(1);

  pkmImg.src = detailData.sprites.front_default;
  pkmImgShiny.src = detailData.sprites.front_shiny;

  pkmNames.innerText =
    detailData.name.charAt(0).toUpperCase() + detailData.name.slice(1);
  pkmWeight.innerText = "Weight: " + detailData.weight;
  pkmHeight.innerText = "Height: " + detailData.height;
  toggleBtn.innerText = "Shiny";

  toggleBtn.addEventListener("click", function () {
    if (pkmImg.style.display !== "none") {
      pkmImg.style.display = "none";
      pkmImgShiny.style.display = "block";
      toggleBtn.innerText = "Default";
      pkmNames.innerText = baseName + " (Shiny)";
    } else {
      pkmImgShiny.style.display = "none";
      pkmImg.style.display = "block";
      toggleBtn.innerText = "Shiny";
      pkmNames.innerText = baseName;
    }
  });

  pkmList.appendChild(pkmNames);
  pkmList.appendChild(pkmImg);
  pkmList.appendChild(pkmImgShiny);
  pkmList.appendChild(pkmWeight);
  pkmList.appendChild(pkmHeight);
  pkmList.appendChild(toggleBtn);

  return pkmList;
}

async function showData(pokemonList) {
  let pkmBox = document.getElementById("pkmList");

  for (let i = 0; i < pokemonList.length; i++) {
    let detailData = await loadDetailData(pokemonList[i].url);
    let pkmCard = createPkmCard(detailData);

    pkmBox.appendChild(pkmCard);
  }
}

loadData();
// loadDetailData();
