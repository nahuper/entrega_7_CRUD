/** Valores de entrada */
const inputGetId = document.getElementById("inputGet1Id");
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");
const inputPutId = document.getElementById("inputPutId");
const inputDelete = document.getElementById("inputDelete");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");

/** Botones */

const btnGet1 = document.getElementById("btnGet1");
const btnPost = document.getElementById("btnPost");
const btnPut = document.getElementById("btnPut");
const btnDelete = document.getElementById("btnDelete");
const btnSendChanges = document.getElementById("btnSendChanges");

/**Variables API */

const URL = "https://636519c1f711cb49d1f52074.mockapi.io/";
const resource = "users/";

btnGet1.addEventListener("click", ()=>{

    let usrId = inputGet1Id.value
    fetch(URL + resource + usrId)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    
    
});




