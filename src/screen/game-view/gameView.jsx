import React, { useEffect, useState, useRef } from "react";
import Board_ from "../../component/board/board";
import opponetAvatar from "../../assets/app/search_avatar/avatar1.jpg";
import profileAvatar from "../../assets/app/search_avatar/avatar2.jpg";
import ProfileBorder from "../../assets/app/profile_border.png";
import Dice from "react-dice-roll";
import { useAppContext } from "../../context/Provider";
import roolingSound from "../../audio/rpg-dice-rolling-95182.mp3";
import {
	diceBorderColor,
	snakes,
	ladder,
	snakeCordinate,
	cordinate,
} from "../../helper/helper";

import {
	makeNewMove,
	makeTrunChange,
	dectateWin,
	updateGameStatus,
} from "../../reducer/move";
import { gameStatus } from "../../reducer/constant";
import appConfig from "../../appconfig/appconfig";
import ReactDice from "react-dice-complete";
import PawnMovementSound from "../../audio/pawn_movement.mp3";
import LadderSound from "../../audio/ladder.mp3";
import SnakeSound from "../../audio/sanke.mp3";
import useWindowDimension from "../../hook/useWindowDimensions";
import { useNavigate } from "react-router-dom";
function Board() {
	const [view_port, setViewPort] = useState(useWindowDimension());

	const [animate, setAnimate] = useState(false);

	const { appState, dispatch } = useAppContext();
	const navigate = useNavigate();

	const diceRef = useRef();
	/**
	 *
	 * @param {*} player_turn
	 * @param {*} diceRoll
	 * @function movePlayer
	 * @description pawn movement logic
	 */
	function movePlayer(player_turn, diceRoll) {
		let currentPosition = 0;
		setAnimate(true);
		console.log("player move,,,,,,");
		if (appState.position.player1.color === player_turn) {
			currentPosition += appState.position.player1.value;
		} else {
			if (appState.position.player2.color === player_turn) {
				currentPosition += appState.position.player2.value;
			} else {
				throw new Error("Invalid Player");
			}
		}

		for (let i = 1; i <= diceRoll; i++) {
			setTimeout(() => {
				currentPosition += 1;

				let soundSource = PawnMovementSound;
				let sound = new Audio(soundSource);
				sound.play();

				dispatch(
					makeNewMove({
						player_turn,
						currentPosition: currentPosition <= 100 ? currentPosition : 100,
					})
				);
				if (currentPosition >= 100) {
					dispatch(dectateWin(player_turn));
					return;
				}
				// console.log(currentPosition, "after move dice ");
				if (i === diceRoll) {
					// Clear animation after the last step
					handleSnakeAndLadder(player_turn, currentPosition);
				}
			}, i * 225.5);
		}
	}

	/**
	 *
	 * @param {*} player_turn
	 * @param {*} position
	 * @function handleSnakeAndLadder
	 * @description according to position and player turn handel sanke and ladder
	 * @returns end of function execute
	 */

	const handleSnakeAndLadder = async (player_turn, position) => {
		let currentPosition = position;
		let player = player_turn === "r" ? "player-1" : "player-2";
		let device = view_port.width <= 600 ? "medium" : "large";
		if (snakes[position]?.length >= 1) {
			const snakePositionArr = snakes[position];

			for (let i = 0; i < snakePositionArr.length; i++) {
				currentPosition = snakePositionArr[i];
				let cord = cordinate[device][currentPosition];

				await animatePawn(player_turn, player, currentPosition, cord.x, cord.y);
			}

			if (ladder[snakePositionArr[snakePositionArr.length - 1]]?.length >= 1) {
				const ladderPositionArr = ladder[snakePositionArr[snakePositionArr.length - 1]];

				for (let i = 0; i < ladderPositionArr.length; i++) {
					currentPosition = ladderPositionArr[i];
					let cord = cordinate[device][currentPosition];

					await animatePawn(player_turn, player, currentPosition, cord.x, cord.y);
				}
			}
		} else if (ladder[position]?.length >= 1) {
			const ladderPositionArr = ladder[position];

			for (let i = 0; i < ladderPositionArr.length; i++) {
				currentPosition = ladderPositionArr[i];
				let cord = cordinate[device][currentPosition];

				await animatePawn(player_turn, player, currentPosition, cord.x, cord.y);
			}

			if (snakes[ladderPositionArr[ladderPositionArr.length - 1]]?.length >= 1) {
				const snakePositionArr =
					snakes[ladderPositionArr[ladderPositionArr.length - 1]];

				for (let i = 0; i < snakePositionArr.length; i++) {
					currentPosition = snakePositionArr[i];
					let cord = cordinate[device][currentPosition];

					await animatePawn(player_turn, player, currentPosition, cord.x, cord.y);
				}
			}
		}

		dispatch(makeNewMove({ player_turn, currentPosition }));

		// Change turn after the animations complete
		setTimeout(() => {
			dispatch(makeTrunChange());
			setAnimate(false);
		}, 3000);
	};

	const animatePawn = async (turn, player, position, x, y) => {
		return new Promise((resolve) => {
			// Find the pawn element by its player_turn and update its style
			const pawnElement = document.getElementById(`pawn-${turn}`);
			console.log(pawnElement, player, x, y);
			if (pawnElement) {
				pawnElement.style.transition = "transform 0.3s ease-in-out";
				pawnElement.style.transform = `translate(${x}px, ${y}px)`;
			}
			// Resolve the promise after the transition duration
			setTimeout(() => {
				resolve();
			}, 280); // Adjust the duration based on your preference
		});
	};
	function handelRollDice() {
		var should_play = true;
		if (appState.status === gameStatus.pending) {
			dispatch(updateGameStatus());
		}
		if (!animate) {
			diceRef?.current?.rollAll();
			if (should_play) {
				should_play = !should_play;
				let soundSource = roolingSound;
				let sound = new Audio(soundSource);
				sound.play();
				sound.onended = () => {
					should_play = true;
				};
			}
		}
	}

	useEffect(() => {
		if (!appState.socket) {
			navigate("/", {
				replace: true,
			});
		} else {
			appState.socket.getUpdateDetailsFromServer(dispatch);
		}
	}, [appState.socket]);
	// useEffect(() => {
	// 	if (!appState.mode) {
	// 		navigate("/", {
	// 			replace: true,
	// 		});
	// 		return;
	// 	}
	// }, []);

	return (
		<div className='board_container'>
			<div>hello</div>
			<div className='game_borad'>
				<Board_ playerPositions={appState.position} turn={appState.turn} />
				<div className='profile'>
					<div
						className='player_1'
						style={{
							border: `10px solid ${diceBorderColor(appState.position.player1.color)} `,
							borderRadius: "100%",
						}}>
						{" "}
						<div
							className='user_profile'
							style={{
								borderRadius: "100%",
							}}>
							<img
								src={profileAvatar}
								alt={``}
								style={{
									position: "absolute",
									width: "60px",
									height: "60px",
									borderRadius: "100px",
								}}
							/>
							<img
								src={ProfileBorder}
								alt={``}
								style={{
									position: "absolute",
									width: "100%",
									height: "100%",
									borderRadius: "100px",
								}}
							/>
						</div>{" "}
					</div>
					<div className='clickbale_pawn'>
						{" "}
						<div
							className='dice_movement'
							style={{
								border: `8px solid ${diceBorderColor(appState?.turn)}`,
								pointerEvents:
									appState.position.player1.color === appState.turn && !animate ? "auto" : "none",
								cursor: "pointer",
								position: "relative",
							}}
							onClick={handelRollDice}>
							<ReactDice
								numDice={1}
								rollTime={1}
								ref={diceRef}
								disableIndividual
								// disableRandom
								faceColor={
									appState.turn === "r"
										? "radial-gradient(rgb(255, 60, 60), rgb(180, 0, 0))"
										: "radial-gradient(rgb(255, 245, 60), rgb(180, 162, 0))"
								}
								dotColor='#fff'
								dieSize={40}
								rollDone={(val) => {
									if (appState.status === gameStatus.ongoing) {
										console.log(appState.status, "gAME TT");
										movePlayer(appState?.turn, val);
									}
								}}
							/>
						</div>
					</div>
					<div
						className='player_2'
						style={{
							border: `10px solid ${diceBorderColor(appState.position.player2.color)} `,
							borderRadius: "100%",
						}}>
						{" "}
						<div
							className='user_profile'
							style={{
								borderRadius: "100%",
							}}>
							<img
								src={opponetAvatar}
								alt={``}
								style={{
									position: "absolute",
									width: "60px",
									height: "60px",
									borderRadius: "100px",
								}}
							/>
							<img
								src={ProfileBorder}
								alt={``}
								style={{
									position: "absolute",
									width: "100%",
									height: "100%",
									borderRadius: "100px",
								}}
							/>
						</div>{" "}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Board;
