/* =========================================================
   FOOTWORLD
   PREMIUM FORMAL FOOTWEAR
   CLEAN JAVASCRIPT
========================================================= */


/* =========================================================
   COUNTRY SETTINGS
========================================================= */

const countries = {

    IN: {
        name: "India",
        flag: "🇮🇳",
        currency: "₹",
        currencyName: "INR"
    },

    CA: {
        name: "Canada",
        flag: "🇨🇦",
        currency: "C$",
        currencyName: "CAD"
    },

    US: {
        name: "United States",
        flag: "🇺🇸",
        currency: "$",
        currencyName: "USD"
    },

    GB: {
        name: "United Kingdom",
        flag: "🇬🇧",
        currency: "£",
        currencyName: "GBP"
    },

    AU: {
        name: "Australia",
        flag: "🇦🇺",
        currency: "A$",
        currencyName: "AUD"
    },

    DE: {
        name: "Germany",
        flag: "🇩🇪",
        currency: "€",
        currencyName: "EUR"
    }
};


/* =========================================================
   PRODUCTS
========================================================= */

const products = [

    {
        id: 1,
        name: "The Executive Oxford",
        category: "Formal Shoes",
        price: 129,
        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 2,
        name: "Classic Leather Oxford",
        category: "Formal Shoes",
        price: 139,
        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 3,
        name: "Premium Derby",
        category: "Formal Shoes",
        price: 149,
        image:
            "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 4,
        name: "Signature Black Derby",
        category: "Formal Shoes",
        price: 159,
        image:
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 5,
        name: "Classic Penny Loafer",
        category: "Loafers",
        price: 129,
        image:
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 6,
        name: "Italian Leather Loafer",
        category: "Loafers",
        price: 149,
        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 7,
        name: "Velvet Evening Loafer",
        category: "Loafers",
        price: 169,
        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 8,
        name: "Luxury Brown Loafer",
        category: "Loafers",
        price: 159,
        image:
            "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    }

];


/* =========================================================
   NEW ARRIVALS
========================================================= */

const newProducts = [

    {
        id: 9,
        name: "Royal Cap Toe Oxford",
        category: "New Arrival",
        price: 179,
        image:
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 10,
        name: "Heritage Leather Loafer",
        category: "New Arrival",
        price: 169,
        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 11,
        name: "Modern Monk Strap",
        category: "New Arrival",
        price: 189,
        image:
            "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 12,
        name: "Classic Evening Loafer",
        category: "New Arrival",
        price: 179,
        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=85",
        sizes: ["7", "8", "9", "10", "11", "12"]
    }

];


/* =========================================================
   GLOBAL STATE
========================================================= */

let selectedCountry =
    localStorage.getItem("footworldCountry") || null;

let cart =
    JSON.parse(localStorage.getItem("footworldCart")) || [];

let selectedProduct = null;

let selectedSize = null;

let modalQuantity = 1;


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    renderProducts();

    renderNewProducts();

    updateCart();

    setupCountryGate();

    updateCountryDisplay();

    setupKeyboardControls();

});


/* =========================================================
   COUNTRY GATE
========================================================= */

function setupCountryGate() {

    const gate =
        document.getElementById("countryGate");

    const selector =
        document.getElementById("countrySelector");


    /*
       If your new index uses countrySelector
       instead of countryGate, support both.
    */

    const countryScreen =
        selector || gate;


    if (!countryScreen) {
        return;
    }


    if (selectedCountry) {

        countryScreen.classList.remove("active");

        countryScreen.style.display = "none";

        document.body.classList.remove("country-lock");

    } else {

        countryScreen.classList.add("active");

        countryScreen.style.display = "flex";

        document.body.classList.add("country-lock");

    }

}


/* =========================================================
   SELECT COUNTRY
========================================================= */

function selectCountry(countryCode) {

    if (!countries[countryCode]) {
        return;
    }

    selectedCountry = countryCode;

    localStorage.setItem(
        "footworldCountry",
        countryCode
    );

    hideCountryScreen();

    updateCountryDisplay();

    updateCart();

}


/* =========================================================
   SUPPORT OLD COUNTRY FUNCTION
========================================================= */

function selectShoppingCountry(countryCode) {

    selectCountry(countryCode);

}


/* =========================================================
   HIDE COUNTRY SCREEN
========================================================= */

