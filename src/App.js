import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Display } from "./components/Display/Display.js";
import { Button } from "./components/Button/Button.js";
import { Footer } from "./components/Footer/Footer.js";

function App() {
	const version = "0.3.2";
	const developer = "Dennis Buchwald";
	const date = "6. März 2023";

	const [isShiny, setIsShiny] = useState(false);
	const [isInfo, setIsInfo] = useState(false);
	const [isList, setIsList] = useState(false);
	const [number, setNumber] = useState(6);

	const touchStart = useRef(null);

	const handlePrevClick = () => {
		setNumber((prev) => Math.max(1, prev - 1));
		setIsInfo(false);
	};

	const handleNextClick = () => {
		setNumber((prev) => Math.min(151, prev + 1));
		setIsInfo(false);
	};

	const handleShinyMode = () => {
		setIsShiny((prev) => !prev);
	};

	const handleInfo = () => {
		setIsInfo((prev) => !prev);
		setIsList(false);
	};

	const handleListToggle = () => {
		setIsList((prev) => !prev);
		setIsInfo(false);
	};

	const handleListSelect = (num) => {
		setNumber(num);
		setIsList(false);
		setIsInfo(false);
	};

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "ArrowLeft") {
				handlePrevClick();
				setIsList(false);
			}
			if (e.key === "ArrowRight") {
				handleNextClick();
				setIsList(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Swipe handlers
	const handleTouchStart = (e) => {
		touchStart.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e) => {
		if (touchStart.current === null) return;
		const diff = touchStart.current - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 50) {
			if (diff > 0) handleNextClick();
			else handlePrevClick();
			setIsList(false);
		}
		touchStart.current = null;
	};

	return (
		<div className="App">
			<div className="pokedex">
				<img
					className="pokedex-bg"
					src={`${process.env.PUBLIC_URL}/background_1-2-0.png`}
					alt="Pokédex"
				/>
				<div
					className="pokedex-lens"
					onClick={handleListToggle}
					title="Pokédex öffnen"
				/>
				<div className="pokedex-number">
					#{String(number).padStart(3, "0")}
				</div>
				<div
					className="pokedex-screen"
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
				>
					<Display
						number={number}
						isShiny={isShiny}
						isInfo={isInfo}
						isList={isList}
						onListSelect={handleListSelect}
					/>
				</div>
				<div className="pokedex-controls">
					<Button
						handlePrevClick={handlePrevClick}
						handleNextClick={handleNextClick}
						handleShinyMode={handleShinyMode}
						handleInfo={handleInfo}
						isShiny={isShiny}
						isInfo={isInfo}
					/>
				</div>
			</div>
			<Footer version={version} developer={developer} date={date} />
		</div>
	);
}

export default App;
