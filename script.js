document.addEventListener("DOMContentLoaded", function () {
    const cartNotification = document.getElementById("cartNotification");
    const cartButton = document.getElementById("cartButton");
    const productPage = document.getElementById("productPage");
    const cartPage = document.getElementById("cartPage");
    const cartItemsContainer = document.querySelector(".cart-items");
    const goBackButton = document.querySelector(".go-back-button");
    const checkoutButton = document.querySelector(".checkout-button");

    let cartCount = 0;
    let totalPrice = 0;

    const cart = {}; // Object to store cart items

    // Function to update the cart notification
    function updateCartNotification() {
        cartNotification.innerText = cartCount;
    }

    // Function to add a product to the cart
    function addToCart(productName, price) {
        cartCount++;
        updateCartNotification();

        if (cart.hasOwnProperty(productName)) {
            cart[productName].quantity++;
        } else {
            cart[productName] = { price: price, quantity: 1 };
        }

        totalPrice += price; // Increment total price by the price of the added product
        updateCartDisplay();
    }

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ""; // Clear previous cart items

        for (const productName in cart) {
            const item = cart[productName];
            const itemTotalPrice = item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="item-info">
                    <span class="item-name">${productName}</span>
                    <span class="item-price">Price: TZS ${item.price.toFixed(
                        2
                    )}</span>
                    <span class="item-quantity">Quantity: 
                        <button class="quantity-decrease" data-product="${productName}">-</button>
                        ${item.quantity}
                        <button class="quantity-increase" data-product="${productName}">+</button>
                    </span>
                    <span class="item-total">Total: TZS ${itemTotalPrice.toFixed(
                        2
                    )}</span>
                    <button class="remove-from-cart" data-product="${productName}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        }

        // Calculate total price including delivery
        const deliveryPrice = 5000;
        const grandTotal = totalPrice + deliveryPrice;

        // Display total price in the cart summary
        document.getElementById("totalItems").innerText = cartCount;
        document.getElementById("totalPrice").innerText =
            "TZS " + totalPrice.toFixed(2);
        document.getElementById("deliveryPrice").innerText =
            "TZS " + deliveryPrice.toFixed(2);
        document.getElementById("grandTotal").innerText =
            "TZS " + grandTotal.toFixed(2);

        if (cartCount === 0) {
            checkoutButton.disabled = true;
        } else {
            checkoutButton.disabled = false;
        }
    }

    // Function to remove a product from the cart
    function removeFromCart(productName) {
        if (cart.hasOwnProperty(productName)) {
            cartCount -= cart[productName].quantity;
            totalPrice -= cart[productName].price * cart[productName].quantity;
            delete cart[productName];
            updateCartNotification();
            updateCartDisplay();
        }
    }

    // Function to handle quantity increase
    function increaseQuantity(productName) {
        cart[productName].quantity++;
        totalPrice += cart[productName].price;
        updateCartDisplay();
    }

    // Function to handle quantity decrease
    function decreaseQuantity(productName) {
        if (cart[productName].quantity > 1) {
            cart[productName].quantity--;
            totalPrice -= cart[productName].price;
            updateCartDisplay();
        }
    }

    // Event listener for the cart button to show the cart page
    cartButton.addEventListener("click", function () {
        productPage.style.display = "none";
        cartPage.style.display = "block";
        updateCartDisplay(); // Update cart display when navigating to cart page
    });

    // Event listener for the go back button to return to the product page
    goBackButton.addEventListener("click", function () {
        productPage.style.display = "block";
        cartPage.style.display = "none";
        updateCartDisplay(); // Update cart display when navigating back to product page
    });

    // Event listener for the add to cart buttons on the product page
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const productName = this.parentNode.querySelector("h2").innerText;
            const priceString = this.parentNode.querySelector("p:nth-child(3)")
                .innerText;
            const price = parseFloat(priceString.split(" ")[1]); // Extract price without "TZS" and parse as float
            addToCart(productName, price);
        });
    });

    // Event delegation for the remove from cart buttons
    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-from-cart")) {
            const productName = event.target.dataset.product;
            removeFromCart(productName);
        } else if (event.target.classList.contains("quantity-increase")) {
            const productName = event.target.dataset.product;
            increaseQuantity(productName);
        } else if (event.target.classList.contains("quantity-decrease")) {
            const productName = event.target.dataset.product;
            decreaseQuantity(productName);
        }
    });

    // Event listener for the checkout button
    checkoutButton.addEventListener("click", function () {
        // Implement checkout functionality here
        alert("Checkout functionality will be implemented soon!");
    });

    // Ensure that the product page is displayed initially
    productPage.style.display = "block";
    cartPage.style.display = "none";
});