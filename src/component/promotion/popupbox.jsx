import React from "react";

import Winner from "./winner";
import { useAppContext } from "../../context/Provider";

import { gameStatus } from "../../reducer/constant";
function popupbox() {
	const { appState } = useAppContext();

	if (
		appState.status === gameStatus.red_win ||
		appState.status === gameStatus.yel_win
	) {
		return (
			<div className='popup'>
				<Winner />
			</div>
		);
	}

	return null;
}

export default popupbox;
