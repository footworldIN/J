/* =====================================================
   FOOTWORLD
   COUNTRY + CURRENCY + PRODUCTS + CART + CHECKOUT
===================================================== */


/* =====================================================
   WHATSAPP
===================================================== */

const WHATSAPP_NUMBER = "913653244745";


/* =====================================================
   COUNTRY SETTINGS
===================================================== */

const countrySettings = {

    IN: {
        name: "India",
        flag: "🇮🇳",
        currency: "INR",
        symbol: "₹"
    },

    CA: {
        name: "Canada",
        flag: "🇨🇦",
        currency: "CAD",
        symbol: "CA$"
    },

    US: {
        name: "United States",
        flag: "🇺🇸",
        currency: "USD",
        symbol: "US$"
    },

    GB: {
        name: "United Kingdom",
        flag: "🇬🇧",
        currency: "GBP",
        symbol: "£"
    },

    AU: {
        name: "Australia",
        flag: "🇦🇺",
        currency: "AUD",
        symbol: "A$"
    },

    DE: {
        name: "Germany",
        flag: "🇩🇪",
        currency: "EUR",
        symbol: "€"
    }

};


let selectedCountry = "IN";


/* =====================================================
   PRODUCTS
===================================================== */

const products = [

    {
        id: 1,
        name: "Classic Black Oxford",
        category: "Men",
        type: "Formal Shoes",

        prices: {
            IN: 1499,
            CA: 59.99,
            US: 44.99,
            GB: 34.99,
            AU: 69.99,
            DE: 39.99
        },

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=1000&q=90"
    },


    {
        id: 2,
        name: "Executive Leather Loafer",
        category: "Men",
        type: "Loafers",

        prices: {
            IN: 1699,
            CA: 64.99,
            US: 49.99,
            GB: 39.99,
            AU: 74.99,
            DE: 44.99
        },

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=90"
    },


    {
        id: 3,
        name: "Premium Brown Derby",
        category: "Men",
        type: "Formal Shoes",

        prices: {
            IN: 1799,
            CA: 69.99,
            US: 54.99,
            GB: 42.99,
            AU: 79.99,
            DE: 49.99
        },

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=90"
    },


    {
        id: 4,
        name: "Classic Black Loafer",
        category: "Men",
        type: "Loafers",

        prices: {
            IN: 1399,
            CA: 54.99,
            US: 39.99,
            GB: 32.99,
            AU: 64.99,
            DE: 39.99
        },

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=1000&q=90"
    },


    {
        id: 5,
        name: "Boys Formal Classic",
        category: "Boys",
        type: "Formal Shoes",

        prices: {
            IN: 999,
            CA: 39.99,
            US: 29.99,
            GB: 24.99,
            AU: 44.99,
            DE: 29.99
        },

        sizes: [10, 11, 12, 13, 1, 2, 3, 4, 5],

        image:
            "https://images.unsplash.com/photo-1528569937393-ee892b976859?auto=format&fit=crop&w=1000&q=90"
    },


    {
        id: 6,
        name: "Boys Premium Loafer",
        category: "Boys",
        type: "Loafers",

        prices: {
            IN: 1099,
            CA: 42.99,
            US: 32.99,
            GB: 26.99,
            AU: 49.99,
            DE: 32.99
        },

        sizes: [10, 11, 12, 13, 1, 2, 3, 4, 5],

        image:
            "https://images.unsplash.com/photo-1528569937393-ee892b976859?auto=format&fit=crop&w=1000&q=90"
    }

];


let cart = [];

let selectedProduct = null;

let selectedSize = null;

let modalQuantity = 1;


/* =====================================================
   COUNTRY SELECTION
===================================================== */

function selectCountry(country) {

    if (!countrySettings[country]) {
        return;
    }

    selectedCountry = country;

    localStorage.setItem(
        "footworldCountry",
        country
    );

    hideCountryGate();

    updateCountryUI();

    loadProducts();

    updateCart();

    updateCheckoutTotal();

    updateCurrencyNotice();

    updatePaymentMethods();

}


