import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CRow, CCol, CContainer, CCard } from "@coreui/react";
import { useAppContext } from "../../context/Provider";
import { updateGameMode, newGameInitAi } from "../../reducer/move";
import { gameMode } from "../../reducer/constant";
function home() {
	const [timer, setTimer] = useState("");
	const navigate = useNavigate();

	const { appState, dispatch } = useAppContext();

	const handelRandomMatch = () => {
		appState.socket.onRendomMatch();
		navigate(`/game-lunch`, {
			replace: true,
		});
	};
	const handelPlayWithAi = () => {
		navigate(`/play-game-ai`, {
			replace: true,
		});
		dispatch(updateGameMode(gameMode.offline));
		dispatch(newGameInitAi());
	};
	return (
		<CContainer className='home_container' fluid>
			<div className='home_wrapper'>
				<div className='play_container'>
					{" "}
					<CRow className='justify-content-center'>
						<CCol xs='12'>
							<CCard
								style={{
									height: "250px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: "transparent",
									border: "none",
									outline: "none",
								}}>
								<div className='play_with_game'>{`PLAY  VS`}</div>
							</CCard>
						</CCol>
						<CCol xs='12'>
							<CCard
								style={{
									height: "250px",
									backgroundColor: "transparent",
									border: "none",
									outline: "none",
									marginBlock: "30px",
								}}>
								<CRow className='justify-content-around'>
									<CCol xs='4'>
										<button className='play_start_btn' onClick={handelRandomMatch}>
											<span>Player</span>
										</button>
									</CCol>
									<CCol xs='4'>
										<button className='play_start_btn' onClick={handelPlayWithAi}>
											<span>AI</span>
										</button>
									</CCol>
								</CRow>
							</CCard>
						</CCol>
					</CRow>
				</div>
			</div>
		</CContainer>
	);
}

export default home;
