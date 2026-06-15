import React from "react";
import "./Button.css";

import buttonSound from "./button-sound-2.mp3";

export function Button({
	handlePrevClick,
	handleNextClick,
	handleShinyMode,
	handleInfo,
	isShiny,
	isInfo,
}) {
	const playSound = () => {
		new Audio(buttonSound).play();
	};

	return (
		<div className="buttons">
			<div className="top-buttons">
				<button
					className="button btn-prev"
					onClick={() => {
						handlePrevClick();
						playSound();
					}}
				>
					Vorheriges Pokemon
				</button>
				<button
					className="button btn-next"
					onClick={() => {
						handleNextClick();
						playSound();
					}}
				>
					Nächstes Pokemon
				</button>
			</div>
			<div className="bottom-buttons">
				<button
					className={`button shiny ${isShiny ? "active" : ""}`}
					onClick={() => {
						handleShinyMode();
						playSound();
					}}
				>
					Shiny Mode
				</button>
				<button
					className={`button info ${isInfo ? "active" : ""}`}
					onClick={() => {
						handleInfo();
						playSound();
					}}
				>
					Info
				</button>
			</div>
		</div>
	);
}

export default Button;