function hideCountryGate() {

    const gate =
        document.getElementById("countryGate");

    if (gate) {

        gate.classList.add("hidden");

    }

}


function showCountryGate() {

    const gate =
        document.getElementById("countryGate");

    if (gate) {

        gate.classList.remove("hidden");

    }

}


function initializeCountry() {

    const savedCountry =
        localStorage.getItem(
            "footworldCountry"
        );


    if (
        savedCountry &&
        countrySettings[savedCountry]
    ) {

        selectedCountry = savedCountry;

        hideCountryGate();

    } else {

        showCountryGate();

    }

    updateCountryUI();

}


function changeCountry() {

    showCountryGate();

}


function updateCountryUI() {

    const settings =
        countrySettings[selectedCountry];


    const flag =
        document.getElementById(
            "headerCountryFlag"
        );

    const name =
        document.getElementById(
            "headerCountryName"
        );


    if (flag) {

        flag.textContent =
            settings.flag;

    }


    if (name) {

        name.textContent =
            settings.name;

    }


    const select =
        document.getElementById(
            "customerCountry"
        );


    if (select) {

        select.value =
            selectedCountry;

    }

}


/* =====================================================
   PRICE
===================================================== */

function getProductPrice(product) {

    if (
        product.prices &&
        product.prices[selectedCountry] !== undefined
    ) {

        return product.prices[selectedCountry];

    }

    return product.prices.IN;

}


function formatPrice(amount) {

    const settings =
        countrySettings[selectedCountry];


    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: settings.currency
        }
    ).format(amount);

}


/* =====================================================
   LOAD PRODUCTS
===================================================== */

function loadProducts() {

    const productGrid =
        document.getElementById(
            "productGrid"
        );

    const newProducts =
        document.getElementById(
            "newProducts"
        );


    if (productGrid) {

        productGrid.innerHTML = "";

        products.forEach(product => {

            productGrid.innerHTML +=
                createProductCard(product);

        });

    }


    if (newProducts) {

        newProducts.innerHTML = "";

        products
            .slice(0, 4)
            .forEach(product => {

                newProducts.innerHTML +=
                    createProductCard(product);

            });

    }

}


function createProductCard(product) {

    return `

        <article class="product-card">

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy">

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                    ·
                    ${product.type}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-price">
                    ${formatPrice(
                        getProductPrice(product)
                    )}
                </div>

                <button
                    class="product-action"
                    onclick="openProductModal(${product.id})">

                    VIEW PRODUCT

                </button>

            </div>

        </article>

    `;

}


/* =====================================================
   PRODUCT MODAL
===================================================== */

function openProductModal(productId) {

    const product =
        products.find(
            p => p.id === productId
        );


    if (!product) {
        return;
    }


    selectedProduct = product;

    selectedSize = null;

    modalQuantity = 1;


    const image =
        document.getElementById(
            "modalProductImage"
        );

    const name =
        document.getElementById(
            "modalProductName"
        );

    const category =
        document.getElementById(
            "modalProductCategory"
        );

    const price =
        document.getElementById(
            "modalProductPrice"
        );

    const quantity =
        document.getElementById(
            "modalQuantity"
        );


    image.src =
        product.image;

    image.alt =
        product.name;

    name.textContent =
        product.name;

    category.textContent =
        `${product.category} · ${product.type}`;

    price.textContent =
        formatPrice(
            getProductPrice(product)
        );

    quantity.textContent =
        modalQuantity;


    loadSizes(product);


    document
        .getElementById("productModal")
        .classList.add("active");

}


function closeProductModal() {

    document
        .getElementById("productModal")
        .classList.remove("active");

}


function loadSizes(product) {

    const container =
        document.getElementById(
            "sizeOptions"
        );


    container.innerHTML = "";


    product.sizes.forEach(size => {

        const button =
            document.createElement(
                "button"
            );


        button.type = "button";

        button.className =
            "size-option";

        button.textContent =
            size;


        button.onclick =
            function () {

                selectSize(
                    size,
                    button
                );

            };


        container.appendChild(
            button
        );

    });

}


