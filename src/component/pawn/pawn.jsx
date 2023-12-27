import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSpring, animated } from "react-spring";
import { cordinate } from "../../helper/helper";
import YPawn from "../../assets/app/pawn/y.png";
import RPawn from "../../assets/app/pawn/r.png";
import useWindowDimension from "../../hook/useWindowDimensions";
const Pawn = animated(({ position, player, parent_position }) => {
	const [view_port, setViewPort] = useState(useWindowDimension());

	const device =
		view_port.width <= 600 ? cordinate["medium"] : cordinate["large"];

	const getPawnSize = () => {
		if (view_port.width <= 600) {
			return parent_position.player1.value === parent_position.player2.value
				? "30px"
				: "40px";
		} else {
			return parent_position.player1.value === parent_position.player2.value
				? "40px"
				: "50px";
		}
	};

	return (
		<animated.div
			id={`pawn-${player}`}
			style={{
				position: "absolute",

				width: getPawnSize(),

				height: getPawnSize(),

				top:
					parent_position.player1.value === parent_position.player2.value &&
					player === "r"
						? "-7px"
						: parent_position.player1.value === parent_position.player2.value &&
						  player === "y"
						? "7px"
						: "",
				left:
					parent_position.player1.value === parent_position.player2.value &&
					player === "r"
						? "-7px"
						: parent_position.player1.value === parent_position.player2.value &&
						  player === "y"
						? "7px"
						: "",

				borderRadius: "50%",
				backgroundImage: player === "r" ? `url(${RPawn})` : `url(${YPawn})`,
				backgroundSize: "cover", // Ensure the image covers the entire div
				transform: `translate(${device[position].x}px, ${device[position].y}px)`,
				// transform: `translate(${250}px, ${450}px)`,
			}}
		/>
	);
});

export default Pawn;
