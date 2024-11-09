const uri = 'api/Maestroes';
let todos = [];
//Utilizar el Metodo GET de HTTP
function getMaes() {
    fetch(uri)
        .then(response => response.json())
        .then(data => MostrarMaestro(data))
        .catch(error => console.error("No Se Logro Cargar Datos", error));
}

//Contar Los registros de la tabla
function MostrarContador(itemCount) {
    const name = (itemCount === 1) ? 'Registro' : 'Registros';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}
//Metodo Mostrar Maestro
function MostrarMaestro(data) {
    const tBody = document.getElementById('DetMaes');
    tBody.innerHTML = '';

    MostrarContador(data.length);

    const button = document.createElement('button');
    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.NCuenta})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteEmple(${item.NCuenta})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let txtCode = document.createTextNode(item.NCuenta);
        td1.appendChild(txtCode);

        let td2 = tr.insertCell(1);
        let txtNombre = document.createTextNode(item.NombreCompleto);
        td2.appendChild(txtNombre);

        let td3 = tr.insertCell(2);
        let txtProf = document.createTextNode(item.Profesion);
        td3.appendChild(txtProf);

        let td4 = tr.insertCell(3);
        let txtCarre = document.createTextNode(item.Carrera);
        td4.appendChild(txtCarre);

        let td5 = tr.insertCell(4);
        let txtEdad = document.createTextNode(item.Edad);
        td5.appendChild(txtEdad);

       let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);
    });
    todos = data;
}
//Mostrar Editor De Datos
function displayEditForm(Code) {

    const item = todos.find(item => parseInt(item.NCuenta, 10) === Code);

    document.getElementById('edit-code').value = item.NCuenta;
    document.getElementById('edit-name').value = item.NombreCompleto;
    document.getElementById('edit-profesion').value = item.Profesion;
    document.getElementById('edit-carrera').value = item.Carrera;
    document.getElementById('edit-edad').value = item.Edad;
   

    document.getElementById('editForm').style.display = 'block';
}
//Cerrar el editor
function closeInput() {//cada vez que el editor o el type se manipule para cerrar o abrir y se 
    //cree una accion del boton CloseInput va generar el componente updateiteam
    document.getElementById('editForm').style.display = 'none';
}
//Actualizar Empleado
function updateItem() {
    const MaestroCode = document.getElementById('edit-code').value;
    const item = {
        NCuenta: MaestroCode,
        NombreCompleto: document.getElementById('edit-name').value.trim(),
        Profesion: document.getElementById('edit-profesion').value.trim(),
        Carrera: document.getElementById('edit-carrera').value.trim(),
        Edad: document.getElementById('edit-edad').value.trim(),
    };
   // PUT: api / Empleadoes / 5, el cinco representa la variable que recibe la llave primaria
    fetch(`${uri}/${MaestroCode}`, {
        method: 'PUT',//metodod de actualizar
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //enviamos toda la notificacion (item) en notacion JSON
        body: JSON.stringify(item)
    })
        //si todo esta bien mandamos a llamar a nuestro metodo get que es consultar
        .then(() => getMaes())
        .catch(error => console.error('Error al actualizar Empleado.', error));
    closeInput();
    return false;
}
//Eliminar Empleado
function deleteEmple(Code) {
    fetch(`${uri}/${Code}`, {
        method: 'DELETE'
    })
        .then(() => getMaes())
        .catch(error => console.error('Error en Eliminar Empleado.', error));
}
//Insertar Registro de Empleados
function addMaes() {
    const addCodeTextbox = document.getElementById('Codigo');
    const addNameTextbox = document.getElementById('Nombre');
    const addProfTextbox = document.getElementById('Profesion');
    const addCarreTextbox = document.getElementById('Carrera');
    const addEdadTextbox = document.getElementById('Edad');

    const item = {
        NCuenta: addCodeTextbox.value.trim(),
        NombreCompleto: addNameTextbox.value.trim(),
        Profesion: addProfTextbox.value.trim(),
        Carrera: addCarreTextbox.value.trim(),
        Edad: addEdadTextbox.value.trim(),
       
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getMaes();
            addCodeTextbox.value = '';
            addNameTextbox.value = '';
            addProfTextbox.value = '';
            addCarreTextbox.value = '';
            addEdadTextbox.value = '';
           
        })
        .catch(error => console.error('Error en Agregar Empleado.', error));
}