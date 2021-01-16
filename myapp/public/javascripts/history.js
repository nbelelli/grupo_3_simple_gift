window.onload = function () {
	const back = document.querySelector('#back_button');
	back.addEventListener('click', () => {
		window.history.back();
	});
};
