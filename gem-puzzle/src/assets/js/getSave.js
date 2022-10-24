export default function getSave(matrix, size) {
	const time = document.querySelector('#time');
	let currentTime = time.innerHTML;

	const move = document.getElementById('moves');
	let currentMoves = move.innerHTML;

	const data = {
		matrix,
		size,
		time: currentTime,
		moves: currentMoves
	}

	localStorage.setItem('saveGameToLocalStorage', JSON.stringify(data));
}
