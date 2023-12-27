import React from "react";

import Winner from "./winner";
import { useAppContext } from "../../context/Provider";

import { gameStatus } from "../../reducer/constant";
function popupbox() {
	const { appState } = useAppContext();

	if (
		appState.status === gameStatus.r_win ||
		appState.status === gameStatus.y_win
	) {
		return (
			//
			<></>
		);
	}

	return null;
}

export default popupbox;
