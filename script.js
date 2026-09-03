/* =========================================================
   FOOTWORLD - STEP 2A
   COUNTRY + PRODUCTS + CART + CHECKOUT
   SHIPPING BREAKDOWN + ORDER PREPARATION
========================================================= */

/* =========================================================
   FOOTWORLD - SUPABASE ORDER DATABASE
========================================================= */

const SUPABASE_URL =
    "https://ujkomlpfrfnfovwkyisu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_uBB24Zj6ih1QyKzkjt-V2g_ljk53064";

const SUPABASE_ORDERS_URL =
    `${SUPABASE_URL}/rest/v1/orders`;


/* =========================================================
   CREATE ORDER NUMBER
========================================================= */

function generateOrderNumber() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(now.getDate())
            .padStart(2, "0");

    const random =
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

    return `FW-${year}${month}${day}-${random}`;
}
/* =========================================================
   COUNTRY SETTINGS
========================================================= */

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
        symbol: "$"
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
   SHIPPING
   TEMPORARY UNTIL SHIPROCKET IS CONNECTED
========================================================= */

const shippingSettings = {

    IN: {
        amount: 0,
        label: "FREE SHIPPING",
        delivery: "3–5 business days"
    },

    CA: {
        amount: 29,
        label: "Standard Shipping",
        delivery: "5–10 business days"
    },

    US: {
        amount: 25,
        label: "Standard Shipping",
        delivery: "5–10 business days"
    },

    GB: {
        amount: 18,
        label: "Standard Shipping",
        delivery: "5–10 business days"
    },

    AU: {
        amount: 30,
        label: "Standard Shipping",
        delivery: "7–12 business days"
    },

    DE: {
        amount: 20,
        label: "Standard Shipping",
        delivery: "5–10 business days"
    }

};


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

    cart =
        JSON.parse(
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
   PRICE FORMAT
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


/* =========================================================
   GET PRODUCT
========================================================= */

function getProductById(productId) {

    return products.find(
        product =>
            product.id === Number(productId)
    );

}


/* =========================================================
   GET CURRENT COUNTRY PRICE
========================================================= */

function getProductPrice(product) {

    if (

        currentCountry &&

        product &&

        product.prices &&

        product.prices[currentCountry] !== undefined

    ) {

        return product.prices[currentCountry];

    }

    return product?.prices?.IN || 0;

}


/* =========================================================
   REPAIR CART PRICES
   IMPORTANT:
   CART ALWAYS USES CURRENT COUNTRY PRICE
========================================================= */

function repairCartPrices() {

    let changed = false;

    cart.forEach(item => {

        const product =
            getProductById(item.productId);

        if (!product) {
            return;
        }

        const correctPrice =
            getProductPrice(product);

        if (Number(item.price) !== Number(correctPrice)) {

            item.price = correctPrice;

            changed = true;
        }

        item.name = product.name;
        item.category = product.category;
        item.image = product.image;
        item.country = currentCountry;

    });


    if (changed) {
        saveCart();
    }

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
                    ${formatPrice(
                        getProductPrice(product)
                    )}
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

function renderProductSection(
    sectionName,
    containerId
) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }


    const sectionProducts =
        products.filter(
            product =>
                product.section === sectionName
        );


    container.innerHTML =

        sectionProducts.length

            ? sectionProducts
                .map(createProductCard)
                .join("")

            : `<p>No products available.</p>`;

}


/* =========================================================
   RENDER ALL PRODUCTS
========================================================= */

