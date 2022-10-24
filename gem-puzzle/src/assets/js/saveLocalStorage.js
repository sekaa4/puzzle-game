let inx = 1;
export default function saveLocalStorage(size) {
	let moves = document.getElementById('moves').innerHTML;
	let time = document.getElementById('time').innerHTML;
	let date = new Date();
	let sizeNxN = `${Math.sqrt(size) + 'x' + Math.sqrt(size)}`;
	let check = checkResult(moves, sizeNxN);

	if (check) {
		if (localStorage.length > 100) {
			let arrKeys = Object.keys(localStorage);
			for (let i = 0; i < arrKeys.length; i++) {
				let key = arrKeys[i];
				let value = JSON.parse(localStorage[key]);
				value.oldResult ? localStorage.removeItem(key) : false;
			}
		}

		const data = {
			name: user(),
			size: sizeNxN,
			date: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
			times: time,
			move: moves,
		};
		localStorage.setItem(data.name, JSON.stringify(data));
	}
}

function checkResult(moves, size) {
	let result = true;
	let checkSize = false;
	if (!moves) {
		return;
	}

	let arrKeys = Object.keys(localStorage);
	if (arrKeys.length === 0) {
		return true;
	}

	for (let i = 0; i < arrKeys.length; i++) {
		let key = arrKeys[i];

		let oldValue = JSON.parse(localStorage[key]);
		checkSize = size === oldValue.size;
		if (moves <= oldValue.move && size === oldValue.size) {
			oldValue.oldResult = true;
			localStorage.setItem(oldValue.name, JSON.stringify(oldValue));
			result = true;
		}
		if (moves <= oldValue.move && size !== oldValue.size) {
			result = false;
		}
	}

	return checkSize ? result : true;
}

function user() {
	let user = prompt('Write your name to save your result in top-10 table', `user${inx}`);
	inx++;
	user = user.trim();
	if (!user) {
		inx++;
		user = `user${inx}`;
	} else if (user === 'user') {
		inx++;
		user = `user${inx}`;
	}

	return user;
}
