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
        responseAsJson.results.length;
        console.log(responseAsJson);
    } catch (error) {
        console.log(error);
    } finally {
        isLoading = false;
    }

}






loadData();