function selectSize(size, button) {

    selectedSize = size;


    document
        .querySelectorAll(
            ".size-option"
        )
        .forEach(option => {

            option.classList.remove(
                "selected"
            );

        });


    button.classList.add(
        "selected"
    );

}


function changeModalQuantity(amount) {

    modalQuantity += amount;


    if (modalQuantity < 1) {
        modalQuantity = 1;
    }


    if (modalQuantity > 10) {
        modalQuantity = 10;
    }


    document
        .getElementById(
            "modalQuantity"
        )
        .textContent =
            modalQuantity;

}


/* =====================================================
   CART
===================================================== */

function addSelectedProductToCart() {

    if (!selectedProduct) {
        return;
    }


    if (!selectedSize) {

        alert(
            "Please select a size before adding the product."
        );

        return;

    }


    const existing =
        cart.find(
            item =>
                item.id === selectedProduct.id &&
                item.size === selectedSize
        );


    if (existing) {

        existing.quantity +=
            modalQuantity;

    } else {

        cart.push({

            id:
                selectedProduct.id,

            name:
                selectedProduct.name,

            category:
                selectedProduct.category,

            type:
                selectedProduct.type,

            prices:
                selectedProduct.prices,

            size:
                selectedSize,

            quantity:
                modalQuantity,

            image:
                selectedProduct.image

        });

    }


    updateCart();

    closeProductModal();

    openCart();

}


function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            const price =
                item.prices[selectedCountry] !== undefined
                    ? item.prices[selectedCountry]
                    : item.prices.IN;

            return total +
                price *
                item.quantity;

        },
        0
    );

}


function updateCart() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    const totalQuantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your bag is empty.
            </p>

        `;

        cartTotal.textContent =
            formatPrice(0);

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach(
        (item, index) => {

            const price =
                item.prices[selectedCountry] !== undefined
                    ? item.prices[selectedCountry]
                    : item.prices.IN;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}">

                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            Size: ${item.size}
                        </p>

                        <p>
                            Qty: ${item.quantity}
                        </p>

                        <p>
                            ${formatPrice(
                                price *
                                item.quantity
                            )}
                        </p>

                    </div>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})">

                        REMOVE

                    </button>

                </div>

            `;

        }
    );


    cartTotal.textContent =
        formatPrice(
            getCartTotal()
        );

}


function removeFromCart(index) {

    cart.splice(
        index,
        1
    );

    updateCart();

}


function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* =====================================================
   COUNTRY CHANGE FROM CHECKOUT
===================================================== */

function countryChanged() {

    const select =
        document.getElementById(
            "customerCountry"
        );


    if (!select) {
        return;
    }


    selectCountry(
        select.value
    );

}


/* =====================================================
   PAYMENT
===================================================== */

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


    if (!india || !canada || !international) {
        return;
    }


    india.style.display =
        "none";

    canada.style.display =
        "none";

    international.style.display =
        "none";


    if (selectedCountry === "IN") {

        india.style.display =
            "block";

    }

    else if (selectedCountry === "CA") {

        canada.style.display =
            "block";

    }

    else {

        international.style.display =
            "block";

    }


    document
        .querySelectorAll(
            'input[name="paymentMethod"]'
        )
        .forEach(input => {

            input.checked = false;

        });

}


/* =====================================================
   CHECKOUT
===================================================== */

function updateCheckoutTotal() {

    const element =
        document.getElementById(
            "checkoutTotal"
        );


    if (element) {

        element.textContent =
            formatPrice(
                getCartTotal()
            );

    }

}


function updateCurrencyNotice() {

    const notice =
        document.getElementById(
            "currencyNotice"
        );


    if (!notice) {
        return;
    }


    const settings =
        countrySettings[selectedCountry];


    notice.textContent =
        `Prices shown in ${settings.name} (${settings.currency})`;

}


