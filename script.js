/* =========================================
   FOOTWORLD
   PRODUCT + CART + COUNTRY PRICING
   CHECKOUT + WHATSAPP
========================================= */


/* =========================================
   WHATSAPP NUMBER
========================================= */

const WHATSAPP_NUMBER = "913653244745";

/* =========================================
   COUNTRY GATE
========================================= */

function selectCountry(country) {

    selectedCountry = country;

    localStorage.setItem(
        "footworldCountry",
        country
    );

    const countryGate =
        document.getElementById("countryGate");

    if (countryGate) {

        countryGate.style.display = "none";

    }

    loadProducts();

    updateCart();

    updateCheckoutTotal();

    updateCurrencyNotice();

    updatePaymentMethods();

}


/* =========================================
   CHECK SAVED COUNTRY
========================================= */

function initializeCountry() {

    const savedCountry =
        localStorage.getItem(
            "footworldCountry"
        );


    if (savedCountry &&
        countrySettings[savedCountry]) {

        selectedCountry = savedCountry;

        const countryGate =
            document.getElementById(
                "countryGate"
            );

        if (countryGate) {

            countryGate.style.display =
                "none";

        }

    }

}
/* =========================================
   COUNTRY / CURRENCY SETTINGS
========================================= */

const countrySettings = {

    IN: {
        currency: "INR",
        symbol: "₹",
        name: "Indian Rupee"
    },

    CA: {
        currency: "CAD",
        symbol: "CA$",
        name: "Canadian Dollar"
    },

    US: {
        currency: "USD",
        symbol: "US$",
        name: "US Dollar"
    },

    GB: {
        currency: "GBP",
        symbol: "£",
        name: "British Pound"
    },

    AU: {
        currency: "AUD",
        symbol: "A$",
        name: "Australian Dollar"
    },

    DE: {
        currency: "EUR",
        symbol: "€",
        name: "Euro"
    },

    FR: {
        currency: "EUR",
        symbol: "€",
        name: "Euro"
    },

    IT: {
        currency: "EUR",
        symbol: "€",
        name: "Euro"
    },

    ES: {
        currency: "EUR",
        symbol: "€",
        name: "Euro"
    },

    NL: {
        currency: "EUR",
        symbol: "€",
        name: "Euro"
    }

};


let selectedCountry =
    localStorage.getItem("footworldCountry") || "IN";


/* =========================================
   PRODUCTS
========================================= */

const products = [

    {
        id: 1,

        name: "Classic Black Oxford",

        category: "Men",

        type: "Formal Shoes",

        prices: {

            IN: 1499,
            CA: 39.99,
            US: 29.99,
            GB: 24.99,
            AU: 49.99,
            DE: 29.99,
            FR: 29.99,
            IT: 29.99,
            ES: 29.99,
            NL: 29.99

        },

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 2,

        name: "Executive Leather Loafer",

        category: "Men",

        type: "Loafers",

        prices: {

            IN: 1699,
            CA: 44.99,
            US: 34.99,
            GB: 27.99,
            AU: 54.99,
            DE: 34.99,
            FR: 34.99,
            IT: 34.99,
            ES: 34.99,
            NL: 34.99

        },

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 3,

        name: "Premium Brown Derby",

        category: "Men",

        type: "Formal Shoes",

        prices: {

            IN: 1799,
            CA: 49.99,
            US: 39.99,
            GB: 31.99,
            AU: 59.99,
            DE: 39.99,
            FR: 39.99,
            IT: 39.99,
            ES: 39.99,
            NL: 39.99

        },

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 4,

        name: "Classic Black Loafer",

        category: "Men",

        type: "Loafers",

        prices: {

            IN: 1399,
            CA: 39.99,
            US: 29.99,
            GB: 24.99,
            AU: 49.99,
            DE: 29.99,
            FR: 29.99,
            IT: 29.99,
            ES: 29.99,
            NL: 29.99

        },

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 5,

        name: "Boys Formal Classic",

        category: "Boys",

        type: "Formal Shoes",

        prices: {

            IN: 999,
            CA: 29.99,
            US: 22.99,
            GB: 18.99,
            AU: 34.99,
            DE: 22.99,
            FR: 22.99,
            IT: 22.99,
            ES: 22.99,
            NL: 22.99

        },

        sizes: [10, 11, 12, 13, 1, 2, 3, 4, 5],

        image:
            "https://images.unsplash.com/photo-1528569937393-ee892b976859?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 6,

        name: "Boys Premium Loafer",

        category: "Boys",

        type: "Loafers",

        prices: {

            IN: 1099,
            CA: 32.99,
            US: 24.99,
            GB: 19.99,
            AU: 39.99,
            DE: 24.99,
            FR: 24.99,
            IT: 24.99,
            ES: 24.99,
            NL: 24.99

        },

        sizes: [10, 11, 12, 13, 1, 2, 3, 4, 5],

        image:
            "https://images.unsplash.com/photo-1528569937393-ee892b976859?auto=format&fit=crop&w=900&q=85"

    }

];


