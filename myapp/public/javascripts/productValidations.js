window.addEventListener('load', function () {
	const form = document.querySelector('.createEditForm');
	console.log(form);
	const name = document.querySelector('#name');
	const price = document.querySelector('#price');
	const discount = document.querySelector('#discount');
	const image = document.querySelector('#image');
	const category = document.querySelector('#category');
	const description = document.querySelector('#description');

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		let errors = [];
		if (name.value == '') {
			errors.push('El Nombre es obligatorio');
		}

		if (price.value == '') {
			errors.push('El Precio es obligatorio');
		}

		if (discount.value == '') {
			errors.push('Si no hay descuento, por favor ingrese 0');
		}

		if (discount.value > 99) {
			errors.push('El maximo descuento es de 99%');
		}

		if (image.value == '') {
			errors.push('El producto debe tener al menos 1 imagen');
		}

		if (description.value == '') {
			errors.push('La descripción del producto no puede estar vacia');
		}

		if (errors.length > 0) {
			e.preventDefault();
			let ulErrores = document.querySelector('div.errores ul');
			for (error of errors) {
				ulErrores.innerHTML += '<li>' + error + '</li>';
			}
		}
	});
});
