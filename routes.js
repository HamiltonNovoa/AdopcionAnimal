const router = require('express').Router();
const Mascota = require('./schema/Mascota');

// Busca todas las mascotas de la DB.
router.get('/mascotas', function (request, response) {
    Mascota.find()
        .then(function (data) {
            response.status(201).json({
                error: '',
                body: {
                    data: data,
                }
            });
        })
        .catch(function () {
            response.status(500).json({ error: 'Error al encontrar las mascotas, intente nuevamente.', body: '' });
        });
});

// Busca una mascota en especifico de acuerdo al id pasado por la URL.
router.get('/mascota/:id', function (request, response) {
    const id = request.params.id;

    Mascota.findById(id)
        .then(function (data) {
            response.status(201).json({
                error: '',
                body: {
                    data: data,
                }
            });
        })
        .catch(function () {
            response.status(400).json({ error: 'Error al encontrar las mascotas, intente nuevamente.', body: '' });
        });
});

// Crea una mascota en la DB con la información del body de la petición.
router.post('/mascota', function (request, response) {
    const body = request.body;

    new Mascota({ ...body, fechaNacimiento: new Date(body.fechaNacimiento) }).save()
        .then(function (data) {
            response.status(201).json({
                error: '',
                body: {
                    data: data,
                    mensaje: 'Mascota creada exitosamente.'
                }
            });
        })
        .catch(function () {
            response.status(500).json({ error: 'Error al crear mascota, intente nuevamente.', body: '' });
        });
});

// Elimina una mascota de la DB de acuerdo al id pasado por la URL.
router.delete('/mascota/:id', function (request, response) {
    const id = request.params.id;

    Mascota.findByIdAndRemove(id)
        .then(function () {
            response.status(201).json({
                error: '',
                body: {
                    mensaje: 'Mascota eliminado exitosamente',
                }
            });
        })
        .catch(function (e) {
            response.status(500).json({ error: 'Error al eliminar una mascota, intente nuevamente.', body: '' });
        });
});

module.exports = router;