const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin"); 

function ValidarLogin() {
    const correoIngresado = document.getElementById("email").value.trim();
    const contraseñaIngresada = document.getElementById("contraseña").value;

    if (correoIngresado === "" || contraseñaIngresada === "") {
        mensajeLogin.innerHTML = "<p style='color: red;'>Por favor ingresa correo y contraseña.</p>";
        return;
    }

    const usuarioGuardadoTexto = localStorage.getItem("usuarioRegistrado");

    if (!usuarioGuardadoTexto) {
        mensajeLogin.innerHTML = "<p style='color: red;'>No existe ningún usuario registrado. Por favor regístrate primero.</p>";
        return;
    }

    const usuarioGuardado = JSON.parse(usuarioGuardadoTexto);

    if (correoIngresado === usuarioGuardado.correo && contraseñaIngresada === usuarioGuardado.contraseña) {
        mensajeLogin.innerHTML = `<p style='color: green;'><strong>¡Bienvenido/a ${usuarioGuardado.nombre}! Has iniciado sesión correctamente.</strong></p>`;
    } else {
        mensajeLogin.innerHTML = "<p style='color: red;'>El correo electrónico o la contraseña son incorrectos.</p>";
    }
}

formLogin.addEventListener("submit", function(evento) {
    evento.preventDefault();
    ValidarLogin();
});