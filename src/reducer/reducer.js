import { actionTypes, gameStatus, gameMode } from "./constant";

let reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.GAME_MODE: {
			return {
				...state,
				mode: action.payload,
			};
		}

		// game init when click player btn
		case actionTypes.NEW_GAME_INIT: {
			const player = action.payload.arg.player;
			let gameInit = {
				position: {
					player1: {
						color: player.colour === "white" ? "r" : "y",
						value: 1,
						score: 0,
						user_name: player.user_name,
						id: player.id,
					},
					player2: {
						color: action.payload.arg.opponent.colour === "black" ? "y" : "r",
						value: 1,
						score: 0,
						user_name: action.payload.arg.opponent.user_name,
						id: action.payload.arg.opponent.id,
					},
				},

				turn: "r",
				status: gameStatus.pending,
			};

			return {
				...state,
				...gameInit,
			};
		}
		case actionTypes.NEW_GAME_INIT_AI: {
			return {
				...state,
				...action.payload,
			};
		}

		// socket board update each movement
		case actionTypes.BOARD_UPDATE: {
			let board = action.payload.arg.board;
			console.log(board, "updated board from server");
			if (board) {
				if (board?.turn) {
					return {
						...state,
						turn: board.turn,
						// advantage: board?.advantage ? board.advantage : state.advantage,
					};
				} else {
					if (board?.status) {
						return {
							...state,
							status: board.status,
							// advantage: board?.advantage ? board.advantage : state.advantage,
						};
					} else {
						let updatedColor = board.color;
						if (state.position.player1.color === updatedColor) {
							state.position.player1.value = board.currentPosition;
							state.advantage = board?.advantage ? board.advantage : state.advantage;
						} else {
							if (state.position.player2.color === updatedColor) {
								state.position.player2.value = board.currentPosition;
								state.advantage = board?.advantage ? board.advantage : state.advantage;
							}
						}

						return {
							...state,
						};
					}
				}
			}
		}

		// new move happen in board
		case actionTypes.NEW_MOVE: {
			let advantage = state.advantage;
			let advantageStatus = "";
			let updatedColor = action.payload.player_turn;
			if (state.position.player1.color === updatedColor) {
				state.position.player1.value = action.payload.currentPosition;
			} else {
				if (state.position.player2.color === updatedColor) {
					state.position.player2.value = action.payload.currentPosition;
				}
			}
			if (
				state.position.player1.value > state.position.player2.value &&
				state.position.player1.color === "r"
			) {
				advantage = state.position.player1.value - state.position.player2.value;
				advantageStatus = "r";
			} else {
				if (
					state.position.player1.value > state.position.player2.value &&
					state.position.player1.color === "y"
				) {
					advantage = state.position.player1.value - state.position.player2.value;
					advantageStatus = "y";
				}
			}
			console.log(advantage, "advantage ", state.position.player1.color);

			if (state.mode === gameMode.online) {
				state.socket.onUpdateMove({
					board: {
						color: action.payload.player_turn,
						currentPosition: action.payload.currentPosition,
						advantage: advantage,
					},
					game_state: {
						status: state.status,
						advantage:
							advantage === 0 || state.position.player1.value === state.position.player2.value
								? "Niether Side "
								: advantageStatus,
					},
				});
			}
			return {
				...state,
				advantage: advantage,
			};
		}

		// change the turn in board
		case actionTypes.TURN_CHANGE: {
			let turn = state.turn === "r" ? "y" : "r";

			if (state.mode === gameMode.online) {
				state.socket.onUpdateMove({
					board: {
						turn,
					},
					game_state: {
						status: state.status,
						advantage:
							state.advantage === 0
								? "Niether Side "
								: state.advantage > 0
								? "red"
								: "yellow",
					},
				});
			}
			return {
				...state,
				turn,
			};
		}
		// change game status
		case actionTypes.STATUS: {
			return {
				...state,
				status: gameStatus.ongoing,
			};
		}
		// win one player
		case actionTypes.WIN: {
			let winner = action.payload === "r" ? gameStatus.r_win : gameStatus.y_win;
			if (state.mode === gameMode.online) {
				state.socket.onUpdateMove({
					board: { status: winner },
					game_state: {
						status: winner,
						advantage:
							state.advantage === 0
								? "Niether Side "
								: state.advantage > 0
								? "red"
								: "yellow",
					},
				});
				state.socket.onUpdateWin({
					player: {
						id: state.position.player1.id,
						score: state.position.player1.value,
						colour: state.position.player1.color,
					},
					opponent: {
						id: state.position.player2.id,
						score: state.position.player2.value,
						colour: state.position.player2.color,
					},
					winner: winner,
				});
			}
			return {
				...state,
				status: winner,
			};
		}
		// socket connection save in state container
		case actionTypes.NEW_SOCKET_CONNECTION: {
			return {
				...state,
				socket: action.payload.socket,
			};
		}
		default: {
			state;
			break;
		}
	}
};

export { reducer };
