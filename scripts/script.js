/** Valores de entrada */
const inputGetId = document.getElementById("inputGet1Id");
const inputNombre = document.getElementById("inputNombre");
const inputApellido = document.getElementById("inputApellido");
const inputPutId = document.getElementById("inputPutId");
const inputDelete = document.getElementById("inputDelete");
const results = document.getElementById("results");

/** Botones */

const btnGet1 = document.getElementById("btnGet1");
const btnPost = document.getElementById("btnPost");
const btnPut = document.getElementById("btnPut");
const btnDelete = document.getElementById("btnDelete");
const btnSendChanges = document.getElementById("btnSendChanges");

/**Variables API */

const URL = "https://636519c1f711cb49d1f52074.mockapi.io/";
const resource = "users/";
let resultArray = [];


document.addEventListener("DOMContentLoaded", () => {
    getData();
    btnGet1.addEventListener("click", () => {

        getData();
        recorrerObjetos();
    });

    function getData(){
        let usrId = inputGetId.value;
        fetch(URL + resource + usrId)
            .then((response) => { return response.json() })
            .then((response) => {
                resultArray = response
                console.log(resultArray);
            })
            .catch(err => console.error(err));
        
        //console.log(resultArray);
    }


    function recorrerObjetos() {
        let htmlContentToAppend = "";
        if (resultArray.length > 0) {
            for (let item of resultArray) {
                const { id, name, lastname } = item;
                htmlContentToAppend += `
                <p>ID: ${id}</p>
                <p>Name: ${name}</p>
                <p>Lastname: ${lastname}</p>
                `
            }
        } else {

            htmlContentToAppend += `<p>ID: ${resultArray.id}</p>
            <p>Name: ${resultArray.name}</p>
            <p>Lastname: ${resultArray.lastname}</p>`
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
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        console.log("bla")
        recorrerObjetos();

    })
})








