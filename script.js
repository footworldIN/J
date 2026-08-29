/* =========================================================
   FOOTWORLD
   PRODUCT + COUNTRY + CART SYSTEM
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
   PRODUCT DATABASE
   =========================================================
   
   TO ADD A NEW PRODUCT:
   
   1. Copy one product below.
   2. Change the ID.
   3. Change name.
   4. Change category.
   5. Change section.
   6. Change prices.
   7. Change image.
   8. Change sizes.

   SECTION OPTIONS:

   "formal"
   "loafers"
   "boys"
   "new"

   ========================================================= */

const products = [

    /* =====================================================
       FORMAL SHOES
       ===================================================== */

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

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11"
        ]
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

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11"
        ]
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

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
        ]
    },


    /* =====================================================
       LOAFERS
       ===================================================== */

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

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11"
        ]
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

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
        ]
    },


    /* =====================================================
       BOYS
       ===================================================== */

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

        sizes: [
            "1",
            "2",
            "3",
            "4",
            "5"
        ]
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

        sizes: [
            "1",
            "2",
            "3",
            "4",
            "5"
        ]
    },


    /* =====================================================
       NEW ARRIVALS
       ===================================================== */

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
   CURRENT COUNTRY
   ========================================================= */

let currentCountry =
    localStorage.getItem("footworldCountry") || "IN";


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
   PRODUCT MODAL STATE
   ========================================================= */

let selectedProduct = null;

let selectedSize = null;

let modalQuantity = 1;


/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatPrice(amount) {

    const settings =
        countrySettings[currentCountry];

    if (!settings) {

        return amount;

    }

    return (
        settings.symbol +
        Number(amount).toLocaleString(
            "en-US",
            {
                minimumFractionDigits:
                    currentCountry === "IN"
                        ? 0
                        : 2,

                maximumFractionDigits:
                    currentCountry === "IN"
                        ? 0
                        : 2
            }
        )
    );
}


/* =========================================================
   GET PRODUCT PRICE
   ========================================================= */

function getProductPrice(product) {

    if (
        product.prices &&
        product.prices[currentCountry] !== undefined
    ) {

        return product.prices[currentCountry];

    }

    return 0;
}


/* =========================================================
   DISPLAY PRODUCT
   ========================================================= */

function createProductCard(product) {

    const price =
        getProductPrice(product);

    return `

        <article
            class="product-card"
            onclick="openProductModal(${product.id})"
        >

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
                    onclick="event.stopPropagation(); openProductModal(${product.id})"
                >
                    VIEW PRODUCT
                </button>

            </div>

        </article>

    `;
}


/* =========================================================
   RENDER PRODUCT SECTION
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

    if (sectionProducts.length === 0) {

        container.innerHTML = `

            <p
                style="
                    grid-column:1/-1;
                    text-align:center;
                    color:#777;
                    padding:40px;
                "
            >
                No products available.
            </p>

        `;

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

    /*
       FORMAL SHOES
    */

    renderProductSection(
        "formal",
        "productGrid"
    );


    /*
       NEW ARRIVALS
    */

    renderProductSection(
        "new",
        "newProducts"
    );


    /*
       OPTIONAL LOAFER CONTAINER

       If you later add:

       <div id="loaferProducts"></div>

       it will automatically work.
    */

    renderProductSection(
        "loafers",
        "loaferProducts"
    );


    /*
       OPTIONAL BOYS CONTAINER

       If you later add:

       <div id="boysProducts"></div>

       it will automatically work.
    */

    renderProductSection(
        "boys",
        "boysProducts"
    );

}


/* =========================================================
   OPEN PRODUCT MODAL
   ========================================================= */

