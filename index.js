const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Router = require('./routes');

const PORT = process.env.PORT || 5000;
const CONNECTION = 'mongodb+srv://admin:admin@cluster0.2fe4l.mongodb.net/Mascotas?retryWrites=true&w=majority';

mongoose.connect(CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((db) => console.log("DB is connected"))
    .catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use('/api', Router);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});