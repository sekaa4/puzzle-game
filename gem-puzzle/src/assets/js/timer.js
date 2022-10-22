timer.id = null;

export default function timer(div, won) {
	const time = document.getElementById('time');
	let milisec = 0;

	function startTimer() {
		time.innerHTML = '00:00:00';
		milisec = 0;
		clearInterval(timer.id);
		timer.id = setInterval(() => {
			milisec += 10;
			let dateTimer = new Date(milisec);
			time.innerHTML =
				('0' + dateTimer.getMinutes()).slice(-2) + ':'
				+ ('0' + dateTimer.getSeconds()).slice(-2) + ':'
				+ ('0' + dateTimer.getMilliseconds()).slice(-3, -1);
		}, 10);
	}

	function stopTimer() {
		clearInterval(timer.id);
	}

	function continueTimer() {
		clearInterval(timer.id);
		timer.id = setInterval(() => {
			milisec += 10;
			let dateTimer = new Date(milisec);
			time.innerHTML =
				('0' + dateTimer.getMinutes()).slice(-2) + ':' +
				('0' + dateTimer.getSeconds()).slice(-2) + ':' +
				('0' + dateTimer.getMilliseconds()).slice(-3, -1);
		}, 10);
	}

	let divFunc = (e) => {
		const clickButton = e.target.closest('.button');
		if (clickButton !== null) {
			if (clickButton.innerText === 'Shuffle and start') {
				startTimer();
			}
			if (e.target.closest('.frame__button')) {
				clearInterval(timer.id);
				time.innerHTML = '00:00:00';
			}
			if (clickButton.innerText === 'Stop') stopTimer();
		}
		if (e.target.closest('.box') !== e.target.closest('.box .blank')) {
			let checkWon = document.querySelector('.win');
			if (checkWon) {
				clearInterval(timer.id);
			} else {
				clearInterval(timer.id);
				continueTimer();
			}
		}
	};

	div.addEventListener('click', divFunc);
}
