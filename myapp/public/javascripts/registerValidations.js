//Register Login

window.addEventListener("load", function () {
  console.log(window, "window capturada");
  //variables utilizadas
  let formRegister = document.querySelector("form.formRegister");

  let name = document.querySelector("input.name");
  //let lastname = document.querySelector("input.lastname");
  //let phone = document.querySelector("input.phone");
  //let password = document.querySelector("input.password");
  //let email = document.querySelector("input.email");
  //let retype = document.querySelector("input.retype");
  //let avatar = document.querySelector("input.avatar");
  
  function getFileExtn(filename) {
		return filename.split('.').pop();
  }
  
  
  formRegister.addEventListener("submit", function (e) {
    
    
     
    console.log(formRegister, "registro capturado");
    let errores = [];

    //Validaciones Nombre
    if (name.value == "") {
      errores.push("El nombre es obligatorio");
    }
    
   

    //Validaciones Extensiones
    

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
