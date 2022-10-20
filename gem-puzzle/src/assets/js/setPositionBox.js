export function setPosBox(boxNodes, matrix) {
	for (let i = 0; i < matrix[0].length; i++) {
		for (let j = 0; j < matrix.length; j++) {
			const number = matrix[i][j];
			const box = boxNodes[number - 1];
			setBoxStyles(box, i, j);
		}
	}
}

function setBoxStyles(box, x, y) {
	const shift = 100;
	box.style.transform = `translate(${y * shift}%, ${x * shift}%)`;
}