/* =========================================
   CART
========================================= */

let cart = [];

let selectedProduct = null;

let selectedSize = null;

let modalQuantity = 1;


/* =========================================
   GET COUNTRY PRICE
========================================= */

function getProductPrice(product) {

    if (
        product.prices &&
        product.prices[selectedCountry] !== undefined
    ) {

        return product.prices[selectedCountry];

    }

    return product.prices.IN;

}


/* =========================================
   FORMAT PRICE
========================================= */

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


/* =========================================
   LOAD PRODUCTS
========================================= */

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


/* =========================================
   PRODUCT CARD
========================================= */

function createProductCard(product) {

    return `

        <article class="product-card">

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

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
                    onclick="openProductModal(${product.id})"
                >

                    VIEW PRODUCT

                </button>

            </div>

        </article>

    `;

}


/* =========================================
   OPEN PRODUCT
========================================= */

function openProductModal(productId) {

    const product =
        products.find(
            p => p.id === productId
        );


    if (!product) return;


    selectedProduct = product;

    selectedSize = null;

    modalQuantity = 1;


    const image =
        document.getElementById(
            "modalProductImage"
        );

    if (image) {

        image.src = product.image;

        image.alt = product.name;

    }


    const name =
        document.getElementById(
            "modalProductName"
        );

    if (name) {

        name.textContent =
            product.name;

    }


    const category =
        document.getElementById(
            "modalProductCategory"
        );

    if (category) {

        category.textContent =
            `${product.category} · ${product.type}`;

    }


    const price =
        document.getElementById(
            "modalProductPrice"
        );

    if (price) {

        price.textContent =
            formatPrice(
                getProductPrice(product)
            );

    }


    const quantity =
        document.getElementById(
            "modalQuantity"
        );

    if (quantity) {

        quantity.textContent =
            modalQuantity;

    }


    loadSizes(product);


    const modal =
        document.getElementById(
            "productModal"
        );

    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


/* =========================================
   CLOSE PRODUCT
========================================= */

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

}


/* =========================================
   LOAD SIZES
========================================= */

function loadSizes(product) {

    const container =
        document.getElementById(
            "sizeOptions"
        );


    if (!container) return;


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


/* =========================================
   SELECT SIZE
========================================= */

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


    if (button) {

        button.classList.add(
            "selected"
        );

    }

}


/* =========================================
   QUANTITY
========================================= */

function changeModalQuantity(amount) {

    modalQuantity += amount;


    if (modalQuantity < 1) {

        modalQuantity = 1;

    }


    if (modalQuantity > 10) {

        modalQuantity = 10;

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


/* =========================================
   ADD TO CART
========================================= */

function addSelectedProductToCart() {

    if (!selectedProduct) return;


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


/* =========================================
   CART TOTAL
========================================= */

function getCartTotal() {

    let total = 0;


    cart.forEach(item => {

        const price =
            item.prices &&
            item.prices[selectedCountry] !== undefined

                ? item.prices[selectedCountry]

                : item.prices.IN;


        total +=
            price *
            item.quantity;

    });


    return total;

}


/* =========================================
   UPDATE CART
========================================= */

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


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    if (!cartItems) return;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your bag is empty.

            </p>

        `;


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(0);

        }

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach(
        (item, index) => {

            const price =
                item.prices &&
                item.prices[selectedCountry] !== undefined

                    ? item.prices[selectedCountry]

                    : item.prices.IN;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div
                        class="cart-item-info"
                    >

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
                        onclick="removeFromCart(${index})"
                    >

                        REMOVE

                    </button>

                </div>

            `;

        }
    );


    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(
                getCartTotal()
            );

    }

}


/* =========================================
   REMOVE CART ITEM
========================================= */

function removeFromCart(index) {

    cart.splice(
        index,
        1
    );

    updateCart();

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    const cartOverlay =
        document.getElementById(
            "cartOverlay"
        );

    if (cartOverlay) {

        cartOverlay.classList.add(
            "active"
        );

    }

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    const cartOverlay =
        document.getElementById(
            "cartOverlay"
        );

    if (cartOverlay) {

        cartOverlay.classList.remove(
            "active"
        );

    }

}


/* =========================================
   COUNTRY CHANGED
========================================= */

