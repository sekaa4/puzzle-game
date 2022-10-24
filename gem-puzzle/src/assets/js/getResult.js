import CreateElem from "./CreateElem";

export default function getResult() {
	let getPage = document.querySelector('.result');
	let count = 0;
	getPage ? getPage.remove() : false;

	let wrapper = document.querySelector('.wrapper');
	let blockDiv = new CreateElem('div');
	let div = blockDiv.getElem('div', 'result');
	let arrKeys = Object.keys(localStorage);
	let divPage = blockDiv.getElem('div', 'result__page');
	let divStr = blockDiv.getElem('div', 'result__string');
	divStr.innerHTML = 'name';
	let divStr2 = divStr.cloneNode();
	divStr2.innerHTML = 'date';
	let divStr3 = divStr.cloneNode();
	divStr3.innerHTML = 'size';
	let divStr4 = divStr.cloneNode();
	divStr4.innerHTML = 'moves';
	let divStr5 = divStr.cloneNode();
	divStr5.innerHTML = 'time';
	divPage.append(divStr, divStr2, divStr3, divStr4, divStr5);
	div.append(divPage);

	arrKeys.sort((a, b) => {
		return localStorage[a].move > localStorage[b].move ? -1 : 1;
	});

	for (let i = 0; i < arrKeys.length; i++) {
		if (count >= 10) {
			break;
		}
		let key = arrKeys[i];
		if (key === 'saveGameToLocalStorage' || !key) {
			continue;
		}
		let obj = JSON.parse(localStorage[key]);
		let divPage = blockDiv.getElem('div', 'result__page');

		let divStr = blockDiv.getElem('div', 'result__string');
		divStr.innerHTML = obj.name;
		let divStr2 = divStr.cloneNode();
		divStr2.innerHTML = obj.date;
		let divStr3 = divStr.cloneNode();
		divStr3.innerHTML = obj.size;
		let divStr4 = divStr.cloneNode();
		divStr4.innerHTML = obj.move;
		let divStr5 = divStr.cloneNode();
		divStr5.innerHTML = obj.times;

		divPage.append(divStr, divStr2, divStr3, divStr4, divStr5);
		div.append(divPage);
		count++;
	}

	wrapper.append(div);
}
