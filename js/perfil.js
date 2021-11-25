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
                document.getElementById('perfil-mascota--nombre').innerHTML = mascota.nombre ? mascota.nombre.toUpperCase() : '';

                let mascotaImagen = document.getElementById('perfil-mascota--imagen');
                mascotaImagen.setAttribute('src', mascota.imagen);

                document.getElementById('perfil-mascota--descripcion').innerHTML = mascota.descripcion || 'No hay descripción por mostrar';

                [{ value: 'raza', texto: 'Raza' },
                { value: 'edad', texto: 'Edad' },
                { value: 'fechaNacimiento', texto: 'Fecha nacimiento' },
                { value: 'peso', texto: 'Peso' },
                { value: 'sexo', texto: 'Sexo' },
                ].forEach(function (item, index) {

                    let mensaje = item.texto;
                    let value = formatearValor(mascota[item.value], index);

                    if (hijo = crearItemInfo(mensaje, value)) {
                        document.getElementById('perfil-mascotas--info').appendChild(hijo);
                    }
                });

                if (mascota.entregan.length > 0) {
                    document.getElementById('perfil-mascota--entrega').innerHTML = '';
                    mascota.entregan.forEach(function (item) {
                        document.getElementById('perfil-mascota--entrega').appendChild(crearItemEntrega(item));
                    });
                }

            } else {
                // Mostrar al usuario que no se encontro la mascota con ese id.
            }
        }
    })
    .catch(function (error) {
        console.log(error);
        // Mostrar al usuario que hay un error en la petición con el servidor.
        // window.history.back();
    });


function crearItemInfo(tipo, valor) {
    if (!valor) { return; }

    let li = document.createElement('li');

    let parrafo = document.createElement('b');
    parrafo.innerHTML = tipo + ": ";

    li.appendChild(parrafo);
    li.innerHTML += valor;
    return li;
}

function crearItemEntrega(item) {
    let divPadre = document.createElement('div');
    let parrafo = document.createElement('p');
    parrafo.innerHTML = item.tipo;

    let strong = document.createElement('strong');
    strong.classList.add(item.realizado ? 'si' : 'no');
    strong.innerHTML = item.realizado ? '✅' : '❌';

    divPadre.appendChild(parrafo);
    divPadre.appendChild(strong);

    return divPadre;
}

function formatearValor(valor, index) {
    if (!valor) { return; }
    switch (index) {
        case 2:
            var today = new Date(valor);
            var dd = today.getDate() + 1;
            var mm = today.getMonth() + 1;

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = dd + '/' + mm + '/' + yyyy;
            return today;

        case 3:
            return valor + ' kg';
        default:
            return valor;
    }
}