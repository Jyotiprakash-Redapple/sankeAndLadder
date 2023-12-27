import React from "react";
import GameBoard from "../../assets/app/game_board.jpg";
import Square from "../square/square";
import Popup from "../../component/popup/popup";
import { initBoardPosition } from "../../helper/helper";
import Pawn from "../pawn/pawn";
import { cordinate } from "../../helper/helper";
function board({ playerPositions, animate, turn }) {
	const renderSquares = () => {
		const squares = [];

		for (let i = 0; i < initBoardPosition.length; i++) {
			const player = getPlayerAtPosition(initBoardPosition[i]);

			squares.push(
				<Square
					key={i}
					number={initBoardPosition[i]}
					player={player}
					animate={animate}
					turn={turn}
				/>
			);
		}

		return squares;
	};

	const getPlayerAtPosition = (position) => {
		let playerIdentity = [];
		for (const [key, _] of Object.entries(playerPositions)) {
			if (_.value === position) {
				playerIdentity.push({ player: key, color: _.color });
			}
		}

		return playerIdentity;
	};

	return (
		<>
			<img src={GameBoard} className='game_board_img'></img>
			<div className='board_temp'>
				{renderSquares()}
				<Pawn
					position={playerPositions.player1.value}
					parent_position={playerPositions}
					player={playerPositions.player1.color}
				/>
				<Pawn
					position={playerPositions.player2.value}
					parent_position={playerPositions}
					player={playerPositions.player2.color}
				/>
			</div>
			<Popup></Popup>
		</>
	);
}

export default board;
