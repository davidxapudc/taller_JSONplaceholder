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


//Creo un evento para el formulario de POST el cual recibe los datos del formulario al hacer sumit
document.getElementById('data-form-post').addEventListener('submit', function(event) {
//Uso preventDefalt para evitar que el formulario se envíe y recargue la página
    event.preventDefault(); 

// Toma los valores de los inputs del formulario y los asigna a una constante
    const userIdPost = document.getElementById('user-id-post').value;
    const titlePost = document.getElementById('title-post').value;
//Obtengo el radio botón seleccionado con el nombre "completed-post" para saber si recibio un valor true o false
    const completedRadio = document.querySelector('input[name="completed-post"]:checked');

//Comprueno  si un radio botón con el nombre "completed" está seleccionado y, si es así, asigna el valor true a la variable completedPost. Si no está seleccionado, asigna false. 
    const completedPost = completedRadio ? completedRadio.value === 'true' : false;

    // Realizar la solicitud POST usando el método fetch que está en la página de JSONplaceholder
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
            userId: userIdPost,
            title: titlePost,
            completed: completedPost,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);

        // Crear la nueva tarjeta con los datos del POST y le asigno una imagen de un samurai porque el registro que elegí no tiene imagenes y quería que se viera mejor
        let newCardPost = `
            <div class="card text-bg-dark h-100">
                <img src="assets/images/Samurai3.jpg" alt="Samurai Image" class="card-img-top">
                <div class="card-body">
                    <h2 class="card-title">Card creada usando el método POST</h2>
                    <div class="text-start fs-4">
                        <p class="card-text"><strong>User Id: </strong>${json.userId}</p>
                        <p class="card-text"><strong>Id: </strong>${json.id}</p>
                        <p class="card-text"><strong>User Title: </strong>${json.title}</p>
                        <p class="card-text"><strong>Completed: </strong>${json.completed ? 'True' : 'False'}</p>
                    </div>
                </div>
            </div>`;

        // Insertar la nueva tarjeta en el HTML
        const cardPostHTML = document.getElementById('new-card-post');
        cardPostHTML.innerHTML = newCardPost;

        // Limpiar el formulario después del envío
        document.getElementById('data-form-post').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});



//Realizo los mismos pasos que en el POST pero con el método PUT
        document.getElementById('data-form-put').addEventListener('submit', function(event) {
            event.preventDefault(); 
        
// Obtener los valores del formulario
            const userId = document.getElementById('user-id-put').value;
            const id = document.getElementById('id-put').value;
            const title = document.getElementById('title-put').value;
        
            const completedRadio = document.querySelector('input[name="completed"]:checked');
            const completed = completedRadio ? completedRadio.value === 'true' : false; 

            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    userId: userId, 
                    id: id,
                    title: title,
                    completed: completed 
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json); 
        
                let cardEdited = `
                <div class="card text-bg-dark h-100">
                    <img src="assets/images/Samurai1.jpg" alt="Samurai Image" class="card-img-top">
                    <div class="card-body">
                        <h2 class="card-title">Card del elemento con ID: ${json.id} editado usando el método PUT</h2>
                        <div class="text-start fs-4">
                            <p class="card-text"><strong>User Id: </strong>${json.userId}</p>
                            <p class="card-text"><strong>Id: </strong>${json.id}</p>
                            <p class="card-text"><strong>User Title: </strong>${json.title}</p>
                            <p class="card-text"><strong>Completed: </strong>${json.completed ? 'True' : 'False'}</p>
                        </div>
                    </div>
                </div>`;

                const cardEditedHTML = document.getElementById('card-edited');
                cardEditedHTML.innerHTML = cardEdited;

                document.getElementById('data-form-put').reset();
            })
        });


//Realizo  pasos similares a los métodos anteriores pero con el método DELETE y usando alertas de SweetAlert2
        document.getElementById('delete').addEventListener('click', function(event) {
            event.preventDefault();
            

            const idDelete = document.getElementById('id-delete').value;

            // Creo una alerta de SweetAlert2 para confirmar si el usuario desea eliminar el registro asignandole colores,estilos y textos que contrasten con la página, eso si apoyandome de la IA y la pagina de SweetAlert2 
            //ya que no conozco los colores por codigo y querái que los textos fueran congruentes 
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminarlo!',
                cancelButtonText: 'Cancelar',
                background: '#343a40', 
                color: '#ffffff', 
                iconColor: '#ffc107' 
            }).then((result) => {
                // Si el usuario confirma que desea eliminar el registro después de la alerta, se ejecuta el codigo con el método DELETE
                if (result.isConfirmed)
                    {
                    // Realizar la solicitud DELETE usando el método fetch buscando el registro que se desea eliminar por su ID
                    fetch(`https://jsonplaceholder.typicode.com/todos/${idDelete}`, {
                        method: 'DELETE',
                    })
                    .then((response) => {
                        //Después de encontrar el registro y eliminarlo, se muestra una alerta de SweetAlert2 para confirmar que el registro ha sido eliminado
                            Swal.fire({
                            title: '¡Eliminado!',
                            text: `Registro con ID ${idDelete} ha sido eliminado.`,
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            background: '#343a40', 
                            color: '#ffffff', 
                            iconColor: '#ffc107',
                            confirmButtonColor: '#d33' 
                        });
        
                        document.getElementById('id-delete').value = '';
                    })
                }
                else 
                //Si el usuario cancela la eliminación del registro, o si sucede algun error se muestra una alerta de SweetAlert2 para confirmar que el registro no ha sido eliminado
                Swal.fire({
                    title: 'El registro no ha sido eliminado',
                    text: `Registro con ID ${idDelete} no ha sido eliminado.Puede intentar de nuevo.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    background: '#343a40', 
                    color: '#ffffff', 
                    iconColor: '#ffc107',
                    confirmButtonColor: '#d33' 
                });
            });
        });