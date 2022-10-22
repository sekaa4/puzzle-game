import { getMatrix } from './getMatrix';
import { setPosBox } from './setPositionBox';
import { shuffleArray } from './shuffleArray';
import { findPos } from './changePos';
import { validForSwap } from './changePos';
import { readyForSwap } from './changePos';

export default function createFrame(blockDiv, divCont, size = 16) {
	//Create Boxes in content
	let num = 0;
	let move = document.getElementById('moves');
	move.innerHTML = `0${num}`;

	for (let i = 1; i <= size; i++) {
		if (i === size) {
			let elem = blockDiv.getElem('div', 'box');
			elem.classList.add('blank');
			elem.setAttribute('data-id', `${i}`);
			elem.style.width = `${100 / Math.sqrt(size)}%`;
			elem.style.height = `${100 / Math.sqrt(size)}%`;
			elem.style.fontSize = `${100 / size}rem`;
			divCont.append(elem);
		} else {
			let elem = blockDiv.getElem('div', 'box', i);
			elem.setAttribute('data-id', `${i}`);
			elem.style.width = `${100 / Math.sqrt(size)}%`;
			elem.style.height = `${100 / Math.sqrt(size)}%`;
			elem.style.fontSize = `${100 / size}rem`;
			divCont.append(elem);
		}
	}

	//Position
	let boxNodes = Array.from(document.querySelectorAll('.box'));
	let matrix = getMatrix(boxNodes.map(el => +el.dataset.id), size);
	const shuffledArray = shuffleArray(matrix.flat());
	matrix = getMatrix(shuffledArray, size);
	setPosBox(boxNodes, matrix);

	//Shuffle
	document.getElementById('shuffle').addEventListener('click', () => {
		const shuffledArray = shuffleArray(matrix.flat());
		matrix = getMatrix(shuffledArray, size);
		setPosBox(boxNodes, matrix);
		num = 0;
		move.innerHTML = `0${num}`;
	});

	//Change position
	const blankNum = size;
	divCont.onclick = (e) => {
		const clickBox = e.target.closest('.box');
		if (!clickBox) {
			return;
		}

		const boxNum = +clickBox.dataset.id;
		const boxPos = findPos(boxNum, matrix);
		console.log(boxPos);
		const blankPos = findPos(blankNum, matrix);
		console.log(blankPos);
		const valid = validForSwap(boxPos, blankPos);
		let won = false;

		if (valid) {
			won = readyForSwap(boxPos, blankPos, matrix, size);
			setPosBox(boxNodes, matrix);
			console.log(1);
			num++;
			move.innerHTML = num <= 9 ? `0${num}` : `${num}`;
		}

		if (won) {
			console.log('Happy!');
		}
	};
}
