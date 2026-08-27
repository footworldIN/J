/* =========================================================
   FOOTWORLD
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   COUNTRY SETTINGS
========================================================= */

const COUNTRY_SETTINGS = {

    IN: {
        name: "India",
        flag: "🇮🇳",
        currency: "INR",
        locale: "en-IN",
        rate: 61
    },

    CA: {
        name: "Canada",
        flag: "🇨🇦",
        currency: "CAD",
        locale: "en-CA",
        rate: 1
    },

    US: {
        name: "United States",
        flag: "🇺🇸",
        currency: "USD",
        locale: "en-US",
        rate: 0.73
    },

    GB: {
        name: "United Kingdom",
        flag: "🇬🇧",
        currency: "GBP",
        locale: "en-GB",
        rate: 0.54
    },

    AU: {
        name: "Australia",
        flag: "🇦🇺",
        currency: "AUD",
        locale: "en-AU",
        rate: 1.12
    },

    DE: {
        name: "Germany",
        flag: "🇩🇪",
        currency: "EUR",
        locale: "de-DE",
        rate: 0.62
    }

};


/* =========================================================
   PRODUCTS
   BASE PRICE = CAD
========================================================= */

const products = [

    {
        id: 1,

        name: "Classic Black Oxford",

        category: "Formal Shoes",

        price: 129,

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=1200&q=85",

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
        ]
    },


    {
        id: 2,

        name: "Executive Leather Derby",

        category: "Formal Shoes",

        price: 149,

        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1200&q=85",

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
        ]
    },


    {
        id: 3,

        name: "Premium Brown Oxford",

        category: "Formal Shoes",

        price: 159,

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=1200&q=85",

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11"
        ]
    },


    {
        id: 4,

        name: "Black Leather Loafer",

        category: "Loafers",

        price: 139,

        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1200&q=85",

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
        ]
    },


    {
        id: 5,

        name: "Classic Penny Loafer",

        category: "Loafers",

        price: 145,

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=1200&q=85",

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11"
        ]
    },


    {
        id: 6,

        name: "Luxury Burgundy Loafer",

        category: "Loafers",

        price: 169,

        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1200&q=85",

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11"
        ]
    },


    {
        id: 7,

        name: "Formal Cap Toe",

        category: "Formal Shoes",

        price: 155,

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=1200&q=85",

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
        ]
    },


    {
        id: 8,

        name: "Italian Style Loafer",

        category: "Loafers",

        price: 179,

        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1200&q=85",

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11"
        ]
    }

];


/* =========================================================
   STATE
========================================================= */

let selectedCountry =
    localStorage.getItem("footworldCountry");

let cart =
    JSON.parse(
        localStorage.getItem("footworldCart") || "[]"
    );

let selectedProduct = null;

let selectedSize = null;

let modalQuantity = 1;


/* =========================================================
   PRICE
========================================================= */

function getProductPrice(product) {

    const country =
        COUNTRY_SETTINGS[selectedCountry];

    if (!country) {
        return product.price;
    }

    return product.price * country.rate;
}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(amount) {

    const country =
        COUNTRY_SETTINGS[selectedCountry];

    if (!country) {

        return new Intl.NumberFormat(
            "en-CA",
            {
                style: "currency",
                currency: "CAD"
            }
        ).format(amount);

    }

    return new Intl.NumberFormat(
        country.locale,
        {
            style: "currency",
            currency: country.currency,

            minimumFractionDigits: 2,

            maximumFractionDigits: 2
        }
    ).format(amount);

}


/* =========================================================
   COUNTRY SELECTION
========================================================= */

function selectShoppingCountry(countryCode) {

    if (!COUNTRY_SETTINGS[countryCode]) {
        return;
    }

    selectedCountry =
        countryCode;

    localStorage.setItem(
        "footworldCountry",
        countryCode
    );

    updateCountryDisplay();

    updatePaymentMethods();

    renderProducts();

    renderNewProducts();

    renderCart();

    updateCheckoutTotal();

    closeCountrySelector();

}


/* =========================================================
   CLOSE COUNTRY SELECTOR
========================================================= */

function closeCountrySelector() {

    const selector =
        document.getElementById(
            "countrySelector"
        );

    if (!selector) return;

    selector.classList.add("hidden");

}


/* =========================================================
   CHANGE COUNTRY
========================================================= */

function changeCountry() {

    const selector =
        document.getElementById(
            "countrySelector"
        );

    if (!selector) return;

    selector.classList.remove("hidden");

}


