window.onload = function () {
	let deleteButtons = document.querySelectorAll('.deleteButton');
	/* console.log('el boton', deleteButtons); */

	deleteButtons.forEach((button) => {
		button.addEventListener('click', function () {
			let userNameDiv = document.querySelector('#modalUserName');
			let form = document.querySelector('#deleteForm');
			form.setAttribute(
				'action',
				'/admin/users/' + button.id + '/delete/?_method=DELETE'
			);
			userNameDiv.innerHTML =
				button.getAttribute('userName') +
				' ' +
				button.getAttribute('userLastName');
		});
	});
};
