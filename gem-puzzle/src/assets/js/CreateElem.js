export default class CreateElem {
	constructor(elem) {
		this.name = elem;
	}

	getElem(tag, className = '', innerHTML = '') {
		let elem = document.createElement(tag);
		elem.classList.add(className);
		elem.innerHTML = innerHTML;
		return elem;
	}

	append(elem) {
		document.body.append(elem);
	}
}
