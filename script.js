/* =========================================
   FOOTWORLD
   PRODUCT + CART + SIZE SYSTEM
========================================= */


/* =========================================
   WHATSAPP NUMBER
   CHANGE THIS LATER
========================================= */

const WHATSAPP_NUMBER = "913653244745";


/* =========================================
   PRODUCTS
========================================= */

const products = [

    {
        id: 1,
        name: "Classic Black Oxford",
        category: "Men",
        type: "Formal Shoes",
        price: 1499,

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 2,
        name: "Executive Leather Loafer",
        category: "Men",
        type: "Loafers",
        price: 1699,

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 3,
        name: "Premium Brown Derby",
        category: "Men",
        type: "Formal Shoes",
        price: 1799,

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 4,
        name: "Classic Black Loafer",
        category: "Men",
        type: "Loafers",
        price: 1399,

        sizes: [6, 7, 8, 9, 10, 11],

        image:
            "https://images.unsplash.com/photo-1614252235316-8c857d1c9b8e?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 5,
        name: "Boys Formal Classic",
        category: "Boys",
        type: "Formal Shoes",
        price: 999,

        sizes: [10, 11, 12, 13, 1, 2, 3, 4, 5],

        image:
            "https://images.unsplash.com/photo-1528569937393-ee892b976859?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 6,
        name: "Boys Premium Loafer",
        category: "Boys",
        type: "Loafers",
        price: 1099,

        sizes: [10, 11, 12, 13, 1, 2, 3, 4, 5],

        image:
            "https://images.unsplash.com/photo-1528569937393-ee892b976859?auto=format&fit=crop&w=900&q=85"
    }

];


/* =========================================
   CART
========================================= */

let cart = [];


/* =========================================
   MODAL STATE
========================================= */

let selectedProduct = null;

let selectedSize = null;

let modalQuantity = 1;


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

        productGrid.innerHTML +=
            createProductCard(product);

    });


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

                    ₹${product.price.toLocaleString("en-IN")}

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
   OPEN PRODUCT MODAL
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


    document.getElementById(
        "modalProductImage"
    ).src = product.image;


    document.getElementById(
        "modalProductImage"
    ).alt = product.name;


    document.getElementById(
        "modalProductName"
    ).textContent = product.name;


    document.getElementById(
        "modalProductCategory"
    ).textContent =
        `${product.category} · ${product.type}`;


    document.getElementById(
        "modalProductPrice"
    ).textContent =
        `₹${product.price.toLocaleString("en-IN")}`;


    document.getElementById(
        "modalQuantity"
    ).textContent = modalQuantity;


    loadSizes(product);


    document.getElementById(
        "productModal"
    ).classList.add("active");

}


/* =========================================
   CLOSE PRODUCT MODAL
========================================= */

function closeProductModal() {

    document.getElementById(
        "productModal"
    ).classList.remove("active");

}


/* =========================================
   LOAD SIZES
========================================= */

function loadSizes(product) {

    const container =
        document.getElementById("sizeOptions");


    container.innerHTML = "";


    product.sizes.forEach(size => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "size-option";


        button.textContent =
            size;


        button.onclick = function () {

            selectSize(size, button);

        };


        container.appendChild(button);

    });

}


/* =========================================
   SELECT SIZE
========================================= */

function selectSize(size, button) {

    selectedSize = size;


    document
        .querySelectorAll(".size-option")
        .forEach(option => {

            option.classList.remove(
                "selected"
            );

        });


    button.classList.add(
        "selected"
    );

}


/* =========================================
   CHANGE MODAL QUANTITY
========================================= */

function changeModalQuantity(amount) {

    modalQuantity += amount;


    if (modalQuantity < 1) {

        modalQuantity = 1;

    }


    if (modalQuantity > 10) {

        modalQuantity = 10;

    }


    document.getElementById(
        "modalQuantity"
    ).textContent = modalQuantity;

}


/* =========================================
   ADD SELECTED PRODUCT
========================================= */

function addSelectedProductToCart() {

    if (!selectedProduct) return;


    if (!selectedSize) {

        alert(
            "Please select a size before adding to your bag."
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

            id: selectedProduct.id,

            name: selectedProduct.name,

            category: selectedProduct.category,

            type: selectedProduct.type,

            price: selectedProduct.price,

            image: selectedProduct.image,

            size: selectedSize,

            quantity: modalQuantity

        });

    }


    updateCart();

    closeProductModal();

    openCart();

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


    cartCount.textContent =
        totalQuantity;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your bag is empty.

            </p>

        `;


        cartTotal.textContent =
            "₹0";


        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(
        (item, index) => {

            total +=
                item.price *
                item.quantity;


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

        }
    );


    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


/* =========================================
   REMOVE CART ITEM
========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty."
        );

        return;

    }


    let message =
        "Hello FOOTWORLD,%0A%0A";


    message +=
        "I would like to place an order.%0A%0A";


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        message +=
            `Product: ${encodeURIComponent(item.name)}%0A`;

        message +=
            `Size: ${encodeURIComponent(item.size)}%0A`;

        message +=
            `Quantity: ${item.quantity}%0A`;

        message +=
            `Price: ₹${item.price}%0A%0A`;

    });


    message +=
        `TOTAL: ₹${total}%0A%0A`;


    message +=
        "Please confirm my order and send delivery details.";


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