function renderAllProducts() {

    renderProductSection(
        "formal",
        "productGrid"
    );

    renderProductSection(
        "loafers",
        "loaferProducts"
    );

    renderProductSection(
        "boys",
        "boysProducts"
    );

    renderProductSection(
        "new",
        "newProducts"
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
        localStorage.getItem(
            "footworldCountry"
        );


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
   SELECT SHOPPING COUNTRY
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


    repairCartPrices();

    updateCountryUI();

    renderAllProducts();

    updateCartUI();

    updateCheckoutTotal();

    updatePaymentMethods();

}


/* =========================================================
   OLD HTML COMPATIBILITY
========================================================= */

function selectCountry(country) {

    selectShoppingCountry(country);

}


/* =========================================================
   CHANGE COUNTRY
========================================================= */

function changeCountry() {

    const selector =
        document.getElementById(
            "countrySelector"
        );

    const gate =
        document.getElementById(
            "countryGate"
        );


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
        getProductById(productId);

    if (!product) {
        return;
    }


    selectedProduct = product;

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

    const sizes =
        document.getElementById(
            "sizeOptions"
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

            product.sizes
                .map(
                    size => `

                        <button
                            type="button"
                            class="size-option"
                            onclick="selectProductSize('${size}', this)"
                        >
                            ${size}
                        </button>

                    `
                )
                .join("");

    }


    if (modal) {

        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";

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


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    document.body.style.overflow = "";


    selectedProduct = null;

    selectedSize = null;

}


/* =========================================================
   SIZE
========================================================= */

function selectProductSize(
    size,
    button
) {

    selectedSize = size;


    document
        .querySelectorAll(
            ".size-option"
        )
        .forEach(
            option =>
                option.classList.remove(
                    "selected"
                )
        );


    if (button) {

        button.classList.add(
            "selected"
        );

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

                item.productId ===
                    selectedProduct.id &&

                item.size ===
                    selectedSize &&

                item.country ===
                    currentCountry

        );


    if (existing) {

        existing.quantity +=
            modalQuantity;

        existing.price =
            getProductPrice(
                selectedProduct
            );

    } else {

        cart.push({

            productId:
                selectedProduct.id,

            name:
                selectedProduct.name,

            category:
                selectedProduct.category,

            image:
                selectedProduct.image,

            size:
                selectedSize,

            quantity:
                modalQuantity,

            country:
                currentCountry,

            price:
                getProductPrice(
                    selectedProduct
                )

        });

    }


    saveCart();

    updateCartUI();

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
   CART COUNT
========================================================= */

function calculateCartCount() {

    return cart.reduce(
        (total, item) =>
            total +
            Number(
                item.quantity || 0
            ),
        0
    );

}


/* =========================================================
   CART SUBTOTAL
========================================================= */

function calculateCartSubtotal() {

    repairCartPrices();


    return cart.reduce(

        (total, item) =>

            total +

            Number(
                item.price || 0
            ) *

            Number(
                item.quantity || 0
            ),

        0

    );

}


/* =========================================================
   SHIPPING
========================================================= */

function calculateShipping() {

    if (!currentCountry) {
        return 0;
    }


    const shipping =
        shippingSettings[
            currentCountry
        ];


    if (!shipping) {
        return 0;
    }


    return Number(
        shipping.amount || 0
    );

}


/* =========================================================
   FINAL ORDER TOTAL
========================================================= */

function calculateOrderTotal() {

    return (

        calculateCartSubtotal() +

        calculateShipping()

    );

}


/* =========================================================
   UPDATE CART UI
========================================================= */

function updateCartUI() {

    repairCartPrices();


    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (cartCount) {

        cartCount.textContent =
            calculateCartCount();

    }


    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(
                calculateCartSubtotal()
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
                                Number(item.price) *
                                Number(item.quantity)
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

        ).join("");

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

    updateCartUI();

    updateCheckoutTotal();

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

    if (!cart.length) {

        alert(
            "Your bag is empty."
        );

        return;

    }


    repairCartPrices();


    const checkout =
        document.getElementById(
            "checkoutOverlay"
        );


    if (checkout) {

        checkout.classList.add(
            "active"
        );

    }


    updateCountryUI();

    updateCheckoutTotal();

    updatePaymentMethods();

}


/* =========================================================
   CLOSE CHECKOUT
========================================================= */

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
   CREATE CHECKOUT BREAKDOWN
========================================================= */

function createCheckoutBreakdown() {

    const summary =
        document.querySelector(
            ".checkout-summary"
        );


    if (!summary) {
        return;
    }


    let breakdown =
        document.getElementById(
            "checkoutBreakdown"
        );


    if (!breakdown) {

        breakdown =
            document.createElement(
                "div"
            );

        breakdown.id =
            "checkoutBreakdown";

        breakdown.style.marginBottom =
            "15px";

        breakdown.style.borderTop =
            "1px solid rgba(0,0,0,0.12)";

        breakdown.style.paddingTop =
            "15px";


        const totalStrong =
            document.getElementById(
                "checkoutTotal"
            );


        if (totalStrong) {

            summary.insertBefore(
                breakdown,
                totalStrong
            );

        } else {

            summary.appendChild(
                breakdown
            );

        }

    }


    const subtotal =
        calculateCartSubtotal();

    const shipping =
        calculateShipping();

    const total =
        subtotal + shipping;


    const shippingData =
        shippingSettings[
            currentCountry
        ];


    let shippingText;


    if (shipping === 0) {

        shippingText =
            "FREE";

    } else {

        shippingText =
            formatPrice(shipping);

    }


    breakdown.innerHTML = `

        <div
            style="
                display:flex;
                justify-content:space-between;
                gap:20px;
                margin-bottom:8px;
            "
        >
            <span>
                SUBTOTAL
            </span>

            <span>
                ${formatPrice(subtotal)}
            </span>
        </div>


        <div
            style="
                display:flex;
                justify-content:space-between;
                gap:20px;
                margin-bottom:8px;
            "
        >
            <span>
                SHIPPING
            </span>

            <span>
                ${shippingText}
            </span>
        </div>


        <div
            style="
                font-size:12px;
                opacity:0.7;
                margin-top:5px;
            "
        >
            ${
                shippingData
                    ? shippingData.label +
                      " • " +
                      shippingData.delivery
                    : ""
            }
        </div>

    `;


    if (totalStrong) {

        totalStrong.textContent =
            formatPrice(total);

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
            `Prices shown in ${
                countrySettings[
                    currentCountry
                ].currency
            } • Shipping calculated at checkout`;

    }

}


/* =========================================================
   UPDATE CHECKOUT TOTAL
========================================================= */

function updateCheckoutTotal() {

    repairCartPrices();

    createCheckoutBreakdown();

}


/* =========================================================
   PAYMENT METHODS
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


    /*
       Remove any old payment selection
       when country changes.
    */

    document
        .querySelectorAll(
            'input[name="paymentMethod"]'
        )
        .forEach(
            radio => {
                radio.checked = false;
            }
        );

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
   COLLECT ORDER DATA
========================================================= */

function collectOrderData() {

    repairCartPrices();


    const shipping =
        calculateShipping();

    const subtotal =
        calculateCartSubtotal();

    const total =
        subtotal + shipping;


    const payment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    const name =
        document.getElementById(
            "customerName"
        )?.value.trim() || "";


    const email =
        document.getElementById(
            "customerEmail"
        )?.value.trim() || "";


    const phone =
        document.getElementById(
            "customerPhone"
        )?.value.trim() || "";


    const country =
        document.getElementById(
            "customerCountry"
        )?.value ||
        currentCountry;


    const address =
        document.getElementById(
            "customerAddress"
        )?.value.trim() || "";


    const city =
        document.getElementById(
            "customerCity"
        )?.value.trim() || "";


    const state =
        document.getElementById(
            "customerState"
        )?.value.trim() || "";


    const pin =
        document.getElementById(
            "customerPin"
        )?.value.trim() || "";


    const landmark =
        document.getElementById(
            "customerLandmark"
        )?.value.trim() || "";


    return {

        orderDate:
            new Date().toISOString(),

        country:

            countrySettings[
                country
            ]?.name || country,

        countryCode:
            country,

        currency:
            countrySettings[
                country
            ]?.currency || "",

        customer: {

            name:
                name,

            email:
                email,

            phone:
                phone,

            address:
                address,

            city:
                city,

            state:
                state,

            postalCode:
                pin,

            landmark:
                landmark

        },

        items:

            cart.map(
                item => ({

                    productId:
                        item.productId,

                    name:
                        item.name,

                    category:
                        item.category,

                    size:
                        item.size,

                    quantity:
                        Number(
                            item.quantity
                        ),

                    price:
                        Number(
                            item.price
                        ),

                    lineTotal:

                        Number(
                            item.price
                        ) *

                        Number(
                            item.quantity
                        )

                })
            ),

        subtotal:
            subtotal,

        shipping:
            shipping,

        total:
            total,

        paymentMethod:
            payment?.value || ""

    };

}


/* =========================================================
   PLACE ORDER
   STEP 2A = PREPARE ORDER
========================================================= */

/* =========================================================
   PLACE ORDER
   STEP 2B - SAVE ORDER TO SUPABASE
========================================================= */

/* =========================================================
   PLACE ORDER - SECURE SUPABASE FUNCTION
========================================================= */

async function placeOrder() {

    if (!cart || cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const name =
        document.getElementById("customerName")?.value.trim();

    const email =
        document.getElementById("customerEmail")?.value.trim();

    const phone =
        document.getElementById("customerPhone")?.value.trim();

    const address =
        document.getElementById("customerAddress")?.value.trim();

    const city =
        document.getElementById("customerCity")?.value.trim();

    const state =
        document.getElementById("customerState")?.value.trim();

    const postalCode =
        document.getElementById("customerPin")?.value.trim();

    const landmark =
        document.getElementById("customerLandmark")?.value.trim();

    const paymentElement =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!phone) {
        alert("Please enter your phone number.");
        return;
    }

    if (!address || !city || !state || !postalCode) {
        alert("Please complete your delivery address.");
        return;
    }

    if (!paymentElement) {
        alert("Please select a payment method.");
        return;
    }

    repairCartPrices();

    const subtotal = calculateCartSubtotal();
    const shipping = calculateShipping();
    const total = subtotal + shipping;

    const country =
        countrySettings[currentCountry];

    const orderNumber =
        generateOrderNumber();

    const orderPayload = {

        order_number: orderNumber,

        order_date:
            new Date().toISOString(),

        country_code:
            currentCountry,

        country_name:
            country.name,

        currency:
            country.currency,

        customer_name:
            name,

        customer_email:
            email,

        customer_phone:
            phone,

        customer_address:
            address,

        customer_city:
            city,

        customer_state:
            state,

        customer_postal_code:
            postalCode,

        customer_landmark:
            landmark,

        items: cart.map(item => ({

            productId:
                item.productId,

            name:
                item.name,

            category:
                item.category,

            size:
                item.size,

            quantity:
                Number(item.quantity),

            price:
                Number(item.price),

            lineTotal:
                Number(item.price) *
                Number(item.quantity)

        })),

        subtotal:
            Number(subtotal.toFixed(2)),

        shipping:
            Number(shipping.toFixed(2)),

        total:
            Number(total.toFixed(2)),

        payment_method:
            paymentElement.value,

        payment_status:
            "PENDING",

        order_status:
            "NEW"

    };


    const placeOrderButton =
        document.querySelector(
            '#checkoutOverlay button[onclick="placeOrder()"]'
        );

    if (placeOrderButton) {

        placeOrderButton.disabled = true;

        placeOrderButton.textContent =
            "SAVING ORDER...";

    }


    try {

        const response =
            await fetch(
                "https://ujkomlpfrfnfovwkyisu.supabase.co/functions/v1/create-order-public",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "apikey":
                            SUPABASE_PUBLISHABLE_KEY

                    },

                    body:
                        JSON.stringify(orderPayload)

                }
            );


        const result =
            await response.json();


        if (!response.ok || !result.ok) {

            console.error(
                "Order error:",
                result
            );

            throw new Error(
                result.error ||
                "Unable to save order."
            );

        }


        console.log(
            "ORDER SAVED:",
            result
        );


        localStorage.setItem(
            "footworldLastOrder",
            JSON.stringify(
                orderPayload
            )
        );


        /* Clear cart */

        cart = [];

        localStorage.setItem(
            "footworldCart",
            JSON.stringify(cart)
        );

        updateCartUI();


        /* Close checkout */

        closeCheckout();


        alert(
            "ORDER RECEIVED!\n\n" +
            "Order Number: " +
            result.order.order_number +
            "\n\n" +
            "Total: " +
            formatPrice(total) +
            "\n\n" +
            "Payment: " +
            paymentElement.value +
            "\n\n" +
            "Payment Status: PENDING\n\n" +
            "Thank you for shopping with FOOTWORLD."
        );


    } catch (error) {

        console.error(
            "PLACE ORDER ERROR:",
            error
        );

        alert(
            "We could not complete your order.\n\n" +
            "Please try again."
        );

    } finally {

        if (placeOrderButton) {

            placeOrderButton.disabled =
                false;

            placeOrderButton.textContent =
                "PLACE ORDER";

        }

    }
}
    /* -----------------------------------------------------
       PAYMENT METHOD
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       PREPARE ORDER
    ----------------------------------------------------- */

    repairCartPrices();

    const subtotal =
        calculateCartSubtotal();

    const shipping =
        calculateShipping();

    const total =
        subtotal + shipping;

    const countryCode =
        document.getElementById(
            "customerCountry"
        )?.value ||
        currentCountry;

    const countryData =
        countrySettings[
            countryCode
        ];


    if (!countryData) {

        alert(
            "Please select your shopping country."
        );

        return;
    }


    /* -----------------------------------------------------
       UNIQUE ORDER NUMBER
    ----------------------------------------------------- */

    const orderNumber =
        generateOrderNumber();


    /* -----------------------------------------------------
       DATABASE ORDER
    ----------------------------------------------------- */

    const orderPayload = {

        order_number:
            orderNumber,

        order_date:
            new Date().toISOString(),

        country_code:
            countryCode,

        country_name:
            countryData.name,

        currency:
            countryData.currency,

        customer_name:
            name,

        customer_email:
            email,

        customer_phone:
            phone,

        customer_address:
            address,

        customer_city:
            city,

        customer_state:
            state,

        customer_postal_code:
            pin,

        customer_landmark:
            landmark,

        items:
            cart.map(item => ({

                productId:
                    item.productId,

                name:
                    item.name,

                category:
                    item.category,

                size:
                    item.size,

                quantity:
                    Number(
                        item.quantity
                    ),

                price:
                    Number(
                        item.price
                    ),

                lineTotal:
                    Number(
                        item.price
                    ) *
                    Number(
                        item.quantity
                    )

            })),

        subtotal:
            Number(
                subtotal.toFixed(2)
            ),

        shipping:
            Number(
                shipping.toFixed(2)
            ),

        total:
            Number(
                total.toFixed(2)
            ),

        payment_method:
            payment.value,

        payment_status:
            "PENDING",

        order_status:
            "NEW"

    };


    /* -----------------------------------------------------
       FIND PLACE ORDER BUTTON
    ----------------------------------------------------- */

    const placeButton =
        document.querySelector(
            '#checkoutOverlay button[onclick="placeOrder()"]'
        );

    const originalButtonText =
        placeButton
            ? placeButton.textContent
            : "";


    if (placeButton) {

        placeButton.disabled = true;

        placeButton.textContent =
            "PROCESSING ORDER...";
    }


    /* -----------------------------------------------------
       SAVE TO SUPABASE
    ----------------------------------------------------- */

    try {

        const response =
            await fetch(
                SUPABASE_ORDERS_URL,
                {

                    method: "POST",

                    headers: {

                        "apikey":
                            SUPABASE_PUBLISHABLE_KEY,

                        "Authorization":
                            `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,

                        "Content-Type":
                            "application/json",

                        "Prefer":
                            "return=minimal"

                    },

                    body:
                        JSON.stringify(
                            orderPayload
                        )
                }
            );


        /* -------------------------------------------------
           DATABASE ERROR
        ------------------------------------------------- */

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "FOOTWORLD SUPABASE ERROR:",
                errorText
            );

            throw new Error(
                "Unable to save order."
            );
        }


        /* -------------------------------------------------
           ORDER SUCCESS
        ------------------------------------------------- */

        console.log(
            "FOOTWORLD ORDER SAVED:",
            orderPayload
        );


        /* -------------------------------------------------
           SAVE LAST ORDER LOCALLY
           FOR CUSTOMER CONFIRMATION / FUTURE FEATURES
        ------------------------------------------------- */

        localStorage.setItem(
            "footworldLastOrder",
            JSON.stringify(
                orderPayload
            )
        );


        /* -------------------------------------------------
           EMPTY CART ONLY AFTER DATABASE SUCCESS
        ------------------------------------------------- */

        cart = [];

        saveCart();

        updateCartUI();


        /* -------------------------------------------------
           CLOSE CHECKOUT
        ------------------------------------------------- */

        closeCheckout();


        /* -------------------------------------------------
           CUSTOMER CONFIRMATION
        ------------------------------------------------- */

        alert(

            "ORDER RECEIVED!\n\n" +

            "Order Number: " +
            orderNumber +

            "\n\n" +

            "Total: " +
            formatPrice(total) +

            "\n\n" +

            "Payment Method: " +
            payment.value +

            "\n\n" +

            "Your order has been successfully received."

        );


        console.log(
            "FOOTWORLD ORDER NUMBER:",
            orderNumber
        );


    } catch (error) {

        console.error(
            "FOOTWORLD ORDER ERROR:",
            error
        );


        alert(

            "We could not complete your order.\n\n" +

            "Please check your internet connection " +
            "and try again."

        );


    } finally {

        /* -------------------------------------------------
           RESTORE BUTTON
        ------------------------------------------------- */

        if (placeButton) {

            placeButton.disabled = false;

            placeButton.textContent =
                originalButtonText ||
                "PLACE ORDER";
        }

    }
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


    const orderData =
        collectOrderData();


    /*
       TEMPORARY:
       For Step 2A we are NOT charging
       the customer's card yet.

       The order is only prepared.

       Real payment connection will be
       added in the next step.
    */


    console.log(
        "FOOTWORLD ORDER:",
        orderData
    );


    alert(

        "Order details are ready.\n\n" +

        "Total: " +
        formatPrice(
            orderData.total
        ) +

        "\n\n" +

        "Payment method: " +
        orderData.paymentMethod +

        "\n\n" +

        "Next step will connect the real payment system."

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

            event.target ===
                productModal

        ) {

            closeProductModal();

        }


        const cartOverlay =
            document.getElementById(
                "cartOverlay"
            );


        if (

            cartOverlay &&

            event.target ===
                cartOverlay

        ) {

            closeCart();

        }


        const checkoutOverlay =
            document.getElementById(
                "checkoutOverlay"
            );


        if (

            checkoutOverlay &&

            event.target ===
                checkoutOverlay

        ) {

            closeCheckout();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

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
           COUNTRY
        */

        checkCountryGate();


        /*
           COUNTRY SELECTED
        */

        if (currentCountry) {

            repairCartPrices();

            updateCountryUI();

            renderAllProducts();

            updateCartUI();

            updatePaymentMethods();

            updateCheckoutTotal();

        }


        /*
           COUNTRY NOT SELECTED
        */

        else {

            updateCartUI();

        }

    }
);
