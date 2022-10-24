export function shuffleArray(arr, size) {
	let count = 1;
	let sum = 0;
	let shift = Math.sqrt(size);

	let shuffle = arr
		.map(elem => ({ elem, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ elem }) => elem);

	//check resolved
	let posBlank = shuffle.indexOf(size);
	if (size % 2 === 0) {
		while (posBlank > shift) {
			shift += Math.sqrt(size);
			count++;
		}
	} else {
		count = 0;
	}
	let numString = count;

	shuffle.forEach((el, inx) => {
		if (el !== size) {
			for (let i = inx; i < shuffle.length; i++) {
				el > shuffle[i] ? sum++ : null;
			}
		}
	});
	return ((numString + sum) % 2 === 0) ? shuffle : shuffleArray(shuffle, size);
}
