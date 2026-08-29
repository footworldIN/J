/* =========================================================
   FOOTWORLD - CLEAN SCRIPT
   COUNTRY GATE + PRODUCTS + CART
========================================================= */

const countrySettings = {
    IN: { name: "India", flag: "🇮🇳", currency: "INR", symbol: "₹" },
    CA: { name: "Canada", flag: "🇨🇦", currency: "CAD", symbol: "CA$" },
    US: { name: "United States", flag: "🇺🇸", currency: "USD", symbol: "$" },
    GB: { name: "United Kingdom", flag: "🇬🇧", currency: "GBP", symbol: "£" },
    AU: { name: "Australia", flag: "🇦🇺", currency: "AUD", symbol: "A$" },
    DE: { name: "Germany", flag: "🇩🇪", currency: "EUR", symbol: "€" }
};


/* =========================================================
   PRODUCTS
========================================================= */

const products = [

    {
        id: 1,
        name: "Classic Oxford",
        category: "Formal Shoes",
        section: "formal",
        image: "images/classic-oxford.jpg",
        prices: {
            IN: 6999,
            CA: 129,
            US: 95,
            GB: 75,
            AU: 145,
            DE: 89
        },
        sizes: ["7", "8", "9", "10", "11"]
    },

    {
        id: 2,
        name: "Executive Derby",
        category: "Formal Shoes",
        section: "formal",
        image: "images/executive-derby.jpg",
        prices: {
            IN: 7499,
            CA: 139,
            US: 99,
            GB: 79,
            AU: 155,
            DE: 95
        },
        sizes: ["7", "8", "9", "10", "11"]
    },

    {
        id: 3,
        name: "Premium Leather Oxford",
        category: "Formal Shoes",
        section: "formal",
        image: "images/premium-oxford.jpg",
        prices: {
            IN: 8999,
            CA: 169,
            US: 119,
            GB: 95,
            AU: 185,
            DE: 109
        },
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 4,
        name: "Classic Penny Loafer",
        category: "Loafers",
        section: "loafers",
        image: "images/penny-loafer.jpg",
        prices: {
            IN: 7999,
            CA: 149,
            US: 109,
            GB: 85,
            AU: 165,
            DE: 99
        },
        sizes: ["7", "8", "9", "10", "11"]
    },

    {
        id: 5,
        name: "Premium Leather Loafer",
        category: "Loafers",
        section: "loafers",
        image: "images/leather-loafer.jpg",
        prices: {
            IN: 8499,
            CA: 159,
            US: 115,
            GB: 89,
            AU: 175,
            DE: 105
        },
        sizes: ["7", "8", "9", "10", "11"]
    },

    {
        id: 6,
        name: "Elegant Tassel Loafer",
        category: "Loafers",
        section: "loafers",
        image: "images/tassel-loafer.jpg",
        prices: {
            IN: 9499,
            CA: 179,
            US: 129,
            GB: 99,
            AU: 195,
            DE: 119
        },
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 7,
        name: "Junior Classic Oxford",
        category: "Boys Formal",
        section: "boys",
        image: "images/junior-oxford.jpg",
        prices: {
            IN: 3999,
            CA: 79,
            US: 59,
            GB: 45,
            AU: 85,
            DE: 55
        },
        sizes: ["1", "2", "3", "4", "5"]
    },

    {
        id: 8,
        name: "Young Gentleman Derby",
        category: "Boys Formal",
        section: "boys",
        image: "images/junior-derby.jpg",
        prices: {
            IN: 4499,
            CA: 85,
            US: 65,
            GB: 49,
            AU: 95,
            DE: 59
        },
        sizes: ["1", "2", "3", "4", "5"]
    },

    {
        id: 9,
        name: "Signature Black Oxford",
        category: "New Arrival",
        section: "new",
        image: "images/signature-oxford.jpg",
        prices: {
            IN: 9999,
            CA: 189,
            US: 139,
            GB: 109,
            AU: 205,
            DE: 129
        },
        sizes: ["7", "8", "9", "10", "11", "12"]
    },

    {
        id: 10,
        name: "Italian Style Loafer",
        category: "New Arrival",
        section: "new",
        image: "images/italian-loafer.jpg",
        prices: {
            IN: 10999,
            CA: 199,
            US: 149,
            GB: 119,
            AU: 225,
            DE: 139
        },
        sizes: ["7", "8", "9", "10", "11"]
    }

];