function countryChanged() {

    const countrySelect =
        document.getElementById("customerCountry");

    if (!countrySelect) return;

    selectedCountry =
        countrySelect.value;

    localStorage.setItem(
        "footworldCountry",
        selectedCountry
    );

    loadProducts();

    updateCart();

    updateCheckoutTotal();

    updateCurrencyNotice();

    updatePaymentMethods();

}
/* =========================================
   SHOPPING COUNTRY SELECTOR
========================================= */

function selectShoppingCountry(country) {

    if (!countrySettings[country]) {
        return;
    }

    selectedCountry = country;

    localStorage.setItem(
        "footworldCountry",
        country
    );

    loadProducts();

    updateCart();

    updateCheckoutTotal();

    updateCurrencyNotice();

    updatePaymentMethods();


    /* Update checkout country */

    const countrySelect =
        document.getElementById(
            "customerCountry"
        );

    if (countrySelect) {

        countrySelect.value =
            selectedCountry;

    }


    /* Close country selector */

    const selector =
        document.getElementById(
            "countrySelector"
        );

    if (selector) {

        selector.classList.remove(
            "active"
        );

    }

}
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


    india.style.display = "none";

    canada.style.display = "none";

    international.style.display = "none";


    if (selectedCountry === "IN") {

        india.style.display = "block";

    }

    else if (selectedCountry === "CA") {

        canada.style.display = "block";

    }

    else {

        international.style.display = "block";

    }


    /*
       Clear previous payment selection
       when country changes.
    */

    document
        .querySelectorAll(
            'input[name="paymentMethod"]'
        )
        .forEach(input => {

            input.checked = false;

        });

}
/* =========================================
   CURRENCY NOTICE
========================================= */

function updateCurrencyNotice() {

    const notice =
        document.getElementById(
            "currencyNotice"
        );


    if (!notice) return;


    const settings =
        countrySettings[
            selectedCountry
        ];


    notice.textContent =
        `Prices shown in ${settings.name}`;

}


/* =========================================
   OPEN CHECKOUT
========================================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty."
        );

        return;

    }


    updateCheckoutTotal();

    updateCurrencyNotice();


    const checkoutOverlay =
        document.getElementById(
            "checkoutOverlay"
        );


    if (checkoutOverlay) {

        checkoutOverlay.classList.add(
            "active"
        );

    }


    closeCart();

}


/* =========================================
   CLOSE CHECKOUT
========================================= */

function closeCheckout() {

    const checkoutOverlay =
        document.getElementById(
            "checkoutOverlay"
        );


    if (checkoutOverlay) {

        checkoutOverlay.classList.remove(
            "active"
        );

    }

}


/* =========================================
   CHECKOUT TOTAL
========================================= */

function updateCheckoutTotal() {

    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (!totalElement) return;


    totalElement.textContent =
        formatPrice(
            getCartTotal()
        );

}


/* =========================================
   PLACE ORDER
========================================= */

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
        ).value;


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


    /* -----------------------------
       VALIDATION
    ----------------------------- */

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
            "Please select your state."
        );

        return;

    }


    if (!/^[0-9]{5,6}$/.test(pin)) {

        alert(
            "Please enter a valid postal / PIN code."
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


    /* -----------------------------
       ORDER NUMBER
    ----------------------------- */

    const orderNumber =
        "FW" +
        Date.now()
            .toString()
            .slice(-8);


    /* -----------------------------
       TOTAL
    ----------------------------- */

    const total =
        getCartTotal();


    const settings =
        countrySettings[
            selectedCountry
        ];


    /* -----------------------------
       WHATSAPP MESSAGE
    ----------------------------- */

    let message = "";

    message +=
        "*FOOTWORLD ORDER*%0A%0A";


    message +=
        `Order No: ${orderNumber}%0A`;


    message +=
        `Country: ${encodeURIComponent(
            selectedCountry
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
            item.prices &&
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


    /* -----------------------------
       OPEN WHATSAPP
    ----------------------------- */

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCountry();

        loadProducts();

        updateCart();

        updateCurrencyNotice();

        updatePaymentMethods();

    }
);


        /* Set checkout country */

        const countrySelect =
            document.getElementById(
                "customerCountry"
            );

        if (countrySelect) {

            countrySelect.value =
                selectedCountry;

        }


        /* Show country selector
           only if customer has
           not selected a country */

        const countrySelector =
            document.getElementById(
                "countrySelector"
            );

        const savedCountry =
            localStorage.getItem(
                "footworldCountry"
            );


        if (
            countrySelector &&
            !savedCountry
        ) {

            countrySelector.classList.add(
                "active"
            );

        }

    }
);