function hideCountryScreen() {

    const selector =
        document.getElementById("countrySelector");

    const gate =
        document.getElementById("countryGate");


    if (selector) {

        selector.classList.remove("active");

        selector.style.display = "none";

    }


    if (gate) {

        gate.classList.remove("active");

        gate.style.display = "none";

    }


    document.body.classList.remove("country-lock");

}


/* =========================================================
   CHANGE COUNTRY
========================================================= */

function changeCountry() {

    const selector =
        document.getElementById("countrySelector");

    const gate =
        document.getElementById("countryGate");

    const screen =
        selector || gate;


    if (!screen) {
        return;
    }


    screen.style.display = "flex";

    screen.classList.add("active");

    document.body.classList.add("country-lock");

}


/* =========================================================
   UPDATE COUNTRY DISPLAY
========================================================= */

function updateCountryDisplay() {

    if (!selectedCountry) {
        return;
    }


    const country =
        countries[selectedCountry];


    if (!country) {
        return;
    }


    const flag =
        document.getElementById("headerCountryFlag");

    const name =
        document.getElementById("headerCountryName");


    if (flag) {
        flag.textContent = country.flag;
    }


    if (name) {
        name.textContent = country.name;
    }


    const checkoutCountry =
        document.getElementById("customerCountry");


    if (checkoutCountry) {

        checkoutCountry.value =
            selectedCountry;

    }


    updateCurrencyNotice();

}


/* =========================================================
   CURRENCY
========================================================= */

function formatPrice(price) {

    if (!selectedCountry) {
        return "₹" + price;
    }


    const country =
        countries[selectedCountry];


    return country.currency +
        price.toFixed(2);

}


/*
   Prices are stored in a common base value
   for the demo storefront.

   Later we can connect real country pricing.
*/


function updateCurrencyNotice() {

    const notice =
        document.getElementById("currencyNotice");


    if (!notice || !selectedCountry) {
        return;
    }


    const country =
        countries[selectedCountry];


    notice.textContent =
        "Prices shown in " +
        country.currencyName;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const grid =
        document.getElementById("productGrid");


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    products.forEach(function (product) {

        grid.appendChild(
            createProductCard(product)
        );

    });

}


/* =========================================================
   RENDER NEW PRODUCTS
========================================================= */

function renderNewProducts() {

    const grid =
        document.getElementById("newProducts");


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    newProducts.forEach(function (product) {

        grid.appendChild(
            createProductCard(product)
        );

    });

}


/* =========================================================
   CREATE PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const card =
        document.createElement("div");


    card.className =
        "product-card";


    card.innerHTML = `

        <img
            class="product-image"
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
        >

        <div class="product-info">

            <div class="product-category">
                ${product.category}
            </div>

            <div class="product-name">
                ${product.name}
            </div>

            <div class="product-price">
                ${formatPrice(product.price)}
            </div>

            <button
                class="product-action"
                type="button"
            >
                VIEW PRODUCT
            </button>

        </div>

    `;


    card.addEventListener(
        "click",
        function () {

            openProductModal(product);

        }
    );


    return card;

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProductModal(product) {

    selectedProduct = product;

    selectedSize = null;

    modalQuantity = 1;


    const modal =
        document.getElementById("productModal");


    if (!modal) {
        return;
    }


    const image =
        document.getElementById(
            "modalProductImage"
        );

    const category =
        document.getElementById(
            "modalProductCategory"
        );

    const name =
        document.getElementById(
            "modalProductName"
        );

    const price =
        document.getElementById(
            "modalProductPrice"
        );

    const quantity =
        document.getElementById(
            "modalQuantity"
        );


    if (image) {

        image.src =
            product.image;

        image.alt =
            product.name;

    }


    if (category) {
        category.textContent =
            product.category;
    }


    if (name) {
        name.textContent =
            product.name;
    }


    if (price) {
        price.textContent =
            formatPrice(product.price);
    }


    if (quantity) {
        quantity.textContent = "1";
    }


    renderSizeOptions(product);


    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   SIZE OPTIONS
========================================================= */

function renderSizeOptions(product) {

    const container =
        document.getElementById(
            "sizeOptions"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    product.sizes.forEach(function (size) {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "size-option";


        button.textContent =
            size;


        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                selectSize(
                    size,
                    button
                );

            }
        );


        container.appendChild(button);

    });

}