/* =========================================================
   COUNTRY
========================================================= */

let currentCountry =
    localStorage.getItem("footworldCountry") || null;


/* =========================================================
   CART
========================================================= */

let cart = [];

try {
    cart = JSON.parse(
        localStorage.getItem("footworldCart")
    ) || [];
} catch (error) {
    cart = [];
}


/* =========================================================
   PRODUCT MODAL
========================================================= */

let selectedProduct = null;
let selectedSize = null;
let modalQuantity = 1;


/* =========================================================
   PRICE
========================================================= */

function formatPrice(amount) {

    const country =
        countrySettings[currentCountry || "IN"];

    if (!country) {
        return amount;
    }

    return (
        country.symbol +
        Number(amount).toLocaleString(
            "en-US",
            {
                minimumFractionDigits:
                    country.currency === "INR" ? 0 : 2,

                maximumFractionDigits:
                    country.currency === "INR" ? 0 : 2
            }
        )
    );
}


function getProductPrice(product) {

    if (
        currentCountry &&
        product.prices &&
        product.prices[currentCountry] !== undefined
    ) {
        return product.prices[currentCountry];
    }

    return product.prices?.IN || 0;
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    return `
        <article class="product-card">

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
                onerror="this.src='https://placehold.co/800x1000?text=FOOTWORLD'"
            >

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <div class="product-name">
                    ${product.name}
                </div>

                <div class="product-price">
                    ${formatPrice(getProductPrice(product))}
                </div>

                <button
                    type="button"
                    class="product-action"
                    onclick="openProductModal(${product.id})"
                >
                    VIEW PRODUCT
                </button>

            </div>

        </article>
    `;
}


/* =========================================================
   RENDER SECTION
========================================================= */

function renderProductSection(sectionName, containerId) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }

    const sectionProducts =
        products.filter(
            product => product.section === sectionName
        );

    container.innerHTML =
        sectionProducts.length
            ? sectionProducts.map(createProductCard).join("")
            : `<p>No products available.</p>`;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderAllProducts() {

    renderProductSection(
        "formal",
        "productGrid"
    );

    renderProductSection(
        "new",
        "newProducts"
    );

    renderProductSection(
        "loafers",
        "loaferProducts"
    );

    renderProductSection(
        "boys",
        "boysProducts"
    );
}


/* =========================================================
   COUNTRY GATE
========================================================= */

function checkCountryGate() {

    const gate =
        document.getElementById("countryGate");

    const selector =
        document.getElementById("countrySelector");

    const saved =
        localStorage.getItem("footworldCountry");


    /*
       IMPORTANT:
       No saved country = COUNTRY SCREEN.
    */

    if (
        !saved ||
        !countrySettings[saved]
    ) {

        currentCountry = null;

        if (gate) {
            gate.style.display = "flex";
        }

        if (selector) {
            selector.style.display = "flex";
            selector.classList.add("active");
        }

        document.body.classList.add(
            "country-selection-active"
        );

        return;
    }


    /*
       Country already selected.
    */

    currentCountry = saved;

    if (gate) {
        gate.style.display = "none";
    }

    if (selector) {
        selector.style.display = "none";
        selector.classList.remove("active");
    }

    document.body.classList.remove(
        "country-selection-active"
    );
}


/* =========================================================
   SELECT COUNTRY
========================================================= */

