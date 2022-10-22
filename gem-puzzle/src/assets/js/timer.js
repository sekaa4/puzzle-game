export default function timer(div) {
	const time = document.getElementById('time');
	let milisec = 0;
	let timer = null;

	function startTimer() {
		time.innerHTML = '00:00:00';
		milisec = 0;
		clearInterval(timer);
		timer = setInterval(() => {
			milisec += 10;
			let dateTimer = new Date(milisec);
			time.innerHTML =
				('0' + dateTimer.getMinutes()).slice(-2) + ':'
				+ ('0' + dateTimer.getSeconds()).slice(-2) + ':'
				+ ('0' + dateTimer.getMilliseconds()).slice(-3, -1);
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
				('0' + dateTimer.getSeconds()).slice(-2) + ':' +
				('0' + dateTimer.getMilliseconds()).slice(-3, -1);
		}, 10);
	}

	div.addEventListener('click', (e) => {
		const clickButton = e.target.closest('.button');
		if (clickButton.innerText === 'Shuffle and start') {
			startTimer();
		}
		if (e.target.closest('.frame__button')) {
			clearInterval(timer);
			time.innerHTML = '00:00:00';
		}
		if (clickButton.innerText === 'Stop') stopTimer();
		if (clickButton.innerText === 'Continue') continueTimer();
	});
}
