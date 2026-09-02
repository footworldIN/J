/* =========================================================
   FOOTWORLD - COMPLETE SCRIPT
   COUNTRY SELECTION
   COUNTRY-SPECIFIC PRICES
   PRODUCTS
   CART
   CHECKOUT
========================================================= */


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
   IMPORTANT:
   PRICES ARE FIXED BY COUNTRY.
   NO CURRENCY CONVERSION.
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
   CURRENT COUNTRY
========================================================= */

let currentCountry =
    localStorage.getItem("footworldCountry") || null;


/* =========================================================
   CART
========================================================= */

let cart = [];


/*
   IMPORTANT:
   Old cart data may contain wrong prices.
   We load it, then repair prices from the product table.
*/

try {

    const savedCart =
        JSON.parse(
            localStorage.getItem("footworldCart")
        ) || [];

    cart = savedCart;

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
   GET PRODUCT
========================================================= */

function getProductById(productId) {

    return products.find(
        product => Number(product.id) === Number(productId)
    );

}


/* =========================================================
   GET COUNTRY PRICE
   NO CONVERSION
========================================================= */

function getProductPrice(product) {

    if (!product) {
        return 0;
    }

    if (!product.prices) {
        return 0;
    }

    if (
        currentCountry &&
        Object.prototype.hasOwnProperty.call(
            product.prices,
            currentCountry
        )
    ) {

        return Number(
            product.prices[currentCountry]
        );

    }

    /*
       If country is not selected,
       use India only as fallback.
    */

    if (
        Object.prototype.hasOwnProperty.call(
            product.prices,
            "IN"
        )
    ) {

        return Number(
            product.prices.IN
        );

    }

    return 0;

}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(amount) {

    const country =
        countrySettings[currentCountry || "IN"];

    if (!country) {
        return amount;
    }

    const numericAmount =
        Number(amount) || 0;


    if (country.currency === "INR") {

        return (
            country.symbol +
            numericAmount.toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }
            )
        );

    }


    return (
        country.symbol +
        numericAmount.toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    );

}


/* =========================================================
   REPAIR CART PRICES
   VERY IMPORTANT
========================================================= */

