import './assets/styles/sass/style.scss';
import CreateElem from './assets/js/CreateElem';
import createFrame from './assets/js/createFrame';
import { getMatrix } from './assets/js/getMatrix';
import { setPosBox } from './assets/js/setPositionBox';
import { shuffleArray } from './assets/js/shuffleArray';
import { findPos } from './assets/js/changePos';
import { validForSwap } from './assets/js/changePos';
import { readyForSwap } from './assets/js/changePos';

let blockDiv = new CreateElem('div');
let blockButton = new CreateElem('button');
let font = new CreateElem('h1');

let div = blockDiv.getElem('div', 'puzzle');
let wrapper = blockDiv.getElem('div', 'wrapper');
let divCont = blockDiv.getElem('div', 'content');
let divButton = blockDiv.getElem('div', 'puzzle__button');
let h1 = font.getElem('h1', 'title', 'Gem Puzzle');
let timeDiv = blockDiv.getElem('div', 'time', `<span id="moves">Moves: 0</span>
<span id="time" >Time: 0</span>`);
let frameDiv = blockDiv.getElem('div', 'frame', `<div>Frame sizes:</div>`);

let size = 16;
let move = 0;

document.body.append(div);
div.append(wrapper);
wrapper.append(h1);
wrapper.append(divButton);
wrapper.append(timeDiv);
wrapper.append(divCont);
wrapper.append(frameDiv);

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
setPosBox(boxNodes, matrix);

//Create buttons
const buttonsText = ['Shuffle and start', 'Stop', 'Save', 'Results'];
const buttons = [];
for (let i = 0; i < buttonsText.length; i++) {
	let button = blockButton.getElem('button', 'button', buttonsText[i]);
	buttons.push(button);
	divButton.append(button);
}
buttons[0].setAttribute('id', `shuffle`);

//Create frame sizes
const frameSizesText = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
const frames = [];
for (let i = 0; i < frameSizesText.length; i++) {
	let frame = blockButton.getElem('button', 'button', frameSizesText[i]);
	frame.classList.add('frame__button');
	frame.setAttribute('data-id', `${(i + 3) ** 2}`);
	frameDiv.append(frame);
	frame.addEventListener('click', () => {
		let size = +frame.dataset.id;
		divCont.innerHTML = '';

		//Create Boxes in content
		let boxes = [];
		for (let i = 1; i <= size; i++) {
			if (i === size) {
				let elem = blockDiv.getElem('div', 'box');
				elem.classList.add('blank');
				elem.setAttribute('data-id', `${i}`);
				boxes.push(elem);
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
				boxes.push(elem);
				divCont.append(elem);
			}
		}

		//Position
		let boxNodes = Array.from(document.querySelectorAll('.box'));
		let matrix = getMatrix(boxNodes.map(el => +el.dataset.id), size);
		setPosBox(boxNodes, matrix);

		//Shuffle
		document.getElementById('shuffle').addEventListener('click', () => {
			const shuffledArray = shuffleArray(matrix.flat());
			matrix = getMatrix(shuffledArray, size);
			setPosBox(boxNodes, matrix);
		});

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
				let num = document.getElementById('moves');
				num.innerHTML = `Moves: ${++move}`;
			}

			if (won) {
				console.log('Happy!');
			}
		});
		frames.push(frame);
	});
}

//Shuffle
document.getElementById('shuffle').addEventListener('click', () => {
	const shuffledArray = shuffleArray(matrix.flat());
	matrix = getMatrix(shuffledArray, size);
	setPosBox(boxNodes, matrix);
	let num = document.getElementById('moves');
	move = 0;
	num.innerHTML = `Moves: ${move}`;
});

//Change position
const blankNum = size;
let won = false;
divCont.addEventListener('click', (e) => {
	const clickBox = e.target.closest('.box');
	if (!clickBox) {
		return;
	}

	const boxNum = +clickBox.dataset.id;
	const boxPos = findPos(boxNum, matrix);
	const blankPos = findPos(blankNum, matrix);
	const valid = validForSwap(boxPos, blankPos);

	if (valid) {
		won = readyForSwap(boxPos, blankPos, matrix, size);
		setPosBox(boxNodes, matrix);
		let num = document.getElementById('moves');
		num.innerHTML = `Moves: ${++move}`;
	}

	if (won) {
		console.log('Happy!');
	}
});
