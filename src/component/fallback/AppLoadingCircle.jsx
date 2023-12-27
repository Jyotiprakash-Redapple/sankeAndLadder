import Lottie from "react-lottie";
import Loading from "../../assets/app/lottie/loading.json";
// its a fallback component i want change name like
// [domain][Element][Modifier]
function AppLoadingCircle() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: Loading,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#D3D3D3",
			}}>
			<Lottie options={defaultOptions} height={400} width={400} />
		</div>
	);
}

export { AppLoadingCircle };
