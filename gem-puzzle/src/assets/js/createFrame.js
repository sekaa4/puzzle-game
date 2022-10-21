import { getMatrix } from './getMatrix';
import { setPosBox } from './setPositionBox';
import { shuffleArray } from './shuffleArray';
import { findPos } from './changePos';
import { validForSwap } from './changePos';
import { readyForSwap } from './changePos';

export default function createFrame(blockDiv, size) {
	//Create Boxes in content
	let boxes = [];
	for (let i = 1; i <= size; i++) {
		if (i === size) {
			let elem = blockDiv.getElem('div', 'box');
			elem.classList.add('blank');
			elem.setAttribute('data-id', `${i}`);
			boxes.push(elem);
			divCont.append(elem);
		} else {
			let elem = blockDiv.getElem('div', 'box', i);
			elem.setAttribute('data-id', `${i}`);
			boxes.push(elem);
			divCont.append(elem);
		}
	}

	//Position
	let boxNodes = Array.from(document.querySelectorAll('.box'));
	let matrix = getMatrix(boxNodes.map(el => +el.dataset.id), size);
	const shuffledArray = shuffleArray(matrix.flat());
	matrix = getMatrix(shuffledArray, size);
	setPosBox(boxNodes, matrix);

	//Change position
	const blankNum = size;
	divCont.addEventListener('click', (e) => {
		const clickBox = e.target.closest('.box');
		if (!clickBox) {
			return;
		}

		const boxNum = +clickBox.dataset.id;
		const boxPos = findPos(boxNum, matrix);
		const blankPos = findPos(blankNum, matrix);
		const valid = validForSwap(boxPos, blankPos);
		let won;

		if (valid) {
			won = readyForSwap(boxPos, blankPos, matrix, size);
			setPosBox(boxNodes, matrix);
		}

		if (won) {
			console.log('Happy!');
		}
	});
}