function openProductModal(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
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

    const sizeOptions =
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


    if (sizeOptions) {

        sizeOptions.innerHTML =
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

    document.body.style.overflow =
        "";

    selectedProduct = null;

    selectedSize = null;

}


/* =========================================================
   SELECT SIZE
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
   CHANGE MODAL QUANTITY
   ========================================================= */

function changeModalQuantity(
    amount
) {

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
   ADD SELECTED PRODUCT TO CART
   ========================================================= */

function addSelectedProductToCart() {

    if (!selectedProduct) {

        return;

    }


    if (!selectedSize) {

        alert(
            "Please select a size before adding the product to your bag."
        );

        return;

    }


    const existingItem =
        cart.find(
            item =>
                item.productId ===
                    selectedProduct.id &&
                item.size ===
                    selectedSize &&
                item.country ===
                    currentCountry
        );


    if (existingItem) {

        existingItem.quantity +=
            modalQuantity;

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

}


/* =========================================================
   CART TOTAL
   ========================================================= */

function calculateCartTotal() {

    return cart.reduce(
        (
            total,
            item
        ) => {

            return (
                total +
                (
                    Number(item.price) *
                    Number(item.quantity)
                )
            );

        },
        0
    );

}


/* =========================================================
   CART ITEM COUNT
   ========================================================= */

function calculateCartCount() {

    return cart.reduce(
        (
            total,
            item
        ) => {

            return (
                total +
                Number(item.quantity)
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


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your bag is empty.
            </p>

        `;

        return;

    }


    cartItems.innerHTML =
        cart.map(
            (
                item,
                index
            ) => `

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


/* =========================================================
   COUNTRY SELECTION
   ========================================================= */

function selectShoppingCountry(
    country
) {

    if (
        !countrySettings[country]
    ) {

        return;

    }


    currentCountry =
        country;


    localStorage.setItem(
        "footworldCountry",
        country
    );


    updateCountryUI();

    renderAllProducts();

    updateCartUI();


    const gate =
        document.getElementById(
            "countryGate"
        );

    const selector =
        document.getElementById(
            "countrySelector"
        );


    if (gate) {

        gate.style.display =
            "none";

    }


    if (selector) {

        selector.classList.remove(
            "active"
        );

        selector.style.display =
            "none";

    }

}


/* =========================================================
   BACKWARD COMPATIBILITY
   =========================================================
   
   If your old HTML uses:

   selectCountry('CA')

   this will still work.
   ========================================================= */

function selectCountry(
    country
) {

    selectShoppingCountry(
        country
    );

}


/* =========================================================
   UPDATE COUNTRY DISPLAY
   ========================================================= */

function updateCountryUI() {

    const settings =
        countrySettings[
            currentCountry
        ];

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


    if (flag) {

        flag.textContent =
            settings.flag;

    }


    if (name) {

        name.textContent =
            settings.name;

    }


    const customerCountry =
        document.getElementById(
            "customerCountry"
        );


    if (customerCountry) {

        customerCountry.value =
            currentCountry;

    }


    const currencyNotice =
        document.getElementById(
            "currencyNotice"
        );


    if (currencyNotice) {

        currencyNotice.textContent =
            `Prices shown in ${settings.currency}`;

    }

}


/* =========================================================
   CHANGE COUNTRY
   ========================================================= */

function changeCountry() {

    const selector =
        document.getElementById(
            "countrySelector"
        );

    if (selector) {

        selector.style.display =
            "flex";

        selector.classList.add(
            "active"
        );

    }

}


/* =========================================================
   CHECK COUNTRY ON FIRST VISIT
   ========================================================= */

function checkCountryGate() {

    const savedCountry =
        localStorage.getItem(
            "footworldCountry"
        );


    const gate =
        document.getElementById(
            "countryGate"
        );


    const selector =
        document.getElementById(
            "countrySelector"
        );


    /*
       Existing customer:
       do not show country screen again.
    */

    if (
        savedCountry &&
        countrySettings[savedCountry]
    ) {

        currentCountry =
            savedCountry;


        if (gate) {

            gate.style.display =
                "none";

        }


        if (selector) {

            selector.style.display =
                "none";

            selector.classList.remove(
                "active"
            );

        }

        return;

    }


    /*
       First visit:
       show country selector.
    */

    if (gate) {

        gate.style.display =
            "flex";

    }


    if (selector) {

        selector.style.display =
            "flex";

        selector.classList.add(
            "active"
        );

    }

}


/* =========================================================
   COUNTRY CHANGE FROM CHECKOUT
   ========================================================= */

function countryChanged() {

    const select =
        document.getElementById(
            "customerCountry"
        );


    if (!select) {

        return;

    }


    const country =
        select.value;


    if (
        !countrySettings[country]
    ) {

        return;

    }


    currentCountry =
        country;


    localStorage.setItem(
        "footworldCountry",
        country
    );


    updateCountryUI();

    renderAllProducts();

    updateCartUI();

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
   UPDATE CHECKOUT TOTAL
   ========================================================= */

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


    if (notice) {

        notice.textContent =
            `Prices shown in ${countrySettings[currentCountry].currency}`;

    }

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
            (
                currentCountry !== "IN" &&
                currentCountry !== "CA"
            )
                ? "block"
                : "none";

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


    /*
       Temporary order confirmation.

       We can connect this later to:
       - WhatsApp
       - Email
       - Square
       - Database
       - Admin dashboard
    */


    let message =
        "FOOTWORLD ORDER\n\n";


    message +=
        `Customer: ${name}\n`;

    message +=
        `Email: ${email}\n`;

    message +=
        `Phone: ${phone}\n`;

    message +=
        `Country: ${countrySettings[currentCountry].name}\n\n`;


    message +=
        "PRODUCTS:\n";


    cart.forEach(
        item => {

            message +=
                `${item.name} | Size ${item.size} | Qty ${item.quantity} | ${formatPrice(item.price * item.quantity)}\n`;

        }
    );


    message +=
        `\nTOTAL: ${formatPrice(calculateCartTotal())}\n`;

    message +=
        `PAYMENT: ${payment.value}\n\n`;

    message +=
        `ADDRESS: ${address}, ${city}, ${state}, ${pin}`;


    /*
       Show order confirmation for now.
    */

    alert(
        "Your order has been prepared.\n\n" +
        "FOOTWORLD will contact you to confirm the order."
    );


    console.log(
        message
    );

}


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
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
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeProductModal();

            closeCart();

            closeCheckout();

        }

    }
);


/* =========================================================
   INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        checkCountryGate();

        updateCountryUI();

        renderAllProducts();

        updateCartUI();

        updatePaymentMethods();

        updateCheckoutTotal();

    }
);
