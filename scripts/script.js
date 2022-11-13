/** Valores de entrada */
const inputGetId = document.getElementById("inputGetId");
const inputNombre = document.getElementById("inputNombre");
const inputApellido = document.getElementById("inputApellido");
const inputModalNombre = document.getElementById("inputModalNombre");
const inputModalApellido = document.getElementById("inputModalApellido");

const btnArray = document.querySelectorAll(".toDisabled");
const inpArray = document.querySelectorAll(".input");

// Input de "Modificar Registro"
const inputModReg = document.getElementById("inputModReg");

const inputDelete = document.getElementById("inputDelete");
const results = document.getElementById("results");

/** Botones */

const btnGet1 = document.getElementById("btnGet1");
const btnPost = document.getElementById("btnPost");

const btnModalSave = document.getElementById("btnSendChanges");

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
	btnGet1.addEventListener("click", async () => {
		await getData();
		//recorrerObjetos();
	});

	async function getData() {
		let usrId = inputGetId.value;
		await fetch(URL + resource + usrId)
			.then((response) => {
				if (response.ok) {

					return response.json();
				} else {
					errorAlerta();

				}

			})
			.then((response) => {
				resultArray = response;

				recorrerObjetos();

				// console.log(resultArray);
			})
			.catch((err) => console.error(err));
		console.log(resultArray);
		inputGetId.value="";
	}

	function errorAlerta() {
		let alert = document.getElementById('alert-error')
		alert.classList.add('show')
		setTimeout(function () {

			alert.classList.remove('show')
			alert.classList.add('hide')
		}, 3000)
	}

	function recorrerObjetos() {
		let htmlContentToAppend = "";
		if (resultArray.length > 0) {
			for (let item of resultArray) {
				const { id, name, lastname } = item;
				htmlContentToAppend += `
				<li>
                <p>ID: ${id}</p>
                <p>Name: ${name}</p>
                <p>Lastname: ${lastname}</p>
                </li>
				`;
			}
		} else {
			htmlContentToAppend += `<li><p>ID: ${resultArray.id}</p>
            <p>Name: ${resultArray.name}</p>
            <p>Lastname: ${resultArray.lastname}</p>
			</li>`;
		}

		results.innerHTML = htmlContentToAppend;
	}

	btnPost.addEventListener("click", () => {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify({
			name: inputNombre.value,
			lastname: inputApellido.value,
		});

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(URL + resource, requestOptions)
			.then((response) => response.json())
			.then((response) => getData())
			.catch((error) => console.log("error", error));
	});







	btnPut.addEventListener("click", async () => {
		let inputUserId = inputModReg.value;
		let myModal = document.getElementById('dataModal')

		
		await recorrerObjetos();
		
		let userMod = resultArray.find(({ id }) => id === inputUserId);
		console.log(userMod);
		if (userMod === undefined) {
			document.querySelector('.modal-backdrop').remove()
			//modal.hide()
			//document.querySelector('')
			let myModal = document.getElementById('dataModal')
			myModal.classList.remove("show");
			errorAlerta();
		}
		inputModalNombre.value = userMod.name;
		inputModalApellido.value = userMod.lastname;

		console.log(userMod);



	});
	btnModalSave.addEventListener("click", async () => {
		console.log(inputModalNombre.value, inputModalApellido.value);
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify({
			name: inputModalNombre.value,
			lastname: inputModalApellido.value,
		});

		let requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		await fetch(URL + resource + inputModReg.value, requestOptions)
			.then((response) => response.json())
			.then((response) => getData())
			.catch((error) => console.log("error", error));

		await getData();
		recorrerObjetos();
	});

	btnDelete.addEventListener("click", async () => {
		const idtoDelete = inputDelete.value;

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = "";

		let requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		await fetch(URL + resource + idtoDelete, requestOptions)
			.then((response) => response.json())
			.then((response) => recorrerObjetos())
			.catch((error) => { console.log(error) });

		let userMod = resultArray.find(({ id }) => id === idtoDelete);
		if (userMod === undefined) {

			errorAlerta();
		}


		await getData();
		recorrerObjetos();
	});
});

function switchEnabledBtn(id, status = false) {
	const element = document.querySelector(`#${id}`);
	element.disabled = status;
}

function validateInput() {
	inputNombre.addEventListener("input", () => {
		if (inputApellido.value != "" && inputNombre != "") {
			switchEnabledBtn("btnPost");
		} else {
			switchEnabledBtn("btnPost", true);
		}
	});
	inputApellido.addEventListener("input", () => {
		if (inputApellido.value != "" && inputNombre != "") {
			switchEnabledBtn("btnPost");
		} else {
			switchEnabledBtn("btnPost", true);
		}
	});
	inputModReg.addEventListener("input", () => {
		if (inputModReg.value !== "") {
			switchEnabledBtn("btnPut");
		} else {
			switchEnabledBtn("btnPut", true);
		}
	});
	inputDelete.addEventListener("input", () => {
		if (inputDelete.value !== "") {
			switchEnabledBtn("btnDelete");
		} else {
			switchEnabledBtn("btnDelete", true);
		}
	});
}
validateInput();
