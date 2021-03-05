window.addEventListener("load", function () {
	console.log(window, 'window capturada');

  
  const form = document.querySelector(".createEditForm");
  console.log(form);
  const name = document.querySelector("#name");
  const price = document.querySelector("#price");
  const discount = document.querySelector("#discount");
  const image = document.querySelector("#image");
  const category = document.querySelector("#category");
  const description = document.querySelector("#description");
   
  function getFileExtn(filename) {
	return filename.split('.').pop();
}
  form.addEventListener("submit", function (e) {
    let errores = [];
    let ulErrores = document.querySelector("div.errores ul");

    /*  Comprueba si existen errores */
    if (ulErrores.innerHTML != "") {
      ulErrores.innerHTML = "";
    }
    if (name.value == "") {
		errores.push("El Nombre es obligatorio A");
    }

    if (price.value == "") {
		errores.push("El Precio es obligatorio A");
    }

    if (discount.value == "") {
		errores.push("Si no hay descuento, por favor ingrese 0 A");
    }
    if (discount.value > 99) {
		errores.push("El maximo descuento es de 99% A");
    }
    console.log(image.files, "avatar atrapado");
    console.log(image.files[0]);
    if (image.value == '') {
		errores.push("El producto debe tener al menos 1 imagen A");
    }
    for (image of image.files) {
		let extn = getFileExtn(image.name);
		if (!(extn == 'jpg' || extn == 'png' || extn == 'jpeg')) {
			errores.push('Los formatos correctos son JPG, PGN y JPEG A');
		}
	}


	
    if (description.value == "") {
		errores.push("La descripción del producto no puede estar vacia A");
    }


    if (errores.length > 0) {
      e.preventDefault();
    }
	console.log(errores, "contador de errores");
    for (let i = 0; i < errores.length; i++) {
		ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
    }

  });
});
