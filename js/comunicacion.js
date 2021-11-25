/*
 * Hay 4 ejemplos del flujo CRUD sobre una DB.
 *
 * 1. Traer todas las mascotas almacenadas en DB.
 * 2. Traer una mascota en especifico.
 * 3. Guardar una mascota en la DB.
 * 4. Eliminar una mascota de la DB.
 * 
 * ------
 * 
 * El id que se pasa a las funciones 'traerMascota' y 'eliminarMascota' deben ser guardadas en el DOM para recuperarlas.
 * Para esto puede usar 'data-attribute' https://developer.mozilla.org/es/docs/Learn/HTML/Howto/Use_data_attributes
 * 
 */

// Esta url es la del servidor, cuando vaya hacer el despligue a un servidor publico debe cambiar la URL.
const URL = 'https://servidorpet.herokuapp.com/api'

// Devuelve el listado de mascotas que hay en la DB.
function traerMascotas() {
    return fetch(`${URL}/mascotas`, {
        method: 'GET'
    });
}

// Envia el id de la mascota para eliminarla en la DB.
function traerMascota(id) {
    return fetch(`${URL}/mascota/${id}`, {
        method: 'GET',
    });
}

// Envia la información de la Mascota para guardarla en la DB.
function guardarMascota(mascota) {
    fetch(`${URL}/mascota`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mascota)
    })
        .then(function (data) {
            return data.json()
        })
        .then(function (data) {
            if (data.error) {
                // Mostrar al usuario que hay un error en la petición con el servidor.
            } else {
                // Informar al usuario que se guardó la mascota exitosamente
                console.log(data.body.mensaje);
            }
        })
        .catch(function (error) {
            // Mostrar al usuario que hay un error en la petición con el servidor.
        });
}

// Envia el id de la mascota para eliminarla en la DB.
function eliminarMascota(id) {
    fetch(`${URL}/mascota/${id}`, {
        method: 'DELETE',
    })
        .then(function (data) {
            return data.json()
        })
        .then(function (data) {
            if (data.error) {
                // Mostrar al usuario que hay un error en la petición con el servidor.
            } else {
                // Informar al usuario que se eliminó la mascota exitosamente
                console.log(data.body.mensaje);
            }
        })
        .catch(function (error) {
            // Mostrar al usuario que hay un error en la petición con el servidor.
        });
}

// Como invocar las funciones.

// traerMascotas();

// guardarMascota({
//     nombre: "Deus",
//     raza: "Siberiano",
//     edad: 5,
//     imagen: 'https://www.hola.com/imagenes/estar-bien/20190820147813/razas-perros-pequenos-parecen-grandes/0-711-550/razas-perro-pequenos-grandes-a.jpg?filter=w500',
//     tipo: 'gato',
//     descripcion: 'Esta es una descripcion de prueba',
//     fechaNacimiento: '2021-12-25', //YYYY-MM-DD
//     sexo: 'Macho',
//     peso: 32,
//     entregan: [
//         { tipo: 'Vacunado', realizado: false },
//         { tipo: 'Desparasitado', realizado: true },
//         { tipo: 'Sano', realizado: true },
//         { tipo: 'Esterilizado', realizado: false },
//     ]
// });

// traerMascota('619acb9a7be2e56b4d3d4f82');

// eliminarMascota('619acb9a7be2e56b4d3d4f82');