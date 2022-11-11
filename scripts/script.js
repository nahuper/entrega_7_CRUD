/** Valores de entrada */
const inputGetId = document.getElementById("inputGetId");
const inputNombre = document.getElementById("inputNombre");
const inputApellido = document.getElementById("inputApellido");

// Input de "Modificar Registro"
const inputModReg = document.getElementById("inputModReg");

const inputDelete = document.getElementById("inputDelete");
const results = document.getElementById("results");

/** Botones */

const btnGet1 = document.getElementById("btnGet1");
const btnPost = document.getElementById("btnPost");

// Boton "Modificar"
const btnPut = document.getElementById("btnPut");
//Boton "Guardar" del Modal
const btnSendChanges = document.getElementById("btnSendChanges");

const btnDelete = document.getElementById("btnDelete");

/**Variables API */

const URL = "https://636519c1f711cb49d1f52074.mockapi.io/";
const resource = "users/";
let resultArray = [];


document.addEventListener("DOMContentLoaded", () => {
    console.log("Lptm");
    btnGet1.addEventListener("click", () => {
        getData();
    });

    function getData() {
        let usrId = inputGetId.value;
        fetch(URL + resource + usrId)
            .then((response) => { return response.json() })
            .then((response) => {
                resultArray = response;
                recorrerObjetos(response);
                console.log(resultArray);
            })
            .catch(err => console.error(err));

        //console.log(resultArray);
    }


    function recorrerObjetos(users) {
        let htmlContentToAppend = "";
        if (users.length > 0) {
            for (let item of users) {
                const { id, name, lastname } = item;
                htmlContentToAppend += `
                <p>ID: ${id}</p>
                <p>Name: ${name}</p>
                <p>Lastname: ${lastname}</p>
                `
            }
        } else {
            htmlContentToAppend += `<p>ID: ${users.id}</p>
            <p>Name: ${users.name}</p>
            <p>Lastname: ${users.lastname}</p>`
        }

        results.innerHTML = htmlContentToAppend;

    }

    btnPost.addEventListener("click", () => {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "name": inputNombre.value,
            "lastname": inputApellido.value
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch(URL + resource, requestOptions)
            .then(response => response.json())
            .then(response => getData())
            .catch(error => console.log('error', error));


    })

    btnPut.addEventListener("click", () => {
        let inputValue = inputModReg.value;
        getData();
        
        let obj = resultArray.find( ({id}) => id === inputValue);
        console.log(obj);

    })


})








