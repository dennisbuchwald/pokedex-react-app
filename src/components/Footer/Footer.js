import React from "react";
import "./Footer.css";

export function Footer(props) {
	return (
		<footer className="footer-container">
			<p className="footer-item">
				Version:
				<br /> {props.version}
			</p>
			<p className="footer-item">
				Entwickler:
				<br />
				<a
					href="https://dennisbuchwald.de"
					target="_blank"
					rel="noopener noreferrer"
				>
					{props.developer}
				</a>
			</p>
			<p className="footer-item">
				Letztes Update:
				<br /> {props.date}
			</p>
		</footer>
	);
}

export default Footer;
