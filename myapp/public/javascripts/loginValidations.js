//validacion Login 

window.addEventListener("load", function(){
  let formLogin= document.querySelector("form.formLogin");
  
  let email = document.querySelector("input.email");
  let password = document.querySelector("input.password");

  formLogin.addEventListener("submit", function(e){
    
    let errores =[];
    
    if (email.value == ""){
      errores.push("El email es obligatorio");
    }

    if (password.value == ""){
      errores.push("La contraseña es obligatorio");
    }
    if(errores.length > 0){
      e.preventDefault();
     }
    
    let ulErrores = document.querySelector("div.errores ul");
    for(let i=0; i<errores.length; i++){
      ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
    }
  });
})
