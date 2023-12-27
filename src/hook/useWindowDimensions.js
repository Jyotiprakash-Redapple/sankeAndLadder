import React, { useState, useEffect } from "react";
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return { width, height };
}

/**
 * @function useWindowDimension
 * @description get current window size
 * @author jyotiprakash panigrahi
 * @returns windowDimensions {}
 *
 */
export default function useWindowDimension() {
	const [windowDimensions, setWindowDimensions] = useState(() => {
		const view_port = getWindowDimensions();
		localStorage.setItem("view_port", JSON.stringify(view_port));
		return view_port;
	});

	function handelResize() {
		setWindowDimensions(() => {
			const view_port = getWindowDimensions();
			localStorage.setItem("view_port", JSON.stringify(view_port));
			return view_port;
		});
	}
	useEffect(() => {
		window.addEventListener("resize", handelResize);
		return () => {
			window.removeEventListener("resize", handelResize);
		};
	}, []);

	return windowDimensions;
}
