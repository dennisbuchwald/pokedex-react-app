async function fetchPokemon(pokemon) {
	const id = isNaN(pokemon) ? pokemon.toLowerCase() : pokemon;
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${id}`
	);
	if (!response.ok) return null;
	return response.json();
}

export default fetchPokemon;
