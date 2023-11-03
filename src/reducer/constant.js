let gameStatus = {
	pending: "pending",
	ongoing: "ongoing",
	red_win: "red pawn winning",
	yel_win: "yellow pawn winning",
};
let initGame = {
	socket: null,
	position: [], // array
	turn: "", // string
	status: gameStatus.pending,
};

Object.freeze(initGame);

let actionTypes = {
	NEW_GAME_INIT: "NEW_GAME_INIT",
	BOARD_UPDATE: "BOARD_UPDATE",
	NEW_MOVE: "NEW_MOVE",

	WIN: "WIN",

	NEW_GAME: "NEW_GAME",

	//socket

	NEW_SOCKET_CONNECTION: "NEW_SOCKET_CONNECTION",
};

export { actionTypes, gameStatus };
