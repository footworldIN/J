/* =========================================================
   FOOTWORLD
   COUNTRY FIRST + PRODUCTS + CART
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
   STATE
   ========================================================= */

let currentCountry = null;
let cart = [];
let selectedProduct = null;
let selectedSize = null;
let modalQuantity = 1;


/* =========================================================
   LOAD CART
   ========================================================= */

try {
    const savedCart = localStorage.getItem("footworldCart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (!Array.isArray(cart)) {
        cart = [];
    }

} catch (error) {
    cart = [];
}


/* =========================================================
   PRICE
   ========================================================= */

function formatPrice(amount) {

    const settings = countrySettings[currentCountry];

    if (!settings) {
        return "";
    }

    const decimals = currentCountry === "IN" ? 0 : 2;

    return settings.symbol +
        Number(amount).toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
}


function getProductPrice(product) {

    if (!product || !product.prices) {
        return 0;
    }

    return Number(product.prices[currentCountry]) || 0;
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

    return `
        <article class="product-card">

            <div
                class="product-image-wrapper"
                onclick="openProductModal(${product.id})"
            >

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/800x1000?text=FOOTWORLD';"
                >

            </div>

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

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

    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    const sectionProducts = products.filter(
        product => product.section === sectionName
    );

    if (sectionProducts.length === 0) {

        container.innerHTML = "";

        return;
    }

    container.innerHTML = sectionProducts
        .map(createProductCard)
        .join("");
}


/* =========================================================
   RENDER ALL
   ========================================================= */

function renderAllProducts() {

    renderProductSection("formal", "productGrid");

    renderProductSection("new", "newProducts");

    renderProductSection("loafers", "loaferProducts");

    renderProductSection("boys", "boysProducts");
}


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function openProductModal(productId) {

    const product = products.find(
        item => item.id === Number(productId)
    );

    if (!product) {
        return;
    }

    selectedProduct = product;
    selectedSize = null;
    modalQuantity = 1;

    const modal = document.getElementById("productModal");

    if (!modal) {
        return;
    }

    const image = document.getElementById("modalProductImage");
    const category = document.getElementById("modalProductCategory");
    const name = document.getElementById("modalProductName");
    const price = document.getElementById("modalProductPrice");
    const quantity = document.getElementById("modalQuantity");
    const sizeOptions = document.getElementById("sizeOptions");

    if (image) {
        image.src = product.image;
        image.alt = product.name;
    }

    if (category) {
        category.textContent = product.category;
    }

    if (name) {
        name.textContent = product.name;
    }

    if (price) {
        price.textContent = formatPrice(
            getProductPrice(product)
        );
    }

    if (quantity) {
        quantity.textContent = "1";
    }

    if (sizeOptions) {

        sizeOptions.innerHTML = product.sizes
            .map(size => `
                <button
                    type="button"
                    class="size-option"
                    onclick="selectProductSize('${size}', this)"
                >
                    ${size}
                </button>
            `)
            .join("");
    }

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================================
   CLOSE PRODUCT MODAL
   ========================================================= */

function closeProductModal() {

    const modal = document.getElementById("productModal");

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

    document.querySelectorAll(".size-option").forEach(
        option => option.classList.remove("selected")
    );

    if (button) {
        button.classList.add("selected");
    }
}


/* =========================================================
   QUANTITY
   ========================================================= */

function changeModalQuantity(amount) {

    modalQuantity += Number(amount);

    if (modalQuantity < 1) {
        modalQuantity = 1;
    }

    if (modalQuantity > 20) {
        modalQuantity = 20;
    }

    const quantity = document.getElementById("modalQuantity");

    if (quantity) {
        quantity.textContent = modalQuantity;
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

        alert("Please select a size.");

        return;
    }

    const existing = cart.find(item =>
        item.productId === selectedProduct.id &&
        item.size === selectedSize
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
            price: getProductPrice(selectedProduct)
        });
    }

    saveCart();
    updateCartUI();

    closeProductModal();

    openCart();
}


/* =========================================================
   CART STORAGE
   ========================================================= */

function saveCart() {

    localStorage.setItem(
        "footworldCart",
        JSON.stringify(cart)
    );
}


/* =========================================================
   CART
   ========================================================= */

function openCart() {

    const overlay = document.getElementById("cartOverlay");

    if (overlay) {
        overlay.classList.add("active");
    }
}


function closeCart() {

    const overlay = document.getElementById("cartOverlay");

    if (overlay) {
        overlay.classList.remove("active");
    }
}


function removeCartItem(index) {

    if (index < 0 || index >= cart.length) {
        return;
    }

    cart.splice(index, 1);

    saveCart();
    updateCartUI();
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


function calculateCartCount() {

    return cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );
}


/* =========================================================
   CART UI
   ========================================================= */

function updateCartUI() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    if (cartCount) {
        cartCount.textContent = calculateCartCount();
    }

    if (cartTotal && currentCountry) {
        cartTotal.textContent =
            formatPrice(calculateCartTotal());
    }

    if (!cartItems) {
        return;
    }

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
            </p>
        `;

        return;
    }

    cartItems.innerHTML = cart.map(
        (item, index) => `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="this.onerror=null;this.src='https://placehold.co/200x250?text=FOOTWORLD';"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>${item.category}</p>

                    <p>Size: ${item.size}</p>

                    <p>Quantity: ${item.quantity}</p>

                    <strong>
                        ${formatPrice(
                            Number(item.price) *
                            Number(item.quantity)
                        )}
                    </strong>

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
   COUNTRY SELECTION
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

    updateCountryUI();

    renderAllProducts();

    updateCartUI();

    updatePaymentMethods();

    updateCheckoutTotal();

    hideCountrySelector();
}


/* =========================================================
   OLD FUNCTION SUPPORT
   ========================================================= */

function selectCountry(country) {

    selectShoppingCountry(country);
}


/* =========================================================
   HIDE COUNTRY SCREEN
   ========================================================= */

function hideCountrySelector() {

    const gate = document.getElementById("countryGate");
    const selector = document.getElementById("countrySelector");

    if (gate) {
        gate.classList.remove("active");
        gate.style.display = "none";
    }

    if (selector) {
        selector.classList.remove("active");
        selector.style.display = "none";
    }

    document.body.classList.remove("country-selection-active");
}


/* =========================================================
   SHOW COUNTRY SCREEN
   ========================================================= */

function showCountrySelector() {

    const gate = document.getElementById("countryGate");
    const selector = document.getElementById("countrySelector");

    document.body.classList.add("country-selection-active");

    if (gate) {
        gate.style.display = "flex";
        gate.classList.add("active");
    }

    if (selector) {
        selector.style.display = "flex";
        selector.classList.add("active");
    }
}


/* =========================================================
   COUNTRY CHECK
   ========================================================= */

function checkCountryGate() {

    const saved = localStorage.getItem(
        "footworldCountry"
    );

    if (
        saved &&
        countrySettings[saved]
    ) {

        currentCountry = saved;

        hideCountrySelector();

    } else {

        currentCountry = null;

        showCountrySelector();
    }
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
        document.getElementById("headerCountryFlag");

    const name =
        document.getElementById("headerCountryName");

    const customerCountry =
        document.getElementById("customerCountry");

    const currencyNotice =
        document.getElementById("currencyNotice");

    if (flag) {
        flag.textContent = settings.flag;
    }

    if (name) {
        name.textContent = settings.name;
    }

    if (customerCountry) {
        customerCountry.value = currentCountry;
    }

    if (currencyNotice) {
        currencyNotice.textContent =
            `Prices shown in ${settings.currency}`;
    }
}


/* =========================================================
   CHANGE COUNTRY
   ========================================================= */

function changeCountry() {

    showCountrySelector();
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function openCheckout() {

    if (cart.length === 0) {

        alert("Your bag is empty.");

        return;
    }

    const checkout =
        document.getElementById("checkoutOverlay");

    if (checkout) {

        checkout.classList.add("active");

        updateCheckoutTotal();
        updatePaymentMethods();
    }
}


function closeCheckout() {

    const checkout =
        document.getElementById("checkoutOverlay");

    if (checkout) {
        checkout.classList.remove("active");
    }
}


/* =========================================================
   CHECKOUT TOTAL
   ========================================================= */

function updateCheckoutTotal() {

    if (!currentCountry) {
        return;
    }

    const total =
        document.getElementById("checkoutTotal");

    const notice =
        document.getElementById("currencyNotice");

    if (total) {

        total.textContent =
            formatPrice(
                calculateCartTotal()
            );
    }

    if (notice) {

        notice.textContent =
            `Prices shown in ${countrySettings[currentCountry].currency}`;
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
        document.getElementById("indiaPayments");

    const canada =
        document.getElementById("canadaPayments");

    const international =
        document.getElementById("internationalPayments");

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
   COUNTRY FROM CHECKOUT
   ========================================================= */

function countryChanged() {

    const select =
        document.getElementById("customerCountry");

    if (!select) {
        return;
    }

    const country = select.value;

    if (!countrySettings[country]) {
        return;
    }

    currentCountry = country;

    localStorage.setItem(
        "footworldCountry",
        country
    );

    updateCountryUI();

    renderAllProducts();

    updateCartUI();

    updatePaymentMethods();

    updateCheckoutTotal();
}


/* =========================================================
   PLACE ORDER
   ========================================================= */

function placeOrder() {

    if (cart.length === 0) {

        alert("Your bag is empty.");

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

    const pin =
        document.getElementById("customerPin")?.value.trim();

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

    console.log({
        customer: name,
        email: email,
        phone: phone,
        country: currentCountry,
        payment: payment.value,
        total: calculateCartTotal(),
        items: cart
    });
}


/* =========================================================
   OUTSIDE CLICK
   ========================================================= */

document.addEventListener("click", function(event) {

    const productModal =
        document.getElementById("productModal");

    if (
        productModal &&
        event.target === productModal
    ) {
        closeProductModal();
    }

    const cartOverlay =
        document.getElementById("cartOverlay");

    if (
        cartOverlay &&
        event.target === cartOverlay
    ) {
        closeCart();
    }

    const checkoutOverlay =
        document.getElementById("checkoutOverlay");

    if (
        checkoutOverlay &&
        event.target === checkoutOverlay
    ) {
        closeCheckout();
    }

});


/* =========================================================
   ESC
   ========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeProductModal();
        closeCart();
        closeCheckout();
    }

});


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
         * IMPORTANT:
         * Country is checked FIRST.
         */

        checkCountryGate();

        /*
         * Only render prices/products
         * when a country exists.
         */

        if (currentCountry) {

            updateCountryUI();

            renderAllProducts();

            updateCartUI();

            updatePaymentMethods();

            updateCheckoutTotal();
        }

    }
);
