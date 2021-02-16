//validacion Login

window.addEventListener('load', function () {
	let formLogin = document.querySelector('form.formLogin');
	let email = document.querySelector('input.email');
	let password = document.querySelector('input.password');

	formLogin.addEventListener('submit', function (e) {
		let errores = [];
		let ulErrores = document.querySelector('div.errores ul');

		/*  Comprueba si existen errores */
		if (ulErrores.innerHTML != '') {
			ulErrores.innerHTML = '';
		}

		if (email.value == '') {
			errores.push('El email es obligatorio');
		}

		if (password.value == '') {
			errores.push('La contraseña es obligatorio');
		}
		if (errores.length > 0) {
			e.preventDefault();
		}

		for (let i = 0; i < errores.length; i++) {
			ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
		}
	});
});