/* =========================================================
   COUNTRY DISPLAY
========================================================= */

function updateCountryDisplay() {

    if (!selectedCountry) {
        return;
    }

    const country =
        COUNTRY_SETTINGS[selectedCountry];

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
            country.flag;
    }

    if (name) {
        name.textContent =
            country.name;
    }


    const checkoutCountry =
        document.getElementById(
            "customerCountry"
        );

    if (checkoutCountry) {
        checkoutCountry.value =
            selectedCountry;
    }


    updateCurrencyNotice();

}


/* =========================================================
   CURRENCY NOTICE
========================================================= */

function updateCurrencyNotice() {

    const notice =
        document.getElementById(
            "currencyNotice"
        );

    if (!notice || !selectedCountry) {
        return;
    }

    const country =
        COUNTRY_SETTINGS[selectedCountry];

    notice.textContent =
        `Prices shown in ${country.currency}`;

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
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const price =
        getProductPrice(product);

    return `

        <article
            class="product-card"
            onclick="openProductModal(${product.id})">

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy">

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <div class="product-name">
                    ${product.name}
                </div>

                <div class="product-price">
                    ${formatPrice(price)}
                </div>

                <button
                    type="button"
                    class="product-action"
                    onclick="event.stopPropagation(); openProductModal(${product.id})">

                    VIEW PRODUCT

                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const grid =
        document.getElementById(
            "productGrid"
        );

    if (!grid) return;

    grid.innerHTML =
        products
            .slice(0, 6)
            .map(createProductCard)
            .join("");

}


/* =========================================================
   NEW PRODUCTS
========================================================= */

function renderNewProducts() {

    const grid =
        document.getElementById(
            "newProducts"
        );

    if (!grid) return;

    grid.innerHTML =
        products
            .slice(4, 8)
            .map(createProductCard)
            .join("");

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProductModal(productId) {

    const product =
        products.find(
            p => p.id === productId
        );

    if (!product) return;

    selectedProduct =
        product;

    selectedSize = null;

    modalQuantity = 1;


    const modal =
        document.getElementById(
            "productModal"
        );

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

    image.src =
        product.image;

    image.alt =
        product.name;

    category.textContent =
        product.category;

    name.textContent =
        product.name;

    price.textContent =
        formatPrice(
            getProductPrice(product)
        );

    quantity.textContent =
        modalQuantity;


    renderSizes(
        product.sizes
    );


    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   SIZES
========================================================= */

function renderSizes(sizes) {

    const container =
        document.getElementById(
            "sizeOptions"
        );

    if (!container) return;

    container.innerHTML =
        sizes
            .map(size => `

                <button
                    type="button"
                    class="size-option"
                    onclick="selectSize('${size}', this)">

                    ${size}

                </button>

            `)
            .join("");

}


/* =========================================================
   SELECT SIZE
========================================================= */

function selectSize(size, button) {

    selectedSize =
        size;

    document
        .querySelectorAll(
            ".size-option"
        )
        .forEach(
            item =>
                item.classList.remove(
                    "selected"
                )
        );

    button.classList.add(
        "selected"
    );

}


/* =========================================================
   QUANTITY
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
   CLOSE PRODUCT MODAL
========================================================= */

function closeProductModal() {

    const modal =
        document.getElementById(
            "productModal"
        );

    if (!modal) return;

    modal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

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


    const existing =
        cart.find(
            item =>
                item.productId ===
                    selectedProduct.id
                &&
                item.size ===
                    selectedSize
        );


    if (existing) {

        existing.quantity +=
            modalQuantity;

    }

    else {

        cart.push({

            productId:
                selectedProduct.id,

            size:
                selectedSize,

            quantity:
                modalQuantity

        });

    }


    saveCart();

    renderCart();

    closeProductModal();

    openCart();

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
   RENDER CART
========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const count =
        document.getElementById(
            "cartCount"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `

            <p class="empty-cart">
                Your bag is empty.
            </p>

        `;

    }

    else {

        container.innerHTML =
            cart
                .map(
                    (item, index) =>
                        createCartItem(
                            item,
                            index
                        )
                )
                .join("");

    }


    let total = 0;

    let itemCount = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p =>
                    p.id ===
                    item.productId
            );

        if (!product) return;

        total +=
            getProductPrice(product) *
            item.quantity;

        itemCount +=
            item.quantity;

    });


    if (count) {
        count.textContent =
            itemCount;
    }

    if (totalElement) {
        totalElement.textContent =
            formatPrice(total);
    }


    updateCheckoutTotal();

}


/* =========================================================
   CART ITEM
========================================================= */

function createCartItem(item, index) {

    const product =
        products.find(
            p =>
                p.id ===
                item.productId
        );

    if (!product) {
        return "";
    }


    const price =
        getProductPrice(product) *
        item.quantity;


    return `

        <div class="cart-item">

            <img
                src="${product.image}"
                alt="${product.name}">

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    Size: ${item.size}
                </p>

                <p>
                    Qty: ${item.quantity}
                </p>

                <p>
                    ${formatPrice(price)}
                </p>

                <button
                    type="button"
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    REMOVE

                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeFromCart(index) {

    cart.splice(
        index,
        1
    );

    saveCart();

    renderCart();

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (overlay) {
        overlay.classList.add(
            "active"
        );
    }

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


    const checkout =
        document.getElementById(
            "checkoutOverlay"
        );

    if (checkout) {

        checkout.classList.add(
            "active"
        );

    }


    updateCheckoutTotal();

    updatePaymentMethods();

}


function closeCheckout() {

    const checkout =
        document.getElementById(
            "checkoutOverlay"
        );

    if (checkout) {

        checkout.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   CHECKOUT TOTAL
========================================================= */

function updateCheckoutTotal() {

    const element =
        document.getElementById(
            "checkoutTotal"
        );

    if (!element) return;


    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p =>
                    p.id ===
                    item.productId
            );

        if (!product) return;

        total +=
            getProductPrice(product) *
            item.quantity;

    });


    element.textContent =
        formatPrice(total);

}


