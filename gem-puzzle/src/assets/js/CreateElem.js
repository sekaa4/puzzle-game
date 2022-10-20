export class CreateElem {
	constructor(elem) {
		this.name = elem;
	}

	getElem(elem) {
		return document.createElement(elem);
	}

}
