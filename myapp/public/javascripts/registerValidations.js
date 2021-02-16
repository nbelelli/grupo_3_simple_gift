//Register Login

window.addEventListener('load', function () {
	console.log(window, 'window capturada');

	//variables utilizadas
	let formRegister = document.querySelector('form.formRegister');
	let name = document.querySelector('input.name');
	let lastname = document.querySelector('input.lastname');
	let phone = document.querySelector('input.phone');
	let password = document.querySelector('input.password');
	let email = document.querySelector('input.email');
	let retype = document.querySelector('input.retype');
	let avatar = document.querySelector('input.avatar');

	function getFileExtn(filename) {
		return filename.split('.').pop();
	}

	formRegister.addEventListener('submit', function (e) {
		console.log(formRegister, 'registro capturado');

		let errores = [];

		let ulErrores = document.querySelector('div.errores ul');
		/*  Comprueba si existen errores */
		if (ulErrores.innerHTML != '') {
			ulErrores.innerHTML = '';
		}

		//Validaciones Nombre

		if (name.value == '') {
			errores.push('El nombre es obligatorio');
		}
		if (name.value < 2) {
			errores.push('El nombre debe tener al menos 2 caracteres');
		}

		//Validaciones Apellido

		if (lastname.value == '') {
			errores.push('El apellido es obligatorio');
		}
		if (lastname.value < 2) {
			errores.push('El apellido debe tener al menos 2 caracteres');
		}

		//Validaciones Phone
		if (phone.value == '') {
			errores.push('El telefono es obligatorio');
		}

		//Validaciones Password
		let PasswordOK = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

		if (password.value == '') {
			errores.push('La contraseña es obligatoria');
		}
		if (password.value < 7) {
			errores.push('La contraseña debe tener al menos 8 caracteres');
		}
		if (!PasswordOK.test(password.value)) {
			errores.push(
				'La contraseña debe tener 1 mayuscula, 1 minuscula, 1 caracter especial y entre 8 a 15 caracteres'
			);
		}

		if (retype.value == '') {
			errores.push('El retype es obligatorio');
		}
		if (password.value != retype.value) {
			errores.push('La contraseña deben coincidir');
		}
		//Validaciones Email
		let mailOK = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (email.value == '') {
			errores.push('El email es obligatorio');
		} else if (!mailOK.test(email.value)) {
			errores.push('Ingrese un email valido');
		}
		//Validaciones Extensiones
		console.log(avatar.files, 'avatar atrapado');
		console.log(avatar.files[0]);
		if (avatar.value == '') {
			errores.push('El avatar es obligatorio');
		}
		for (avatar of avatar.files) {
			let extn = getFileExtn(avatar.name);
			if (!(extn == 'jpg' || extn == 'png' || extn == 'jpeg')) {
				errores.push('Los formatos correctos son JPG, PGN y JPEG');
			}
		}

		if (errores.length > 0) {
			e.preventDefault();
		}
		console.log(errores, 'contador de errores');
		console.log(ulErrores, 'div Errores');
		for (let i = 0; i < errores.length; i++) {
			ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
		}
	});
});
