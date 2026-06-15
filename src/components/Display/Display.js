import React from "react";
import "./Display.css";
import Pokemon from "../Pokemon/Pokemon.js";
import PokedexList from "../PokedexList/PokedexList.js";

export function Display(props) {
	if (props.isList) {
		return (
			<div className="display">
				<PokedexList
					currentNumber={props.number}
					onSelect={props.onListSelect}
				/>
			</div>
		);
	}

	return (
		<div className="display" key={props.number}>
			<div className="pokemon-container">
				<Pokemon
					number={props.number}
					isShiny={props.isShiny}
					isInfo={props.isInfo}
				/>
			</div>
		</div>
	);
}

export default Display;
