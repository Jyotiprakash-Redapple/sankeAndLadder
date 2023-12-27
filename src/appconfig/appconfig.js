const appConfig = {};
import Avatar1 from "../assets/app/search_avatar/avatar1.jpg";
import Avatar2 from "../assets/app/search_avatar/avatar2.jpg";
import Avatar3 from "../assets/app/search_avatar/avatar3.jpg";
import Avatar4 from "../assets/app/search_avatar/avatar4.png";
import Avatar5 from "../assets/app/search_avatar/avatar5.jpg";
import Avatar6 from "../assets/app/search_avatar/avatar6.jpg";
import Avatar7 from "../assets/app/search_avatar/avatar7.jpg";

import Avatar8 from "../assets/app/search_avatar/avatar8.jpg";
import Avatar9 from "../assets/app/search_avatar/avatar9.jpg";
import Avatar10 from "../assets/app/search_avatar/avatar10.png";
import Avatar11 from "../assets/app/search_avatar/avatar11.jpg";
import Avatar12 from "../assets/app/search_avatar/avatar12.png";
import Avatar13 from "../assets/app/search_avatar/avatar13.jpeg";
import Avatar14 from "../assets/app/search_avatar/avatar14.jpg";
import Avatar15 from "../assets/app/search_avatar/avatar15.jpg";

appConfig.avatarArray = [
	{ name: "Robot", avatar: Avatar1 },
	{ name: "Pyhsot", avatar: Avatar2 },
	{ name: "Liza", avatar: Avatar3 },
	{ name: "Somya", avatar: Avatar4 },
	{ name: "Rohini", avatar: Avatar5 },
	{ name: "Ram", avatar: Avatar6 },
	{ name: "Chiku", avatar: Avatar7 },
	{ name: "Robot", avatar: Avatar8 },
	{ name: "Pyhsot", avatar: Avatar9 },
	{ name: "Liza", avatar: Avatar10 },
	{ name: "Somya", avatar: Avatar11 },
	{ name: "Rohini", avatar: Avatar12 },
	{ name: "Ram", avatar: Avatar13 },
	{ name: "Chiku", avatar: Avatar14 },
	{ name: "Chiku", avatar: Avatar15 },
];
appConfig.mode = "offline";
appConfig.RESPONSIVE_TILE_SIZE = {
	desktop: 50, // @media only screen and (min-width: 768px)
};
appConfig.DELAY_BETWEEN_STEPS = 10; // milliseconds

appConfig.MAX_BOARD_POSITION = 100;
appConfig.localStorageAuth = "auth_token";
export default appConfig;