function repairCartPrices() {

    if (!currentCountry) {
        return;
    }

    cart.forEach(item => {

        const product =
            getProductById(item.productId);

        if (!product) {
            return;
        }

        /*
           Always use the current country's
           official product price.
        */

        item.price =
            getProductPrice(product);

        item.country =
            currentCountry;

        item.name =
            product.name;

        item.category =
            product.category;

        item.image =
            product.image;

    });

    saveCart();

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
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const price =
        getProductPrice(product);

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
                    ${formatPrice(price)}
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


    if (!sectionProducts.length) {

        container.innerHTML =
            `<p>No products available.</p>`;

        return;

    }


    container.innerHTML =
        sectionProducts
            .map(createProductCard)
            .join("");

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
        document.getElementById(
            "countryGate"
        );

    const selector =
        document.getElementById(
            "countrySelector"
        );


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

            selector.classList.add(
                "active"
            );

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

        selector.classList.remove(
            "active"
        );

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


    currentCountry =
        country;


    localStorage.setItem(
        "footworldCountry",
        country
    );


    /*
       FIX OLD CART PRICES
    */

    repairCartPrices();


    const gate =
        document.getElementById(
            "countryGate"
        );

    const selector =
        document.getElementById(
            "countrySelector"
        );


    if (gate) {
        gate.style.display = "none";
    }


    if (selector) {

        selector.classList.remove(
            "active"
        );

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

        selector.classList.add(
            "active"
        );

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


    selectedProduct =
        product;

    selectedSize =
        null;

    modalQuantity =
        1;


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

        modal.classList.add(
            "active"
        );

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


    document.body.style.overflow =
        "";


    selectedProduct =
        null;

    selectedSize =
        null;

}


/* =========================================================
   SELECT SIZE
========================================================= */

function selectProductSize(
    size,
    button
) {

    selectedSize =
        size;


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
   MODAL QUANTITY
========================================================= */

function changeModalQuantity(
    amount
) {

    modalQuantity +=
        amount;


    if (modalQuantity < 1) {

        modalQuantity =
            1;

    }


    if (modalQuantity > 20) {

        modalQuantity =
            20;

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


    const currentPrice =
        getProductPrice(
            selectedProduct
        );


    const existing =
        cart.find(
            item =>
                Number(item.productId) ===
                    Number(selectedProduct.id) &&

                String(item.size) ===
                    String(selectedSize) &&

                item.country ===
                    currentCountry
        );


    if (existing) {

        existing.quantity +=
            modalQuantity;

        /*
           Always refresh the price
        */

        existing.price =
            currentPrice;

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
                currentPrice

        });

    }


    saveCart();

    updateCartUI();

    closeProductModal();

    openCart();

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
   CART TOTAL
========================================================= */

function calculateCartTotal() {

    /*
       IMPORTANT:
       Recalculate every cart item using
       the CURRENT country price table.

       This prevents:
       ₹7000 -> CA$7000
    */

    return cart.reduce(

        (total, item) => {

            const product =
                getProductById(
                    item.productId
                );


            if (!product) {
                return total;
            }


            const correctPrice =
                getProductPrice(
                    product
                );


            return (
                total +
                correctPrice *
                Number(
                    item.quantity || 0
                )
            );

        },

        0

    );

}


/* =========================================================
   UPDATE CART UI
========================================================= */

function updateCartUI() {

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


    /*
       Repair stored cart before display.
    */

    repairCartPrices();


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

        cart
            .map(
                (item, index) => {

                    const product =
                        getProductById(
                            item.productId
                        );


                    if (!product) {
                        return "";
                    }


                    const correctPrice =
                        getProductPrice(
                            product
                        );


                    const itemTotal =
                        correctPrice *
                        Number(
                            item.quantity || 0
                        );


                    return `

                        <div class="cart-item">

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                onerror="this.src='https://placehold.co/200x250?text=FOOTWORLD'"
                            >

                            <div class="cart-item-info">

                                <h4>
                                    ${product.name}
                                </h4>

                                <p>
                                    ${product.category}
                                </p>

                                <p>
                                    Size: ${item.size}
                                </p>

                                <p>
                                    Quantity: ${item.quantity}
                                </p>

                                <p>
                                    ${formatPrice(itemTotal)}
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

                    `;

                }
            )
            .join("");

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


    cart.splice(
        index,
        1
    );


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
   SHIPPING
   TEMPORARY FIXED SHIPPING
   UNTIL SHIPROCKET X IS CONNECTED
========================================================= */

const shippingSettings = {

    IN: {
        price: 0,
        label: "FREE SHIPPING",
        delivery: "3–5 business days"
    },

    CA: {
        price: 29,
        label: "Standard Shipping",
        delivery: "5–10 business days"
    },

    US: {
        price: 25,
        label: "Standard Shipping",
        delivery: "5–10 business days"
    },

    GB: {
        price: 18,
        label: "Standard Shipping",
        delivery: "5–10 business days"
    },

    AU: {
        price: 30,
        label: "Standard Shipping",
        delivery: "7–12 business days"
    },

    DE: {
        price: 20,
        label: "Standard Shipping",
        delivery: "5–10 business days"
    }

};


/* =========================================================
   GET SHIPPING
========================================================= */

function getShippingPrice() {

    if (
        !currentCountry ||
        !shippingSettings[currentCountry]
    ) {

        return 0;

    }


    return Number(
        shippingSettings[currentCountry].price
    ) || 0;

}


/* =========================================================
   CHECKOUT TOTAL
========================================================= */

function updateCheckoutTotal() {

    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    const productTotal =
        calculateCartTotal();


    const shipping =
        getShippingPrice();


    const finalTotal =
        productTotal +
        shipping;


    if (totalElement) {

        totalElement.textContent =
            formatPrice(
                finalTotal
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

        const shippingInfo =
            shippingSettings[currentCountry];


        notice.textContent =
            `Prices shown in ${
                countrySettings[currentCountry].currency
            } • ${
                shippingInfo
                    ? shippingInfo.label
                    : ""
            }`;

    }

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

        alert(
            "Your bag is empty."
        );

        return;

    }


    const name =
        document
            .getElementById(
                "customerName"
            )
            ?.value.trim();


    const email =
        document
            .getElementById(
                "customerEmail"
            )
            ?.value.trim();


    const phone =
        document
            .getElementById(
                "customerPhone"
            )
            ?.value.trim();


    const address =
        document
            .getElementById(
                "customerAddress"
            )
            ?.value.trim();


    const city =
        document
            .getElementById(
                "customerCity"
            )
            ?.value.trim();


    const state =
        document
            .getElementById(
                "customerState"
            )
            ?.value.trim();


    const pin =
        document
            .getElementById(
                "customerPin"
            )
            ?.value.trim();


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


    const shipping =
        getShippingPrice();


    const orderTotal =
        calculateCartTotal() +
        shipping;


    const orderData = {

        country:
            currentCountry,

        currency:
            countrySettings[
                currentCountry
            ].currency,

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
                pin

        },

        items:
            cart.map(
                item => {

                    const product =
                        getProductById(
                            item.productId
                        );

                    return {

                        productId:
                            item.productId,

                        productName:
                            product
                                ? product.name
                                : item.name,

                        size:
                            item.size,

                        quantity:
                            item.quantity,

                        unitPrice:
                            product
                                ? getProductPrice(
                                    product
                                )
                                : item.price

                    };

                }
            ),

        subtotal:
            calculateCartTotal(),

        shipping:
            shipping,

        total:
            orderTotal,

        paymentMethod:
            payment.value,

        createdAt:
            new Date().toISOString()

    };


    console.log(
        "FOOTWORLD ORDER:",
        orderData
    );


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
           COUNTRY FIRST
        */

        checkCountryGate();


        /*
           COUNTRY SELECTED
        */

        if (currentCountry) {

            /*
               FIX OLD CART PRICES
            */

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
