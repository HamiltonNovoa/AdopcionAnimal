// const URL = 'https://servidorpet.herokuapp.com/api'
const URL = 'http://localhost:8888/api'

document.getElementById('form-registro')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const values = Array.from(e.currentTarget).reduce((acc, el) => {
        if (el.name) { acc[el.name] = el.value; }
        if (!el.value) { return false };
        return acc;
    }, {});

    if (values) {
        fetch(URL + '/usuario', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                if (data.error) {
                    alert('Registro incorrecto, intente nuevamente');
                    window.location.reload();
                } else {
                    window.open('/usuario/login.html', '_self');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});

document.getElementById('form-login')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const values = Array.from(e.currentTarget).reduce((acc, el) => {
        if (el.name) { acc[el.name] = el.value; }
        if (!el.value) { return false };
        return acc;
    }, {});

    if (values) {
        fetch(URL + '/usuario', {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                if (data.login) {
                    localStorage.setItem('login', JSON.stringify(data));
                    window.open('/', '_self');
                } else {
                    localStorage.setItem('login', JSON.stringify({}));
                    alert('Inicio de sesión incorrecto');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});