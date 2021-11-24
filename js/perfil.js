const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

traerMascota(id)
    .then(function (data) {
        return data.json()
    })
    .then(function (data) {
        if (data.error) {
            // Mostrar al usuario que hay un error en la petición con el servidor.
        } else {
            if (data.body.data) {
                // Mostrar información de la mascota al usuario
                const mascota = data.body.data;
                document.getElementById('perfil-mascota--nombre').innerHTML = mascota.nombre;

                let mascotaImagen = document.getElementById('perfil-mascota--imagen');
                mascotaImagen.setAttribute('src', mascota.imagen);
            } else {
                // Mostrar al usuario que no se encontro la mascota con ese id.
            }
        }
    })
    .catch(function (error) {
        // Mostrar al usuario que hay un error en la petición con el servidor.
        window.history.back();
    });