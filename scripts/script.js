/** Valores de entrada */
const inputGetId = document.getElementById("inputGetId");
const inputNombre = document.getElementById("inputNombre");
const inputApellido = document.getElementById("inputApellido");
const inputModalNombre = document.getElementById("inputModalNombre");
const inputModalApellido = document.getElementById("inputModalApellido");

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
		recorrerObjetos();
	});

	async function getData() {
		let usrId = inputGetId.value;
		await fetch(URL + resource + usrId)
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				resultArray = response;

				// console.log(resultArray);
			})
			.catch((err) => console.error(err));

		console.log(resultArray);
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
                `;
			}
		} else {
			htmlContentToAppend += `<p>ID: ${resultArray.id}</p>
            <p>Name: ${resultArray.name}</p>
            <p>Lastname: ${resultArray.lastname}</p>`;
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
		await getData();

		let userMod = resultArray.find(({ id }) => id === inputUserId);

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
			.then((response) => getData())
			.catch((error) => console.log("error", error));

		await getData();
		recorrerObjetos();
	});
});

function switchEnabledBtn(status, el) {}
