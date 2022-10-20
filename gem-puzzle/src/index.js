import './assets/styles/sass/style.scss';

let div = document.createElement('div');
let wrapper = document.createElement('div');
let divCont = document.createElement('div');
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

wrapper.append(document.createElement('div'));

for (let i = 1; i <= size; i++) {
	if (i === size) {
		let elem = document.createElement('div');
		elem.classList.add('box', 'blank');
		elem.setAttribute('data-id', `${i}`);
		divCont.append(elem);
	} else {
		let elem = document.createElement('div');
		elem.classList.add('box');
		elem.innerHTML = i;
		elem.setAttribute('data-id', `${i}`);
		divCont.append(elem);
	}
}
