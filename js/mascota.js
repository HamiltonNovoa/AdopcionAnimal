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

            let dataGraficaVacunados = [0, 0, 0, 0];
            let dataGraficaCantidad = [0, 0, 0, 0];

            data.body.data.forEach(function (mascota, i) {
                if (i < 16) {
                    mascotasDOM.appendChild(crearMascotaDOM(mascota));
                }

                ++dataGraficaCantidad[contarCantidadMascotas(mascota)];

                let vacunado = contarVacunadosMascotas(mascota);
                if (vacunado >= 0) {
                    ++dataGraficaVacunados[contarVacunadosMascotas(mascota)];
                }
            });
            crearGraficaVacunas(dataGraficaVacunados);
            crearGraficaCantidad(dataGraficaCantidad);
        }
    })
    .catch(function (error) {
        // Mostrar al usuario que hay un error en la petición con el servidor.
        console.log(error);
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

function contarVacunadosMascotas(mascota) {
    let index = -1;
    let tipo = mascota.tipo ? mascota.tipo.toLowerCase() : '';
    let sexo = mascota.sexo ? mascota.sexo.toLowerCase() : '';

    let vacunado = mascota.entregan.filter(function (item) {
        return item.tipo?.toLowerCase() === 'vacunado';
    });

    if (vacunado) {
        if (tipo == 'gato' && sexo == 'hembra') {
            index = 3;
        } else if (tipo == 'gato') {
            index = 2;
        } else if (tipo == 'perro' && sexo == 'hembra') {
            index = 1;
        } else if (tipo == 'perro') {
            index = 0;
        }
    }

    return index;
}

function contarCantidadMascotas(mascota) {
    let index = 0;
    let tipo = mascota.tipo ? mascota.tipo.toLowerCase() : '';
    let sexo = mascota.sexo ? mascota.sexo.toLowerCase() : '';

    if (tipo == 'gato' && sexo == 'hembra') {
        index = 3;
    } else if (tipo == 'gato') {
        index = 2;
    } else if (tipo == 'perro' && sexo == 'hembra') {
        index = 1;
    } else if (tipo == 'perro') {
        index = 0;
    }

    return index;
}

function crearGraficaVacunas(data) {
    const colors = {
        background: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
        ],
        border: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ]
    };
    new Chart(document.getElementById('chart-bar').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Mascotas'],
            datasets: ['Perro', 'Perra', 'Gato', 'Gata'].map(function (item, index) {
                return {
                    label: item,
                    data: [data[index]],
                    backgroundColor: [colors.background[index]],
                    borderColor: [colors.border[index]],
                    borderWidth: 1
                }
            })
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '# de mascotas vacunadas'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function crearGraficaCantidad(data) {
    new Chart(document.getElementById('chart-pie').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Perro', 'Perra', 'Gato', 'Gata'],
            datasets: [{
                label: '# de mascotas',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '# de mascotas (PIE)'
                }
            }
        }
    });
}