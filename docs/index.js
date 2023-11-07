const baseURL = "https://John-thabuks.github.io/chilcot/db.json";

document.addEventListener("DOMContentLoaded", () => {

    
    const shopItems = document.getElementById("shop-items");
    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.querySelector("#close-cart");
    const cartContent = document.querySelector(".cart-content");

    let cartItems = [];

    fetch(`${baseURL}`)
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

    // Update quantity and recalculate the total
    function updateQuantity(item, newQuantity) {
        item.quantity = parseInt(newQuantity);

        if (item.quantity < 1) {
            item.quantity = 1;
        }

        displayCartItems();
    }

    // Buy button click event
    document.querySelector(".btn-buy").addEventListener("click", () => {
        if (cartItems.length > 0) {
            alert("Your order is placed!");
            cartItems = [];
            displayCartItems();
        } else {
            alert("Please add items to your cart before buying.");
        }
    });


    const contactButton = document.getElementById("contact-button");
    const contactForm = document.getElementById("contact-form");

    contactButton.addEventListener("click", () => {
        contactForm.style.display = "block";
    });

    // Update this event listener to send a POST request when the form is submitted
    const form = document.getElementById("contact-form").querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission for this example

        // Get form input values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Create an object with the form data
        const formData = {
            name,
            email,
            message
        };

        // Send a POST request to your server (replace with your actual endpoint)
        fetch(`${baseURL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response if needed
                console.log("Form submitted successfully:", data);

                // Clear the form
                form.reset();

                // Hide the form
                contactForm.style.display = "none";
            })
            .catch((error) => {
                console.error("Error submitting the form:", error);
                // You can display an error message to the user if needed
            });
    });


    console.log(baseURL)

})