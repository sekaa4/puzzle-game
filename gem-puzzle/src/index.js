import './assets/styles/sass/style.scss';
import CreateElem from './assets/js/CreateElem';
import createFrame from './assets/js/createFrame';
import timer from './assets/js/timer';
import getResult from './assets/js/getResult';
import getSave from './assets/js/getSave';
//import dragg from './assets/js/dragg';

let blockDiv = new CreateElem('div');
let blockButton = new CreateElem('button');
let font = new CreateElem('h1');

let div = blockDiv.getElem('div', 'puzzle');
let wrapper = blockDiv.getElem('div', 'wrapper');
let divCont = blockDiv.getElem('div', 'content');
let divButton = blockDiv.getElem('div', 'puzzle__button');
let h1 = font.getElem('h1', 'title', 'Gem Puzzle');
let mtDiv = blockDiv.getElem('div', 'move-time');
let moveDiv = blockDiv.getElem('div', 'move', `<span class='text'>Moves:</span>
<span id="moves" >00</span>`);
let timeDiv = blockDiv.getElem('div', 'time', `<span class='text'>Time:</span>
<span id="time" >00:00</span>`);
let frameDiv = blockDiv.getElem('div', 'frame', `<span class='frame__text'>Frame sizes:</span>`);

document.body.append(div);
div.append(wrapper);
wrapper.append(h1);
wrapper.append(divButton);
wrapper.append(mtDiv);
mtDiv.append(moveDiv);
mtDiv.append(timeDiv);
wrapper.append(divCont);
wrapper.append(frameDiv);

//Create buttons
const buttonsText = ['Shuffle and start', 'Stop', 'Sound', 'Results', 'Save', 'Load'];
const buttons = [];
for (let i = 0; i < buttonsText.length; i++) {
	let button = blockButton.getElem('button', 'button', buttonsText[i]);
	buttons.push(button);
	divButton.append(button);
}
buttons[0].setAttribute('id', `shuffle`);
buttons[2].setAttribute('id', `sound`);
buttons[4].classList.add('save');

const audio = new Audio('click.ogg');

//Implement soundOn/off
buttons[2].addEventListener('click', () => {
	buttons[2].classList.toggle('sound-off');
	if (buttons[2].classList.contains('sound-off')) {
		removeSound();
	} else {
		audio.play();
		onSound();
	}
});

//Implement button Result
div.addEventListener('click', (e) => {
	let result = e.target.closest('.result');
	result ? result.remove() : false;
});

buttons[3].addEventListener('click', function () {
	getResult();
});

//Implement button Save
buttons[4].addEventListener('click', function () {
	getSave();
});

//Create start frame 4x4
createFrame(blockDiv, divCont);

//Create timer
timer(wrapper);

//Create frame sizes
const frameSizesText = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
let prevButtonFrame = null;
for (let i = 0; i < frameSizesText.length; i++) {
	let frame = blockButton.getElem('button', 'button', frameSizesText[i]);
	frame.classList.add('frame__button');
	//frame.disabled = i === 1 ? true : false;
	frame.setAttribute('data-id', `${(i + 3) ** 2}`);
	frameDiv.append(frame);
	frame.addEventListener('click', function () {
		const div = document.querySelector('.win');
		div ? div.remove() : null;
		let size = +frame.dataset.id;
		divCont.innerHTML = '';
		createFrame(blockDiv, divCont, size);
		if (buttons[2].classList.contains('sound-off')) {
			removeSound();
		} else {
			audio.play();
			onSound();
		}
		divCont.classList.remove('won');
		if (prevButtonFrame) {
			prevButtonFrame.disabled = false;
		}
		prevButtonFrame = this;
		this.disabled = true;
	});
}

let playSound = () => {
	audio.play();
}

function removeSound() {
	const buttons = document.querySelectorAll('.button');
	buttons.forEach(el => {
		el.removeEventListener('click', playSound);
	});
	const boxes = document.querySelectorAll('.box');
	boxes.forEach(el => {
		el.removeEventListener('click', playSound);
	});
}

function onSound() {
	const buttons = document.querySelectorAll('.button');
	buttons.forEach(el => {
		el.addEventListener('click', playSound);
	});
	const boxes = document.querySelectorAll('.box');
	boxes.forEach(el => {
		el.addEventListener('click', playSound);
	});
}

onSound();

// window.onload = function () {
// 	const content = document.querySelector('.content');
// 	const frame = document.querySelector('.frame');
// 	content.outerHTML = localStorage.getItem('save', localStorage.save);
// }
