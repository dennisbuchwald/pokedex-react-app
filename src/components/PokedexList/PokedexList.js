import React, { useState, useEffect, useRef } from "react";
import "./PokedexList.css";

function PokedexList({ currentNumber, onSelect }) {
	const [pokemonList, setPokemonList] = useState([]);
	const activeRef = useRef(null);

	useEffect(() => {
		async function fetchList() {
			const res = await fetch(
				"https://pokeapi.co/api/v2/pokemon?limit=151"
			);
			if (!res.ok) return;
			const data = await res.json();
			setPokemonList(data.results);
		}
		fetchList();
	}, []);

	useEffect(() => {
		if (activeRef.current) {
			activeRef.current.scrollIntoView({
				block: "center",
				behavior: "smooth",
			});
		}
	}, [pokemonList, currentNumber]);

	if (!pokemonList.length) return <div className="pokedex-list">Loading...</div>;

	return (
		<div className="pokedex-list">
			{pokemonList.map((p, i) => {
				const num = i + 1;
				const name = p.name.charAt(0).toUpperCase() + p.name.slice(1);
				const isActive = num === currentNumber;
				return (
					<div
						key={num}
						ref={isActive ? activeRef : null}
						className={`pokedex-list-item ${isActive ? "active" : ""}`}
						onClick={() => onSelect(num)}
					>
						<span className="list-number">
							{String(num).padStart(3, "0")}
						</span>
						<span className="list-name">{name}</span>
					</div>
				);
			})}
		</div>
	);
}

export default PokedexList;
