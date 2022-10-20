export function shuffleArray(arr) {
	return arr
		.map(elem => ({ elem, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ elem }) => elem);
}
