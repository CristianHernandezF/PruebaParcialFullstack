const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

function ValidarLogin() {
    const correoIngresado = document.getElementById("email").value.trim();
    const contraseñaIngresada = document.getElementById("contraseña").value;

    if (correoIngresado === "" || contraseñaIngresada === "") {
        mensajeLogin.innerHTML = "<p class='text-danger'>Por favor ingresa correo y contraseña.</p>";
        return;
    }

    const esDuoc = /^[^\s@]+@duoc\.cl$/i;
    if (!esDuoc.test(correoIngresado)) {
        mensajeLogin.innerHTML = "<p class='text-danger'>El correo debe ser institucional (@duoc.cl).</p>";
        return;
    }
    const usuarios = JSON.parse(localStorage.getItem("usuariosGuardados")) || [];

    if (usuarios.length === 0) {
        mensajeLogin.innerHTML = "<p class='text-danger'>No existe ningún usuario registrado. Regístrate primero.</p>";
        return;
    }

    const usuario = usuarios.find(u => u.correo.toLowerCase() === correoIngresado.toLowerCase());
    if (!usuario) {
        mensajeLogin.innerHTML = "<p class='text-danger'>El correo ingresado no está registrado.</p>";
        return;
    }

    if (usuario.contraseña !== contraseñaIngresada) {
        mensajeLogin.innerHTML = "<p class='text-danger'>La contraseña es incorrecta.</p>";
        return;
    }

    mensajeLogin.innerHTML = `<p class='text-success'><strong>¡Bienvenido/a ${usuario.nombre}! Has iniciado sesión correctamente.</strong></p>`;
}

formLogin.addEventListener("submit", function(e) {
    e.preventDefault();
    ValidarLogin();
});