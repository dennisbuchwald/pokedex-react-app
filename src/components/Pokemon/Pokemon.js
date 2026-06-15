import React, { useState, useEffect } from "react";
import fetchPokemon from "./api.js";

function Pokemon(props) {
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		setPokemon(null);
		async function fetchData() {
			const data = await fetchPokemon(props.number);
			setPokemon(data);
		}
		fetchData();
	}, [props.number]);

	if (!pokemon) return <div className="pokemon-loading">Loading...</div>;

	const name =
		pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
	const id = String(pokemon.id).padStart(3, "0");

	if (props.isInfo) {
		const types = pokemon.types
			.map(
				(t) =>
					t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
			)
			.join(", ");
		const height = (pokemon.height / 10).toFixed(1);
		const weight = (pokemon.weight / 10).toFixed(1);

		return (
			<div className="pokemon-container ">
				<div className="pokemon-info">
					<h2 className="pokemon-name">{name}</h2>
					<p>Nr. {id}</p>
					<p>Typ: {types}</p>
					<p>Größe: {height} m</p>
					<p>Gewicht: {weight} kg</p>
				</div>
			</div>
		);
	}

	return (
		<div className="pokemon-container ">
			<h2 className="pokemon-name">{name}</h2>
			<img
				className="pokemon-image"
				src={
					props.isShiny
						? pokemon.sprites.front_shiny
						: pokemon.sprites.front_default
				}
				alt={pokemon.name}
			/>
		</div>
	);
}

export default Pokemon;
