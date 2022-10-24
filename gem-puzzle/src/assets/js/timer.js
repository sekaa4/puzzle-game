export default function timer(div, won) {
	const time = document.getElementById('time');
	let milisec = 0;
	let timer;

	function startTimer() {
		time.innerHTML = '00:00';
		milisec = 0;
		clearInterval(timer);
		timer = setInterval(() => {
			milisec += 10;
			let dateTimer = new Date(milisec);
			time.innerHTML =
				('0' + dateTimer.getMinutes()).slice(-2) + ':'
				+ ('0' + dateTimer.getSeconds()).slice(-2);
		}, 10);
	}

	function stopTimer() {
		clearInterval(timer);
	}

	function continueTimer() {
		clearInterval(timer);
		timer = setInterval(() => {
			milisec += 10;
			let dateTimer = new Date(milisec);
			time.innerHTML =
				('0' + dateTimer.getMinutes()).slice(-2) + ':' +
				('0' + dateTimer.getSeconds()).slice(-2);
		}, 10);
	}

	let divFunc = (e) => {
		const clickButton = e.target.closest('.button');
		if (clickButton !== null) {
			if (clickButton.innerText === 'Shuffle and start') {
				milisec = 0;
				startTimer();
			}
			if (e.target.closest('.frame__button')) {
				clearInterval(timer);
				milisec = 0;
				time.innerHTML = '00:00';
			}
			if (clickButton.innerText === 'Stop') stopTimer();
		}
		if (e.target.closest('.save')) {
			clearInterval(timer);
		}

		if (e.target.closest('.box') !== e.target.closest('.box .blank')) {
			let checkWon = document.querySelector('.win');
			if (checkWon) {
				clearInterval(timer);
			} else {
				clearInterval(timer);
				continueTimer();
			}
		}
	};

	div.addEventListener('click', divFunc);
}
