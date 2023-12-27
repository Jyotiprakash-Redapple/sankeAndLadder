import React from "react";

const Square = ({ number, player, turn }) => {
	return (
		//  <div className={`square ${player.length > 1 ? "multiplayer" : ""}`}>
		// 	{/* {player.length
		// 		? player.map((el, idx) => {
		// 				return (
		// 					<div
		// 						key={idx}
		// 						className={`player pl-${player.length > 1 ? "m" : "s"} ${el.color} 	`}
		// 						id={`pawn-${el.color}`}
		// 						style={{
		// 							top: `${idx * 10}px`, // Adjust the vertical position of players within the square
		// 							left: `${idx * 10}px`, // Adjust the horizontal position of players within the square
		// 						}}></div>
		// 				);
		// 		  })
		// 		: null} */}

		//  </div>
		<div
			className='square'
			style={{
				width: "50px", // Adjust the width of your square
				height: "50px", // Adjust the height of your square
				// Example border style
				boxSizing: "border-box",
				// ... other styles
			}}>
			{/* {number} */}
		</div>
	);
};

export default Square;