function selectShoppingCountry(country) {

    if (!countrySettings[country]) {
        return;
    }

    currentCountry = country;

    localStorage.setItem(
        "footworldCountry",
        country
    );

    const gate =
        document.getElementById("countryGate");

    const selector =
        document.getElementById("countrySelector");

    if (gate) {
        gate.style.display = "none";
    }

    if (selector) {
        selector.classList.remove("active");
        selector.style.display = "none";
    }

    document.body.classList.remove(
        "country-selection-active"
    );

    updateCountryUI();

    renderAllProducts();

    updateCartUI();

    updateCheckoutTotal();

    updatePaymentMethods();
}


/*
   Old HTML compatibility
*/

function selectCountry(country) {
    selectShoppingCountry(country);
}


/* =========================================================
   CHANGE COUNTRY
========================================================= */

function changeCountry() {

    const selector =
        document.getElementById("countrySelector");

    const gate =
        document.getElementById("countryGate");

    if (selector) {
        selector.style.display = "flex";
        selector.classList.add("active");
    }

    if (gate) {
        gate.style.display = "flex";
    }

    document.body.classList.add(
        "country-selection-active"
    );
}


/* =========================================================
   COUNTRY UI
========================================================= */

function updateCountryUI() {

    if (!currentCountry) {
        return;
    }

    const settings =
        countrySettings[currentCountry];

    if (!settings) {
        return;
    }


    const flag =
        document.getElementById(
            "headerCountryFlag"
        );

    const name =
        document.getElementById(
            "headerCountryName"
        );

    const customerCountry =
        document.getElementById(
            "customerCountry"
        );

    const currencyNotice =
        document.getElementById(
            "currencyNotice"
        );


    if (flag) {
        flag.textContent =
            settings.flag;
    }

    if (name) {
        name.textContent =
            settings.name;
    }

    if (customerCountry) {
        customerCountry.value =
            currentCountry;
    }

    if (currencyNotice) {
        currencyNotice.textContent =
            `Prices shown in ${settings.currency}`;
    }
}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProductModal(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) {
        return;
    }

    selectedProduct = product;
    selectedSize = null;
    modalQuantity = 1;


    const modal =
        document.getElementById("productModal");

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

    const sizes =
        document.getElementById(
            "sizeOptions"
        );


    if (image) {
        image.src = product.image;
        image.alt = product.name;
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
            formatPrice(
                getProductPrice(product)
            );
    }

    if (quantity) {
        quantity.textContent =
            modalQuantity;
    }

    if (sizes) {

        sizes.innerHTML =
            product.sizes.map(
                size => `
                    <button
                        type="button"
                        class="size-option"
                        onclick="selectProductSize('${size}', this)"
                    >
                        ${size}
                    </button>
                `
            ).join("");
    }


    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}


function closeProductModal() {

    const modal =
        document.getElementById("productModal");

    if (modal) {
        modal.classList.remove("active");
    }

    document.body.style.overflow = "";

    selectedProduct = null;
    selectedSize = null;
}


/* =========================================================
   SIZE
========================================================= */

function selectProductSize(size, button) {

    selectedSize = size;

    document
        .querySelectorAll(".size-option")
        .forEach(
            option =>
                option.classList.remove("selected")
        );

    if (button) {
        button.classList.add("selected");
    }
}


/* =========================================================
   QUANTITY
========================================================= */

function changeModalQuantity(amount) {

    modalQuantity += amount;

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
   ADD TO CART
========================================================= */

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
                item.productId === selectedProduct.id &&
                item.size === selectedSize &&
                item.country === currentCountry
        );


    if (existing) {

        existing.quantity += modalQuantity;

    } else {

        cart.push({
            productId: selectedProduct.id,
            name: selectedProduct.name,
            category: selectedProduct.category,
            image: selectedProduct.image,
            size: selectedSize,
            quantity: modalQuantity,
            country: currentCountry,
            price: getProductPrice(selectedProduct)
        });
    }


    saveCart();
    updateCartUI();
    closeProductModal();
    openCart();
}


