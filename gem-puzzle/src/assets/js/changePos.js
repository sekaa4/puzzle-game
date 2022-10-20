export function findPos(num, matrix) {
	for (let i = 0; i < matrix[0].length; i++) {
		for (let j = 0; j < matrix.length; j++) {
			if (matrix[i][j] === num) {
				let x = i;
				let y = j;
				return { x, y }
			}
		}
	}
}

export function validForSwap(pos1, pos2) {
	const diffX = Math.abs(pos1.x - pos2.x);
	const diffY = Math.abs(pos1.y - pos2.y);

	const valid = (diffX === 1 || diffY === 1) && (pos1.x === pos2.x || pos1.y === pos2.y);

	return valid;
}

export function readyForSwap(pos1, pos2, matrix, size) {
	[matrix[pos1.x][pos1.y], matrix[pos2.x][pos2.y]] = [matrix[pos2.x][pos2.y], matrix[pos1.x][pos1.y]];
	if (won(matrix, size)) {
		return true;
	}
}

function won(matrix, size) {
	const winArr = new Array(size).fill(null).map((el, i) => i + 1);
	const flatMatrix = matrix.flat();
	for (let i = 0; i < winArr.length; i++) {
		if (winArr[i] !== flatMatrix[i]) return false;
	}

	return true;
}
