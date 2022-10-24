import createFrame from './createFrame';

export default function getLoad(blockDiv, divCont) {
	const objDataSave = JSON.parse(localStorage.getItem('saveGameToLocalStorage'));
	const time = document.querySelector('#time');
	const move = document.getElementById('moves');
	if (!localStorage.getItem('saveGameToLocalStorage')) {
		return alert('No save result');
	}
	divCont.innerHTML = '';
	createFrame(blockDiv, divCont, objDataSave.size, objDataSave.matrix);
	time.innerHTML = objDataSave.time;
	move.innerHTML = objDataSave.moves;

	if (won(objDataSave.matrix, objDataSave.size)) {
		divCont.classList.add('won');
	}

	function won(matrix, size) {
		const winArr = new Array(size).fill(null).map((el, i) => i + 1);
		const flatMatrix = matrix.flat();
		for (let i = 0; i < winArr.length; i++) {
			if (winArr[i] !== flatMatrix[i]) return false;
		}
		return true;
	}
}
