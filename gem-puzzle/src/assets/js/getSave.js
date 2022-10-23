export default function getSave() {
	let content = document.querySelector('.content').outerHTML;
	localStorage.setItem('save', content);
}
