// Utilizo el método fetch para obtener los datos de la API convirtiéndolos a JSON y haciendo un console.log de los datos obtenidos.
//No use el método tal cual enseña la página de JSONPlaceholder, ya que debía crear un array para mostrar los datos
fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then(json =>{
        console.log(json)

//Creo una variable output para almacenar los datos de la API 
        let output = "";
//Recorro el array de la API usando un forEach y voy concatenando los datos en la variable output dentro a un table row el cual contiene table data por cada uno
//de los datos que se usarán en la tabla así como vimos en la socialización del parcial
        json.forEach(function(todo){
            output += `
            <tr>
                <td>${todo.userId}</td>
                <td>${todo.id}</td>
                <td>${todo.title}</td>
                <td>${todo.completed}</td>
            </tr>
            `;
        });
//creo una constante para obtener el id de la tabla y le asigno el valor de la variable output usando el innerHTML para que se muestren los datos en la tabla
//Así finalmente todos los datos de la API se mostrarán en la tabla resolviendo el primer punto del trabajo
        const tableHTML = document.getElementById('table');
        tableHTML.innerHTML = output;
    });

//Hago un fetch a la API de posts para obtener los datos de un post en específico con el que haré el ejercicio 2) y los muestro en consola para verificar de que lo carga
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then(json => {
        console.log(json)
//Creo una variable para almacenar los datos de la API y los muestro en un card con un diseño basado en  bootstrap, aunque cona lgunas modificaciones
//También quise agregar una imagen para que se viera mejor la card,aunque está la añadí creando una carpeta images y agregando la imagen en ella
//Quise cambiarle el tamaño a la imagen agregando un css pero no me funcionó,así que elimine el css y modifique lo que pude la card para que no quedara gigante y poner la imagen centrada
        let cardNoEdit = `
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-4">
                            <div class="card text-bg-dark">
                                <img src="assets/images/Samurai1.jpg" alt="Samurai Image" class="card-img-top img-fluid">
                                <div class="card-body">
                                <h2 class="card-title">Card del registro original</h2>
                                <div class="text-start fs-4"> 
                                    <p class="card-text"><strong>User Id: </strong>${json.userId}</p>
                                    <p class="card-text"><strong>Id: </strong>${json.id}</p>
                                    <p class="card-text"><strong>User Title: </strong>${json.title}</p>
                                    <p class="card-text"><strong>Completed: </strong>${json.completed}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>`;
//Finalmente creo  una constante para obtener el id de la card y le asigno el valor de la variable cardNoEdit usando el innerHTML para que se muestren los datos en la card
        const cardNoEditHTML = document.getElementById('card-no-edit');
        cardNoEditHTML.innerHTML = cardNoEdit;
        });

//Hago un fetch a la API de posts para obtener los datos de un post en específico con el que haré el ejercicio PUT para realizar el ejercicio 2) 
//modifique el userId a 2, el title a "Este es el nuevo titulo" y el completed a true basandome en la guia de la página de JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'PUT',
    body: JSON.stringify({
        userId: 2,
        id: 1,
        title: 'Este es el nuevo título,modificado usando  PUT',
        completed: true,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then(json => {
        console.log(json)
//Basicamente copie y pegue el codigo anterior de la card y la varianle, pero cambie el nombre de la variable y de la constante para que no se sobreescribiera y puse una imagen diferente
        let cardEdited = `
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card text-bg-dark">
                        <img src="assets/images/Samurai2.jpg" alt="Samurai Image" class="card-img-top img-fluid">
                        <div class="card-body">
                        <h2 class="card-title">Card del primer elemento de todos editado con PUT</h2>
                        <div class="text-start fs-4"> 
                            <p class="card-text"><strong>User Id: </strong>${json.userId}</p>
                            <p class="card-text"><strong>Id: </strong>${json.id}</p>
                            <p class="card-text"><strong>User Title: </strong>${json.title}</p>
                            <p class="card-text"><strong>Completed: </strong>${json.completed}</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>`;
        const careditedHTML = document.getElementById('card-edited');
        careditedHTML.innerHTML = cardEdited;
    });
