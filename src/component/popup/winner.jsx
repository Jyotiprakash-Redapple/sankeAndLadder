import React from "react";
import { gameStatus } from "../../reducer/constant";
import { useAppContext } from "../../context/Provider";
import WinnerSound from "../../audio/winharpsichord-39642.mp3";
function winner() {
	const { appState } = useAppContext();
	return (
		<div className="popup--inner popup--inner__center">
			{/* <h1>{isWin ? status : "Draw"}</h1> */}
			<p>{appState.status}</p>
			<div
				className={`wins ${
					appState.status === gameStatus.r_win ? "red" : "yellow"
				}`}
			/>
			<audio autoPlay style={{ opacity: 0 }}>
				<source src={WinnerSound} type="audio/mp3" />
			</audio>
			{/* <button onClick={newGame}>New Game</button> */}
		</div>
	);
}

export default winner;
