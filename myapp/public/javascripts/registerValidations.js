//Register Login

window.addEventListener("load", function () {
  console.log(window, "window capturada");
  //variables utilizadas
  let formRegister = document.querySelector("form.formRegister");

  let name = document.querySelector("input.name");
  let lastname = document.querySelector("input.lastname");
  let phone = document.querySelector("input.phone");
  let password = document.querySelector("input.password");
  //let email = document.querySelector("input.email");
  //let retype = document.querySelector("input.retype");
  //let avatar = document.querySelector("input.avatar");
  //let extPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;

  formRegister.addEventListener("submit", function (e) {
    console.log(formRegister, "registro capturado");
    let errores = []; 
    
    //Validaciones Nombre
    if (name.value == "") {
      errores.push("El nombre es obligatorio");
    }
    if (name.value < 2) {
      errores.push("El nombre debe tener al menos 2 caracteres");
    }
    
    //Validaciones Apellido
    if (lastname.value == "") {
      errores.push("El apellido es obligatorio");
    }
    if (lastname.value < 2) {
      errores.push("El apellido debe tener al menos 2 caracteres");
    } 
    
    //Validaciones Phone
    if (phone.value == "") {
      errores.push("El telefono es obligatorio");
    } 
    
    //Validaciones Password
    if (password.value == "") {
      errores.push("La contraseña es obligatoria");
    }
    if (password.value < 7) {
      errores.push("La contraseña debe tener al menos 8 caracteres");
    }

    //Validaciones Email
       /* if (email.value == "") {
            errores.push("El email es obligatorio");
          }
    //Validaciones Extensiones
    
    if (!avatar.value=extPermitidas) {
      errores.push("Los archivos validos son JPG, JPEG, PNG o GIF");
    }    */

    if (errores.length > 0) {
      e.preventDefault();
    }
    console.log(errores, "contador de errores");
    let ulErrores = document.querySelector("div.errores ul");
    for (let i = 0; i < errores.length; i++) {
      ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
    }
  });
});
