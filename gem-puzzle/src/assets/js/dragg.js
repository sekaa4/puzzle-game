import { setPosBox } from './setPositionBox';
import { findPos } from './changePos';
import { validForSwap } from './changePos';
import { readyForSwap } from './changePos';

export default function dragg(matrix, size, boxNodes, num) {
	const content = document.querySelector('.content');
	const boxes = document.querySelectorAll('.box');
	const blank = document.querySelector('.box.blank');
	let move = document.getElementById('moves');
	let currentBoxId = null;

	content.ondragover = allowDrop;
	content.ondragenter = dragEnter;
	content.ondrop = drop;

	function allowDrop(event) {
		event.preventDefault();
	}

	boxes.forEach((el) => {
		el.ondragstart = drag;
	});

	function drag(event) {
		event.dataTransfer.setData('id', event.target.dataset.id);
		currentBoxId = +event.dataTransfer.getData('id');
	}

	function drop(event) {
		let itemId = +event.dataTransfer.getData('id');
		blank.style.backgroundColor = '';
		blank.style.opacity = 0;

		if (event.toElement.className === 'content') {
			const blankNum = size;
			const boxPos = findPos(itemId, matrix);
			const blankPos = findPos(blankNum, matrix);
			const valid = validForSwap(boxPos, blankPos);
			let won = false;
			event.target.style.backgroundColor = '';

			if (valid) {
				num = +move.innerHTML;
				num++;
				move.innerHTML = num <= 9 ? `0${num}` : `${num}`;
				won = readyForSwap(boxPos, blankPos, matrix, size, boxNodes);
				setPosBox(boxNodes, matrix);
				blank.style.opacity = 0;
			} else {
				blank.style.opacity = 0;
			}
			console.log('end drag');
		}

		event.target.style.backgroundColor = '';
	}

	function dragEnter(event) {
		let itemId = currentBoxId;
		let itemId2 = size;
		const boxPos = findPos(itemId, matrix);
		const blankPos = findPos(itemId2, matrix);
		const valid = validForSwap(boxPos, blankPos);

		if (event.toElement.className === 'content' && valid) {
			blank.style.backgroundColor = '';
			blank.style.opacity = 1;
			event.fromElement
				? event.fromElement.style.backgroundColor = ''
				: null;
			return;
		}

		// if (event.toElement.className === 'content' && !valid) {
		// 	event.fromElement
		// event.fromElement.style.backgroundColor = ''
		// 		: null;
		// 	blank.style.backgroundColor = 'red';
		// 	blank.style.opacity = 1;
		// 	return;
		// }

		//blank.style.backgroundColor = '';
		// event.fromElement
		// event.fromElement.style.backgroundColor = ''
		// 	: null;
		// event.toElement.style.backgroundColor = 'red';
	}
}
