//
//
// fonctions
//
//

//fonction pour recuperer l'url de la page
function getURL() {
	return window.location.href;
}

//fonction pour recuperer l'id du produit
function getID(urlPage) {
	const url = new URL(urlPage);
	const searchParams = new URLSearchParams(url.search);
	const id = searchParams.getAll("id");
	return id;
}

//verification de l'existance du produit et redirection sur la page d'acceuil si le produit n'existe pas
function verifProduct(id) {
	let ok = false;
	fetch(APIProducts)
		.then((response) => response.json()) // recuperation erreur id produit
		.catch(function (e) {
			console.error(e.message); // "zut !"
			console.error("zut !"); //
		})
		.then(function (jsonListeProducts) {
			for (let jsonProduct of jsonListeProducts) {
				if (jsonProduct._id === id) {
					ok = true;
				}
			}
			if (ok != true) {
				alert("mauvaise adresse produit");
				document.location = "index.html";
			}
		});
}
//
//fin des fonctions
//
//debut du code
//
//recuperation du produit
const actualURL = getURL();
const idProduct = getID(actualURL);
const verif = verifProduct(idProduct[0]);
//ajout du produit
fetch(APIProducts + idProduct)
	.then((data) => data.json())
	.then((jsonProduct) => {
		document.querySelector(
			".item__img"
		).innerHTML = `<img src="${jsonProduct.imageUrl}" alt="${jsonProduct.altTxt}"></img>`;
		document.querySelector("#title").innerHTML = `${jsonProduct.name}`;
		document.querySelector("#price").innerHTML = `${jsonProduct.price}`;
		document.querySelector(
			"#description"
		).innerHTML = `${jsonProduct.description}`;

		//recuperation couleur
		const colorTab = jsonProduct.colors.length;
		for (let i = 0; i < colorTab; i++) {
			let newOption = document.createElement("option");
			const valeur = jsonProduct.colors[i];
			newOption.setAttribute("value", valeur);
			newOption.innerHTML = valeur;
			document.querySelector("#colors").append(newOption);
		}
		//recuperation quantité
		document.getElementById("input#quantity");
		addEventListener("change", (event) => {
			const quantity = event.target.value;
		});
		// detection du click sur le bouton ajouter au panier et ajout du produit si couleur et nombre defini
		document.getElementById("addToCart").addEventListener("click", (e) => {
			e.preventDefault();
			//si couleur et quantite defini
			if (quantity.value > 0 && colors.value != "") {
				addBasket({
					id: idProduct[0],
					option: [{ color: colors.value, quantity: quantity.value }],
				});
				alert("article(s) ajouté(s)");
				//redirection acceuil apres ajout
				document.location = "index.html";
			}
			//si couleur et/ou nombre non defini
			else {
				alert("veuillez saissir une couleur et un nombre");
			}
		});
	});
