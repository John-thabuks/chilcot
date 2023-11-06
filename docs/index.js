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

    // Display items in the cart
    function displayCartItems() {
        cartContent.innerHTML = "";

        cartItems.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-box");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${item.title}</div>
                    <div class="cart-price">$${(item.price.replace('$', '') * item.quantity).toFixed(2)}</div>
                    <input type="number" value="${item.quantity}" class="cart-quantity">
                </div>
                <i class="bx bxs-trash-alt cart-remove"></i>
            `;

            const removeButton = cartItem.querySelector(".cart-remove");
            removeButton.addEventListener("click", () => {
                removeFromCart(item);
            });

            const quantityInput = cartItem.querySelector(".cart-quantity");
            quantityInput.addEventListener("change", () => {
                updateQuantity(item, quantityInput.value);
            });

            cartContent.appendChild(cartItem);
        });

        updateTotal();
    }

    // Remove item from the cart
    function removeFromCart(item) {
        const index = cartItems.indexOf(item);
        if (index > -1) {
            cartItems.splice(index, 1);
            displayCartItems();
        }
    }

    // Update the total price
    function updateTotal() {
        let total = 0;

        cartItems.forEach((item) => {
            total += parseFloat(item.price.replace("$", '')) * item.quantity;
        });

        const totalPrice = document.querySelector(".total-price");
        totalPrice.textContent = `$${total.toFixed(2)}`;
    }

})