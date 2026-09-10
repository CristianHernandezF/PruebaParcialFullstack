const formRegistro = document.getElementById("formRegistro");
const mensajeError = document.getElementById("mensajeError");
const contenedorDirecciones = document.getElementById("contenedorDirecciones");
const btnAgregarDireccion = document.getElementById("btnAgregarDireccion");
const templateDireccion = document.getElementById("templateDireccion");


function agregarDireccion() {
    if (!templateDireccion || !contenedorDirecciones) return;

    const clone = templateDireccion.content.cloneNode(true);
    const itemDireccion = clone.querySelector(".direccion-item");
    const btnEliminar = clone.querySelector(".btn-eliminar-direccion");

    // Evento para eliminar la dirección correspondiente
    btnEliminar.addEventListener("click", () => {
      const tarjetasActuales = contenedorDirecciones.querySelectorAll(".direccion-item");
      if (tarjetasActuales.length > 1) {
        itemDireccion.remove();
      } else {
        alert("Debes mantener al menos una dirección de envío.");
      }
    });

    contenedorDirecciones.appendChild(clone);
  }

  if (contenedorDirecciones && contenedorDirecciones.children.length === 0) {
    agregarDireccion();
  }

  // Evento al pulsar el botón "+ AGREGAR DIRECCIÓN"
  if (btnAgregarDireccion) {
    btnAgregarDireccion.addEventListener("click", agregarDireccion);
  }

function ValidacionesRegistro() {

    let errores = [];

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("email").value.trim();
    const correoRepetir = document.getElementById("emailRepetir").value.trim();
    const contraseña = document.getElementById("contraseña").value;
    const contraseñaRepetir = document.getElementById("contraseñaRepetir").value;
    const estilos = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validacion nombre
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if(nombre == ""){
        errores.push("El nombre no puede estar vacio, ES OBLIGATORIO ");
    } else if (nombre.length > 100) { 
        errores.push("El nombre es muy largo, El maximo es de 100 caracteres");
    } else if (!soloLetras.test(nombre)){
        errores.push("El nombre solo debe contener letras");
    }

    
    // Validar correo
    const esDuoc = /^[^\s@]+@duoc\.cl$/i;
    if(correo == ""){
        errores.push("El correo no puede estar vacio, ES OBLIGATORIO ");
    } else if (!esDuoc.test(correo)){ 
        errores.push("El correo debe terminar obligatoriamente en @duoc.cl.");
    } else if (correo.length > 60) { 
        errores.push("El correo no puede tener más de 60 caracteres.");
    } 
    if (correo !== correoRepetir) {
        errores.push("Los correos electrónicos no coinciden.");
    }

    // Validar contraseña
    if (contraseña == "") {
        errores.push("La contraseña no puede estar vacía, ES OBLIGATORIA.");
    } else if (contraseña.length < 10) {
        errores.push("La contraseña debe tener mínimo 10 caracteres.");
    } else if ((contraseña.match(/[A-Z]/g) || []).length < 1) {
        errores.push("La contraseña debe tener al menos 1 letras mayúsculas.");
    } else if (!/[0-9]/.test(contraseña)) {
        errores.push("La contraseña debe tener al menos un número.");
    } else if (!/[$%&*/]/.test(contraseña)) {
        errores.push("La contraseña debe tener al menos un carácter especial.");
    }   
    
    if (contraseña !== contraseñaRepetir) {
        errores.push("Las contraseñas no coinciden.");
    }

  
    if (estilos.length === 0) {
        errores.push("selecciona al menos un género favorito");
    }

    const tarjetasDireccion = contenedorDirecciones.querySelectorAll(".direccion-item");
    let listaDirecciones = [];

    if (tarjetasDireccion.length === 0) {
      errores.push("Debes ingresar al menos una dirección de envío.");
    } else {
      tarjetasDireccion.forEach((item, index) => {
        const inputAlias = item.querySelector('input[name="alias[]"]');
        const inputDireccion = item.querySelector('input[name="direccion[]"]');
        const selectComuna = item.querySelector('select[name="comuna[]"]');

        const aliasVal = inputAlias.value.trim();
        const direccionVal = inputDireccion.value.trim();
        const comunaVal = selectComuna.value;

        // Validaciones por cada dirección
        if (aliasVal.length > 20) {
          errores.push(`Dirección #${index + 1}: El alias no puede superar los 20 caracteres.`);
        }

        if (direccionVal === "") {
          errores.push(`Dirección #${index + 1}: El campo dirección es obligatorio.`);
        } else if (direccionVal.length < 10) {
          errores.push(`Dirección #${index + 1}: Debe tener al menos 10 caracteres.`);
        }

        if (comunaVal === "") {
          errores.push(`Dirección #${index + 1}: Debes seleccionar una comuna.`);
        }

        // Si la dirección individual es válida, la guardamos en un arreglo temporal
        if (direccionVal.length >= 10 && comunaVal !== "" && aliasVal.length <= 20) {
          listaDirecciones.push({
            alias: aliasVal || "Sin alias",
            direccion: direccionVal,
            comuna: comunaVal
          });
        }
      });
    }

    if (errores.length > 0) {
        let mensajeHTML = "<ul style='color: red;'>";
        for (let i = 0; i < errores.length; i++) {
            mensajeHTML += "<li>" + errores[i] + "</li>";
        }
        mensajeHTML += "</ul>";
        mensajeError.innerHTML = mensajeHTML;
    } else {
        let estilosSeleccionados = [];
        estilos.forEach(function(checkbox) {
            estilosSeleccionados.push(checkbox.value);
        });

        const nuevoUsuario = {
            nombre: nombre,
            correo: correo,
            contraseña: contraseña,
            estilos: estilosSeleccionados,
            direcciones: listaDirecciones
        };

        localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

        mensajeError.innerHTML = "<p style='color: green;'><strong>¡Registro exitoso! Redirigiendo al Login...</strong></p>";
        formRegistro.reset();

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1500);
    }
}

formRegistro.addEventListener("submit", function(evento){
    evento.preventDefault();
    ValidacionesRegistro();
});