function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty."
        );

        return;

    }


    updateCheckoutTotal();

    updateCurrencyNotice();

    updatePaymentMethods();


    document
        .getElementById(
            "checkoutOverlay"
        )
        .classList.add(
            "active"
        );


    closeCart();

}


function closeCheckout() {

    document
        .getElementById(
            "checkoutOverlay"
        )
        .classList.remove(
            "active"
        );

}


/* =====================================================
   PLACE ORDER
===================================================== */

function placeOrder() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const email =
        document.getElementById(
            "customerEmail"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    const address =
        document.getElementById(
            "customerAddress"
        ).value.trim();


    const city =
        document.getElementById(
            "customerCity"
        ).value.trim();


    const state =
        document.getElementById(
            "customerState"
        ).value.trim();


    const pin =
        document.getElementById(
            "customerPin"
        ).value.trim();


    const landmark =
        document.getElementById(
            "customerLandmark"
        ).value.trim();


    const payment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (!name) {

        alert(
            "Please enter your full name."
        );

        return;

    }


    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        )
    ) {

        alert(
            "Please enter a valid email address."
        );

        return;

    }


    if (!phone) {

        alert(
            "Please enter your mobile number."
        );

        return;

    }


    if (!address) {

        alert(
            "Please enter your delivery address."
        );

        return;

    }


    if (!city) {

        alert(
            "Please enter your city."
        );

        return;

    }


    if (!state) {

        alert(
            "Please enter your state / province."
        );

        return;

    }


    if (!pin) {

        alert(
            "Please enter your postal / PIN code."
        );

        return;

    }


    if (!payment) {

        alert(
            "Please select a payment method."
        );

        return;

    }


    if (cart.length === 0) {

        alert(
            "Your bag is empty."
        );

        return;

    }


    const orderNumber =
        "FW" +
        Date.now()
            .toString()
            .slice(-8);


    const total =
        getCartTotal();


    const settings =
        countrySettings[
            selectedCountry
        ];


    let message = "";

    message +=
        "*FOOTWORLD ORDER*%0A%0A";

    message +=
        `Order No: ${orderNumber}%0A`;

    message +=
        `Country: ${encodeURIComponent(
            settings.name
        )}%0A`;

    message +=
        `Currency: ${encodeURIComponent(
            settings.currency
        )}%0A%0A`;


    message +=
        "*CUSTOMER DETAILS*%0A";

    message +=
        `Name: ${encodeURIComponent(
            name
        )}%0A`;

    message +=
        `Email: ${encodeURIComponent(
            email
        )}%0A`;

    message +=
        `Mobile: ${encodeURIComponent(
            phone
        )}%0A%0A`;


    message +=
        "*DELIVERY ADDRESS*%0A";

    message +=
        `${encodeURIComponent(
            address
        )}%0A`;

    message +=
        `${encodeURIComponent(
            city
        )}, ${encodeURIComponent(
            state
        )} - ${encodeURIComponent(
            pin
        )}%0A`;


    if (landmark) {

        message +=
            `Landmark: ${encodeURIComponent(
                landmark
            )}%0A`;

    }


    message +=
        "%0A*ORDER DETAILS*%0A";


    cart.forEach(item => {

        const price =
            item.prices[selectedCountry] !== undefined
                ? item.prices[selectedCountry]
                : item.prices.IN;


        message +=
            `%0A${encodeURIComponent(
                item.name
            )}%0A`;

        message +=
            `Size: ${encodeURIComponent(
                item.size
            )}%0A`;

        message +=
            `Quantity: ${item.quantity}%0A`;

        message +=
            `Price: ${encodeURIComponent(
                formatPrice(price)
            )}%0A`;

    });


    message +=
        `%0A*TOTAL: ${encodeURIComponent(
            formatPrice(total)
        )}*%0A`;


    message +=
        `Payment: ${encodeURIComponent(
            payment.value
        )}%0A%0A`;


    message +=
        "Please confirm my FOOTWORLD order.";


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCountry();

        loadProducts();

        updateCart();

        updateCountryUI();

        updateCurrencyNotice();

        updatePaymentMethods();

    }
);
