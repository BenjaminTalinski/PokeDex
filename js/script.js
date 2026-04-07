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
  let baseName =
    detailData.name.charAt(0).toUpperCase() + detailData.name.slice(1);
  let pkmTypes = detailData.types.map(
    (typeInfo) =>
      typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1),
  );
  let pkmTypeColors = pkmTypes.map((type) => getTypeColor(type.toLowerCase()));

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
  let pkmTypesText = document.createElement("p");
  pkmTypesText.classList.add("pkmTypes");

  pkmImg.src = detailData.sprites.front_default;
  pkmImgShiny.src = detailData.sprites.front_shiny;

  pkmNames.innerText = baseName;
  pkmWeight.innerText = "Weight: " + detailData.weight;
  pkmHeight.innerText = "Height: " + detailData.height;
  toggleBtn.innerText = "Shiny";
  pkmTypesText.innerText = pkmTypes;

  if (pkmTypeColors.length === 1) {
    pkmList.style.backgroundColor = pkmTypeColors[0];
  } else if (pkmTypeColors.length === 2) {
    pkmList.style.background = `linear-gradient(110deg, ${pkmTypeColors[0]} 50%, ${pkmTypeColors[1]} 50%)`;
  }

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
  pkmList.appendChild(pkmTypesText);
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

function getTypeColor(type) {
  if (type === "normal") return "#bbbbaa";
  if (type === "fighting") return "#bb5544";
  if (type === "flying") return "#96caff";
  if (type === "poison") return "#9553cd";
  if (type === "ground") return "#a67439";
  if (type === "rock") return "#bbaa66";
  if (type === "bug") return "#92c12a";
  if (type === "ghost") return "#6e4370";
  if (type === "steel") return "#aaaabb";
  if (type === "fire") return "#ff421c";
  if (type === "water") return "#2c9be3";
  if (type === "grass") return "#62bc5a";
  if (type === "electric") return "#ffdc00";
  if (type === "psychic") return "#ff6380";
  if (type === "ice") return "#74cfc0";
  if (type === "dragon") return "#5670be";
  if (type === "dark") return "#4e4545";
  if (type === "fairy") return "#ec8fe6";
  return "#ffffff";
}

loadData();
// loadDetailData();
