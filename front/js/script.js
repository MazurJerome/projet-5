class Product{
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct);
    }
}
//
// recuperation des produits et integration a la page d'acceuil
//
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then (function(jsonListeProducts) {
        //let jsonListeProducts = data.json();
        for( let jsonProduct of jsonListeProducts){
            let product = new Product(jsonProduct);
            document.getElementById("items").innerHTML += 
            `
                    <a href="./product.html?id=${product._id}">
                        <article>
                        <img src="${product.imageUrl}" alt=${product.altTxt}>
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>
                        </article>
                    </a>
            `;
        }
    });
