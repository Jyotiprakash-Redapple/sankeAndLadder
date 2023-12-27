/**
 *
 * @param {*} element
 * @param {*} position
 * @function animatePawn
 * @description animate pawn movement
 */
function animatePawn(element, position) {
	console.log("animate", element);
	element.style.display = "none";
	element.style.transition = "transform 0.3s ease-in-out";
	element.style.transform = `translate(${calculateX(position)}px, ${calculateY(
		position
	)}px)`;

	console.log(calculateX(position), calculateY(position), "x and y cordinate");
}

/**
 *
 * @param {*} position
 * @function calculateX
 * @returns x - cordinate
 */

function calculateX(position) {
	const col = (position - 1) % 10;
	return col * RESPONSIVE_TILE_SIZE["desktop"];
}

/**
 *
 * @param {*} position
 * @function calculateY
 * @returns y - cordinate
 */
function calculateY(position) {
	const row = Math.floor((position - 1) / 10);
	return row * RESPONSIVE_TILE_SIZE["desktop"];
}
