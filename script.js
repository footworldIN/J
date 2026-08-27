/* =========================================
   FOOTWORLD
   PRODUCT + CART + WHATSAPP SYSTEM
========================================= */


/* =========================================
   WHATSAPP NUMBER
   CHANGE ONLY THIS NUMBER LATER
========================================= */

const WHATSAPP_NUMBER = "913653244745";


/* =========================================
   PRODUCT DATABASE
========================================= */

const products = [

    {
        id: 1,
        name: "Classic Black Oxford",
        category: "Men",
        type: "Formal Shoes",
        price: 1499,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 2,
        name: "Executive Leather Loafer",
        category: "Men",
        type: "Loafers",
        price: 1699,
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 3,
        name: "Premium Brown Derby",
        category: "Men",
        type: "Formal Shoes",
        price: 1799,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 4,
        name: "Classic Black Loafer",
        category: "Men",
        type: "Loafers",
        price: 1399,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 5,
        name: "Boys Formal Classic",
        category: "Boys",
        type: "Formal Shoes",
        price: 999,
        image: "https://images.unsplash.com/photo-1528569937393-ee892b976859?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 6,
        name: "Boys Premium Loafer",
        category: "Boys",
        type: "Loafers",
        price: 1099,
        image: "https://images.unsplash.com/photo-1528569937393-ee892b976859?auto=format&fit=crop&w=900&q=85"
    }

];


/* =========================================
   CART
========================================= */

let cart = [];


/* =========================================
   LOAD PRODUCTS
========================================= */

function loadProducts() {

    const productGrid =
        document.getElementById("productGrid");

    const newProducts =
        document.getElementById("newProducts");


    if (!productGrid) return;


    productGrid.innerHTML = "";


    products.forEach(product => {

        productGrid.innerHTML += createProductCard(product);

    });


    if (newProducts) {

        newProducts.innerHTML = "";

        products.slice(0, 4).forEach(product => {

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
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button
                    class="product-action"
                    onclick="addToCart(${product.id})"
                >
                    ADD TO BAG
                </button>

            </div>

        </article>

    `;

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);


    if (!product) return;


    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1,

            size: null

        });

    }


    updateCart();

    openCart();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


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

        cartTotal.textContent = "₹0";

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((item, index) => {

        total +=
            item.price *
            item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Size:
                        ${item.size || "Not selected"}
                    </p>

                    <p>
                        Qty:
                        ${item.quantity}
                    </p>

                    <p>
                        ₹${(
                            item.price *
                            item.quantity
                        ).toLocaleString("en-IN")}
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

    });


    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    const overlay =
        document.getElementById("cartOverlay");

    overlay.classList.add("active");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    const overlay =
        document.getElementById("cartOverlay");

    overlay.classList.remove("active");

}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty. Please add a product first."
        );

        return;

    }


    let message =
        "Hello FOOTWORLD,%0A%0A";

    message +=
        "I would like to place an order:%0A%0A";


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        message +=
            `Product: ${encodeURIComponent(item.name)}%0A`;

        message +=
            `Size: ${encodeURIComponent(item.size || "To be confirmed")}%0A`;

        message +=
            `Quantity: ${item.quantity}%0A`;

        message +=
            `Price: ₹${item.price}%0A%0A`;

    });


    message +=
        `TOTAL: ₹${total}%0A%0A`;

    message +=
        "Please send me the delivery details and payment options.";


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

        loadProducts();

        updateCart();

    }
);
