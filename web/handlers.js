function handlerAuthGoogle(e) {
      console.log('handlerAuthGoogle');
    window.location.href = 'http://localhost:5000/auth/google';
  

  /*   e.preventDefault();

    const url = 'http://localhost:5000/auth/google';

    const dataGET = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5nb21lekBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imp1YW5nb21leiIsImFkbWluIjpmYWxzZSwidXNlcm5hbWVJRCI6MSwiaWF0IjoxNjQ3NTYxODkxLCJleHAiOjE2NDc1NjU0OTF9.sUDze0vxph9MJ3bB-bRZVOzOfV_IyGCgFIfAccdbp4o',
          'Host': 'localhost:5000'
        }
      };

    var statusCode = 200;
    fetch(url)
        .then(r => r.json().then(data => ({ status: data, token })))
        .then(info => {
            console.log(info);
        }); */
}


function handlerValidarRegister(e) {
    console.log('Validar Register');

    e.preventDefault();
    const form = document.getElementById("form");
    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const email = form.email.value;
    const password = form.password.value;
    const username = nombre + '.' + apellido;

    if (nombre === "" || apellido === "" || email === "" || password === "") {
        alert("Todos los campos son requeridos");
        return false;
    }

    // TODO: Incluir validaciones de longitudes de los campos
    console.log('Registrar usuario');

    const url = 'http://localhost:5000/api/auth/signup';

    const dataPOST = {
        username,
        password,
        nombre,
        apellido,
        email: email,
        "direccionEnvio": "",
        "telefono": ""
    };

    var statusCode = 200;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataPOST),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(r => r.json().then(data => ({ status: r.status, body: data })))
        .then(info => {
            console.log(info);
            if (info.status === 200 || info.status === 201) {
                window.location.href = "registerOK.html";
            } else {
                const messaggeError = document.getElementById("messageError");
                messaggeError.innerText = info.body.status;
            }
        });
};

function handlerListarProductos(e) {
    console.log('Listar Productos');

    e.preventDefault();

    const url = 'http://localhost:5000/api/productos';

    const dataGET = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5nb21lekBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imp1YW5nb21leiIsImFkbWluIjpmYWxzZSwidXNlcm5hbWVJRCI6MSwiaWF0IjoxNjQ3NTYxODkxLCJleHAiOjE2NDc1NjU0OTF9.sUDze0vxph9MJ3bB-bRZVOzOfV_IyGCgFIfAccdbp4o',
          'Host': 'localhost:5000'
        }
      };

    var statusCode = 200;
    fetch(url, dataGET)
        .then(r => r.json().then(data => ({ productos: data })))
        .then(info => {
            console.log(info);
        });
};



