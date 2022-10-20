export function getMatrix(arr, size) {
	const matrix = generateMatrix(size);

	let index = 0;
	while (index < arr.length) {
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < Math.sqrt(size); j++) {
				matrix[i][j] = arr[index];
				index += 1;
			}
		}
	}
	return matrix;
}

function generateMatrix(size) {
	const matrix = [];

	for (let i = 0; i < Math.sqrt(size); i++) {
		const addArr = [];
		matrix.push(addArr);
	}

	return matrix;
}
