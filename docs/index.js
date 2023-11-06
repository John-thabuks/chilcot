document.addEventListener("DOMContentLoaded", ()=>{

    const baseURL = "https://my-json-server.typicode.com/John-thabuks/chilcot/db";
    const shopItems = document.getElementById("shop-items");
    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.querySelector("#close-cart");
    const cartContent = document.querySelector(".cart-content");

    let cartItems = [];

    fetch(`${baseURL}/goods`)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                const productBox = document.createElement("div");
                productBox.classList.add("product-box");

                productBox.innerHTML = `
                    <img src="${item.image}" class="product-img" />
                    <h2 class="product-title">${item.title}</h2>
                    <span class="price">${item.price}</span>
                    <i class="bx bxs-shopping-bag add-cart"></i>
                `;

                // Add an event listener for the "Add to Cart" button
                const addButton = productBox.querySelector(".add-cart");
                addButton.addEventListener("click", () => {
                    addToCart(item);
                });

                shopItems.appendChild(productBox);
            });
        })
        .catch((error) => console.error("Error fetching data: " + error));

    // Cart icon click event
    cartIcon.addEventListener("click", () => {
        cart.classList.add("active");
        displayCartItems();
    });

    closeCart.addEventListener("click", () => {
        cart.classList.remove("active");
    });

    // Add item to cart
    function addToCart(item) {
        cartItems.push(item);
        item.quantity = 1; // Set initial quantity to 1
        displayCartItems();
    }

    

})