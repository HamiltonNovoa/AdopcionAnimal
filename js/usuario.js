let usuario = JSON.parse(localStorage.getItem('login') || "{}");

if (usuario.body) {
    document.getElementById('menu-registro')?.remove();

    let domNombre = document.getElementById('usuario-nombre');
    if (domNombre && usuario.body.nombre) {
        domNombre.innerHTML = " " + usuario.body.nombre + " "
    }
}