/* =========================================================
   SELECT SIZE
========================================================= */

function selectSize(size, button) {

    selectedSize = size;


    document
        .querySelectorAll(".size-option")
        .forEach(function (item) {

            item.classList.remove(
                "selected"
            );

        });


    button.classList.add("selected");

}


/* =========================================================
   MODAL QUANTITY
========================================================= */

function changeModalQuantity(change) {

    modalQuantity += change;


    if (modalQuantity < 1) {
        modalQuantity = 1;
    }


    if (modalQuantity > 20) {
        modalQuantity = 20;
    }


    const quantity =
        document.getElementById(
            "modalQuantity"
        );


    if (quantity) {

        quantity.textContent =
            modalQuantity;

    }

}


/* =========================================================
   ADD PRODUCT TO CART
========================================================= */

function addSelectedProductToCart() {

    if (!selectedProduct) {
        return;
    }


    if (!selectedSize) {

        alert(
            "Please select a shoe size."
        );

        return;

    }


    const existingItem =
        cart.find(function (item) {

            return (
                item.id === selectedProduct.id &&
                item.size === selectedSize
            );

        });


    if (existingItem) {

        existingItem.quantity +=
            modalQuantity;

    } else {

        cart.push({

            id: selectedProduct.id,

            name: selectedProduct.name,

            category: selectedProduct.category,

            price: selectedProduct.price,

            image: selectedProduct.image,

            size: selectedSize,

            quantity: modalQuantity

        });

    }


    saveCart();

    updateCart();

    closeProductModal();

    openCart();

}


/* =========================================================
   CLOSE PRODUCT MODAL
========================================================= */

