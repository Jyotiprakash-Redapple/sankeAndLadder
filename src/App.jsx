import { Suspense, useState, useEffect } from "react";
import appConfig from "./appconfig/appconfig";
import Board from "../src/screen/game-view/gameView";
import AIView from "../src/screen/game-view/gameViewAi";
import Lunch from "./screen/game/lunch";
import Home from "../src/screen/home/home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Client from "./client/client";
import { newSocketConnect } from "./reducer/move";
import { useAppContext } from "../src/context/Provider";

import { updateGameMode, newGameInitAi } from "../src/reducer/move";
import { gameMode } from "../src/reducer/constant";
import { AppLoadingCircle } from "./component/fallback/AppLoadingCircle";

function AuthGaurd() {
	const [query, setQuery] = useState(null);
	const navigate = useNavigate();
	const { dispatch } = useAppContext();
	useEffect(() => {
		const search = window.location.search;

		if (search) {
			const searchParams = new URLSearchParams(search);

			if (searchParams.get("auth_token")) {
				let queryVar = searchParams.get("auth_token");

				setQuery("auth_token");
				const client = new Client();
				dispatch(newSocketConnect({ socket: client }));
				dispatch(updateGameMode(gameMode.online));
				localStorage.setItem(appConfig.localStorageAuth, queryVar);
			} else {
				if (searchParams.get("mode")) {
					let queryVar = searchParams.get("mode");
					setQuery(queryVar);
				}
			}
		} else {
			console.log(
				"%cAuthentication Faild",
				"background-color: white; color: red; font-size: larger; font-weight: 700"
			);
		}
	}, []);

	if (query === appConfig.mode) {
		navigate("/play-game-ai", { replace: true });
		dispatch(updateGameMode(gameMode.offline));
		dispatch(newGameInitAi());
	}

	return <>{query === "auth_token" ? <Home /> : <AppLoadingCircle />}</>;
}

function App() {
	return (
		<div className='app'>
			<Suspense fallback={<AppLoadingCircle />}>
				<Routes>
					<Route path='/' element={<AuthGaurd />} />
					<Route path='/game-lunch' element={<Lunch />} />
					<Route path='/play-game' element={<Board />} />
					<Route path='/play-game-ai' element={<AIView />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
