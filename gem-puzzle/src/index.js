import './assets/styles/sass/style.scss';
import CreateElem from './assets/js/CreateElem';
import createFrame from './assets/js/createFrame';
import timer from './assets/js/timer';

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
<span id="time" >00:00:00</span>`);
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
const buttonsText = ['Shuffle and start', 'Stop', 'Continue', 'Save', 'Results'];
const buttons = [];
for (let i = 0; i < buttonsText.length; i++) {
	let button = blockButton.getElem('button', 'button', buttonsText[i]);
	buttons.push(button);
	divButton.append(button);
}
buttons[0].setAttribute('id', `shuffle`);

//Create start frame 4x4
createFrame(blockDiv, divCont);

//Create timer
timer(wrapper);

//Create frame sizes
const frameSizesText = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
for (let i = 0; i < frameSizesText.length; i++) {
	let frame = blockButton.getElem('button', 'button', frameSizesText[i]);
	frame.classList.add('frame__button');
	frame.setAttribute('data-id', `${(i + 3) ** 2}`);
	frameDiv.append(frame);
	frame.addEventListener('click', () => {
		let size = +frame.dataset.id;
		divCont.innerHTML = '';
		createFrame(blockDiv, divCont, size);
	});
}