/* =========================================================
   CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "footworldCart",
        JSON.stringify(cart)
    );
}


function calculateCartCount() {

    return cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );
}


function calculateCartTotal() {

    return cart.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );
}


function updateCartUI() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    if (cartCount) {
        cartCount.textContent =
            calculateCartCount();
    }

    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(
                calculateCartTotal()
            );
    }

    if (!cartItems) {
        return;
    }


    if (!cart.length) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML =
        cart.map(
            (item, index) => `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        onerror="this.src='https://placehold.co/200x250?text=FOOTWORLD'"
                    >

                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ${item.category}
                        </p>

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
                        type="button"
                        class="remove-item"
                        onclick="removeCartItem(${index})"
                    >
                        REMOVE
                    </button>

                </div>
            `
        )
        .join("");
}


function removeCartItem(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {
        return;
    }

    cart.splice(index, 1);

    saveCart();
    updateCartUI();
}


function openCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (overlay) {
        overlay.classList.add("active");
    }
}


function closeCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (overlay) {
        overlay.classList.remove("active");
    }
}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    if (!cart.length) {

        alert("Your bag is empty.");

        return;
    }

    const checkout =
        document.getElementById(
            "checkoutOverlay"
        );

    if (checkout) {
        checkout.classList.add("active");
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
        checkout.classList.remove("active");
    }
}


function updateCheckoutTotal() {

    const total =
        document.getElementById(
            "checkoutTotal"
        );

    if (total) {

        total.textContent =
            formatPrice(
                calculateCartTotal()
            );
    }

    const notice =
        document.getElementById(
            "currencyNotice"
        );

    if (
        notice &&
        currentCountry &&
        countrySettings[currentCountry]
    ) {

        notice.textContent =
            `Prices shown in ${countrySettings[currentCountry].currency}`;
    }
}


/* =========================================================
   PAYMENT
========================================================= */

function updatePaymentMethods() {

    if (!currentCountry) {
        return;
    }

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

        india.style.display =
            currentCountry === "IN"
                ? "block"
                : "none";
    }

    if (canada) {

        canada.style.display =
            currentCountry === "CA"
                ? "block"
                : "none";
    }

    if (international) {

        international.style.display =
            currentCountry !== "IN" &&
            currentCountry !== "CA"
                ? "block"
                : "none";
    }
}


/* =========================================================
   CUSTOMER COUNTRY
========================================================= */

function countryChanged() {

    const select =
        document.getElementById(
            "customerCountry"
        );

    if (!select) {
        return;
    }

    selectShoppingCountry(
        select.value
    );
}


/* =========================================================
   PLACE ORDER
========================================================= */

function placeOrder() {

    if (!cart.length) {

        alert("Your bag is empty.");

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
            "Please complete all required delivery details."
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


    alert(
        "Your order has been prepared.\n\n" +
        "FOOTWORLD will contact you to confirm the order."
    );
}


/* =========================================================
   OUTSIDE CLICK
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const productModal =
            document.getElementById(
                "productModal"
            );

        if (
            productModal &&
            event.target === productModal
        ) {
            closeProductModal();
        }


        const cartOverlay =
            document.getElementById(
                "cartOverlay"
            );

        if (
            cartOverlay &&
            event.target === cartOverlay
        ) {
            closeCart();
        }


        const checkoutOverlay =
            document.getElementById(
                "checkoutOverlay"
            );

        if (
            checkoutOverlay &&
            event.target === checkoutOverlay
        ) {
            closeCheckout();
        }

    }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeProductModal();
            closeCart();
            closeCheckout();
        }
    }
);


/* =========================================================
   START WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           FIRST:
           Decide whether country screen
           should be visible.
        */

        checkCountryGate();


        /*
           ONLY render prices/products
           after country is known.
        */

        if (currentCountry) {

            updateCountryUI();

            renderAllProducts();

            updateCartUI();

            updatePaymentMethods();

            updateCheckoutTotal();

        } else {

            /*
               Country not selected yet.
               Keep the main website hidden.
            */

            updateCartUI();
        }

    }
);
