traerMascotas()
    .then(function (data) {
        return data.json()
    })
    .then(function (data) {
        if (data.error) {
            // Mostrar al usuario que hay un error en la petición con el servidor.
        } else {
            // Mostrar al usuario las mascotas en la página principal.
            // Hacer uso del DOM.

            let mascotasDOM = document.getElementById('galeria-mascotas');

            data.body.data.forEach(function (mascota) {
                mascotasDOM.appendChild(crearMascotaDOM(mascota));
            });
        }
    })
    .catch(function (error) {
        // Mostrar al usuario que hay un error en la petición con el servidor.
    });

function crearMascotaDOM(mascota) {
    let anchor = document.createElement('a');
    anchor.setAttribute('href', '../perfil/perfil.html?id=' + mascota._id);
    anchor.classList.add('imagen-contenedor');

    let divPadre = document.createElement('div');
    divPadre.classList.add('imagen-port');

    let imagenMascota = document.createElement('img');
    imagenMascota.setAttribute('src', mascota.imagen);

    let divHijo = document.createElement('div');
    divHijo.classList.add('hover-galeria');

    let imagenIcono = document.createElement('img');
    imagenIcono.setAttribute('src', '../img/icono1.png');

    let nombreMascota = document.createElement('p');
    nombreMascota.innerHTML = mascota.nombre;

    divHijo.appendChild(imagenIcono);
    divHijo.appendChild(nombreMascota);

    divPadre.appendChild(imagenMascota);
    divPadre.appendChild(divHijo);

    anchor.appendChild(divPadre);

    return anchor;
}