/* =========================================================
   CUSTOMER COUNTRY CHANGE
========================================================= */

function countryChanged() {

    const select =
        document.getElementById(
            "customerCountry"
        );

    if (!select) return;


    selectShoppingCountry(
        select.value
    );


    const checkout =
        document.getElementById(
            "checkoutOverlay"
        );

    if (checkout) {

        checkout.classList.add(
            "active"
        );

    }

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


    const payment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (!payment) {

        alert(
            "Please select a payment method."
        );

        return;

    }


    let message =
        "FOOTWORLD ORDER\n\n";


    message +=
        "CUSTOMER DETAILS\n";

    message +=
        `Name: ${name}\n`;

    message +=
        `Email: ${email}\n`;

    message +=
        `Phone: ${phone}\n`;

    message +=
        `Country: ${COUNTRY_SETTINGS[selectedCountry].name}\n`;

    message +=
        `Address: ${address}\n`;

    message +=
        `City: ${city}\n`;

    message +=
        `State: ${state}\n`;

    message +=
        `Postal Code: ${pin}\n\n`;


    message +=
        "ORDER\n";


    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p =>
                    p.id ===
                    item.productId
            );

        if (!product) return;


        const itemTotal =
            getProductPrice(product) *
            item.quantity;


        total +=
            itemTotal;


        message +=
            `${product.name}\n`;

        message +=
            `Size: ${item.size}\n`;

        message +=
            `Qty: ${item.quantity}\n`;

        message +=
            `Price: ${formatPrice(itemTotal)}\n\n`;

    });


    message +=
        `TOTAL: ${formatPrice(total)}\n`;

    message +=
        `Payment: ${payment.value}`;


    /*
       Replace this number with
       your actual FOOTWORLD WhatsApp number.

       IMPORTANT:
       Include country code.
       Example:
       14165551234
    */

    const whatsappNumber =
        "14165551234";


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
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const cartOverlay =
            document.getElementById(
                "cartOverlay"
            );

        if (
            event.target ===
            cartOverlay
        ) {
            closeCart();
        }


        const productModal =
            document.getElementById(
                "productModal"
            );

        if (
            event.target ===
            productModal
        ) {
            closeProductModal();
        }


        const checkoutOverlay =
            document.getElementById(
                "checkoutOverlay"
            );

        if (
            event.target ===
            checkoutOverlay
        ) {
            closeCheckout();
        }

    }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeCart();

            closeProductModal();

            closeCheckout();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
         * IMPORTANT:
         *
         * If customer has never selected
         * a country, show the country page.
         */

        if (
            !selectedCountry ||
            !COUNTRY_SETTINGS[selectedCountry]
        ) {

            selectedCountry =
                null;

            const selector =
                document.getElementById(
                    "countrySelector"
                );

            if (selector) {

                selector.classList.remove(
                    "hidden"
                );

            }

        }

        else {

            updateCountryDisplay();

            updatePaymentMethods();

        }


        renderProducts();

        renderNewProducts();

        renderCart();

    }
);