function closeProductModal() {

    const modal =
        document.getElementById(
            "productModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    document.body.style.overflow = "";

}


/* =========================================================
   CART
========================================================= */

function openCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (!overlay) {
        return;
    }


    overlay.classList.add("active");

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const count =
        document.getElementById(
            "cartCount"
        );

    const total =
        document.getElementById(
            "cartTotal"
        );


    const totalQuantity =
        cart.reduce(
            function (sum, item) {

                return sum + item.quantity;

            },
            0
        );


    const totalPrice =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    item.price *
                    item.quantity
                );

            },
            0
        );


    if (count) {

        count.textContent =
            totalQuantity;

    }


    if (total) {

        total.textContent =
            formatPrice(totalPrice);

    }


    if (!container) {
        return;
    }


    if (cart.length === 0) {

        container.innerHTML = `

            <p class="empty-cart">
                Your bag is empty.
            </p>

        `;

        return;

    }


    container.innerHTML = "";


    cart.forEach(
        function (item, index) {

            const element =
                document.createElement("div");


            element.className =
                "cart-item";


            element.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Size: ${item.size}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <p>
                        ${formatPrice(
                            item.price *
                            item.quantity
                        )}
                    </p>

                </div>

                <button
                    class="remove-item"
                    type="button"
                >
                    REMOVE
                </button>

            `;


            const removeButton =
                element.querySelector(
                    ".remove-item"
                );


            removeButton.addEventListener(
                "click",
                function () {

                    removeCartItem(index);

                }
            );


            container.appendChild(element);

        }
    );

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeCartItem(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {
        return;
    }


    cart.splice(index, 1);


    saveCart();

    updateCart();

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "footworldCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty."
        );

        return;

    }


    closeCart();


    const overlay =
        document.getElementById(
            "checkoutOverlay"
        );


    if (!overlay) {
        return;
    }


    updateCheckoutTotal();

    updatePaymentMethods();

    updateCountryDisplay();


    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE CHECKOUT
========================================================= */

function closeCheckout() {

    const overlay =
        document.getElementById(
            "checkoutOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }


    document.body.style.overflow = "";

}


/* =========================================================
   CHECKOUT TOTAL
========================================================= */

function updateCheckoutTotal() {

    const total =
        document.getElementById(
            "checkoutTotal"
        );


    if (!total) {
        return;
    }


    const totalPrice =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    item.price *
                    item.quantity
                );

            },
            0
        );


    total.textContent =
        formatPrice(totalPrice);

}


/* =========================================================
   PAYMENT METHODS
========================================================= */

function updatePaymentMethods() {

    const india =
        document.getElementById(
            "indiaPayments"
        );

    const canada =
        document.getElementById(
            "canadaPayments"
        );

    const international =
        document.getElementById(
            "internationalPayments"
        );


    if (india) {
        india.style.display = "none";
    }

    if (canada) {
        canada.style.display = "none";
    }

    if (international) {
        international.style.display = "none";
    }


    if (selectedCountry === "IN") {

        if (india) {
            india.style.display = "block";
        }

    }

    else if (selectedCountry === "CA") {

        if (canada) {
            canada.style.display = "block";
        }

    }

    else {

        if (international) {
            international.style.display = "block";
        }

    }

}


/* =========================================================
   COUNTRY CHANGE IN CHECKOUT
========================================================= */

function countryChanged() {

    const select =
        document.getElementById(
            "customerCountry"
        );


    if (!select) {
        return;
    }


    const countryCode =
        select.value;


    selectCountry(
        countryCode
    );


    updatePaymentMethods();

    updateCheckoutTotal();

}


/* =========================================================
   PLACE ORDER
========================================================= */

function placeOrder() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty."
        );

        return;

    }


    const name =
        document.getElementById(
            "customerName"
        )?.value.trim();


    const email =
        document.getElementById(
            "customerEmail"
        )?.value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        )?.value.trim();


    const address =
        document.getElementById(
            "customerAddress"
        )?.value.trim();


    const city =
        document.getElementById(
            "customerCity"
        )?.value.trim();


    const state =
        document.getElementById(
            "customerState"
        )?.value.trim();


    const pin =
        document.getElementById(
            "customerPin"
        )?.value.trim();


    const payment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !pin
    ) {

        alert(
            "Please complete all required customer details."
        );

        return;

    }


    if (!payment) {

        alert(
            "Please select a payment method."
        );

        return;

    }


    const total =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    item.price *
                    item.quantity
                );

            },
            0
        );


    const country =
        countries[selectedCountry];


    let message =
        "FOOTWORLD ORDER\n\n";


    message +=
        "CUSTOMER DETAILS\n";

    message +=
        "Name: " + name + "\n";

    message +=
        "Email: " + email + "\n";

    message +=
        "Phone: " + phone + "\n";

    message +=
        "Country: " +
        country.name +
        "\n";

    message +=
        "Address: " +
        address +
        "\n";

    message +=
        "City: " +
        city +
        "\n";

    message +=
        "State: " +
        state +
        "\n";

    message +=
        "Postal Code: " +
        pin +
        "\n\n";


    message +=
        "ORDER\n";


    cart.forEach(
        function (item) {

            message +=
                item.name +
                " | Size " +
                item.size +
                " | Qty " +
                item.quantity +
                " | " +
                formatPrice(
                    item.price *
                    item.quantity
                ) +
                "\n";

        }
    );


    message +=
        "\nTOTAL: " +
        formatPrice(total) +
        "\n";


    message +=
        "Payment: " +
        payment.value;


    /*
       Replace this number with
       FOOTWORLD WhatsApp number.
    */

    const whatsappNumber =
        "YOUR_WHATSAPP_NUMBER";


    if (
        whatsappNumber ===
        "YOUR_WHATSAPP_NUMBER"
    ) {

        alert(
            "Your order is ready. Add your FOOTWORLD WhatsApp number inside script.js to activate WhatsApp ordering."
        );

        return;

    }


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================================
   KEYBOARD / BACKDROP CONTROLS
========================================================= */

function setupKeyboardControls() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeProductModal();

                closeCart();

                closeCheckout();

            }

        }
    );


    const cartOverlay =
        document.getElementById(
            "cartOverlay"
        );


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    cartOverlay
                ) {

                    closeCart();

                }

            }
        );

    }


    const productModal =
        document.getElementById(
            "productModal"
        );


    if (productModal) {

        productModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    productModal
                ) {

                    closeProductModal();

                }

            }
        );

    }


    const checkoutOverlay =
        document.getElementById(
            "checkoutOverlay"
        );


    if (checkoutOverlay) {

        checkoutOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    checkoutOverlay
                ) {

                    closeCheckout();

                }

            }
        );

    }

}


/* =========================================================
   PREVENT CART BUTTON FROM OPENING PRODUCT MODAL
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const cartButton =
            event.target.closest(
                ".cart-button"
            );


        if (cartButton) {

            event.stopPropagation();

        }

    },
    true
);


/* =========================================================
   END
========================================================= */
