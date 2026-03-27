const apiBase = "https://pokeapi.co/api/v2/pokemon";
const limit = 26;
let offset = 0;
let isLoading = false;

async function loadInitialPokemon() {
if (isLoading) return;
isLoading = true; 
}
