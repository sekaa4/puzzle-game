import './assets/styles/sass/style.scss';
import { CreateElem } from './assets/js/CreateElem';
import { getMatrix } from './assets/js/getMatrix';
import { setPosBox } from './assets/js/setPositionBox';
import { shuffleArray } from './assets/js/shuffleArray';
import { findPos } from './assets/js/changePos';
import { validForSwap } from './assets/js/changePos';
import { readyForSwap } from './assets/js/changePos';

let blockDiv = new CreateElem('div');
let div = blockDiv.getElem('div');
let wrapper = blockDiv.getElem('div');
let divCont = blockDiv.getElem('div');
let size = 16;

div.classList.add('puzzle');
document.body.append(div);

wrapper.classList.add('wrapper');
div.append(wrapper);

divCont.classList.add('content');

let h1 = document.createElement('h1');
h1.classList.add('title');
h1.innerHTML = 'Gem Puzzle';

let buttons = document.createElement('div');
buttons.classList.add('button');
buttons.innerHTML = `<button id="shuffle">Shuffle and start</button>
<button>Stop</button>
<button>Save</button>
<button>Results</button>`;

let time = document.createElement('div');
time.classList.add('time');
time.innerHTML = `<span>Moves</span>
<span>Time</span>`;

let frame = document.createElement('div');
frame.classList.add('size');
frame.innerHTML = `<div>Frame size:</div>
<div>Other sizes</div>`;

wrapper.append(h1);
wrapper.append(buttons);
wrapper.append(time);
wrapper.append(divCont);
wrapper.append(frame);

for (let i = 1; i <= size; i++) {
	if (i === size) {
		let elem = blockDiv.getElem('div');
		elem.classList.add('box', 'blank');
		elem.setAttribute('data-id', `${i}`);
		divCont.append(elem);
	} else {
		let elem = blockDiv.getElem('div');
		elem.classList.add('box');
		elem.innerHTML = i;
		elem.setAttribute('data-id', `${i}`);
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
	}

	if (won) {
		console.log('Happy!');
	}
});
