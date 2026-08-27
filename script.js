/* =========================================
   FOOTWORLD
   COMPLETE PRODUCT + CART + CHECKOUT SYSTEM
========================================= */


/* =========================================
   WHATSAPP NUMBER
   CHANGE THIS ONE LINE LATER
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
   PRODUCT MODAL STATE
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
   CLOSE PRODUCT
========================================= */

function closeProductModal() {

    document
        .getElementById("productModal")
        .classList.remove("active");

}


/* =========================================
   LOAD SIZES
========================================= */

function loadSizes(product) {

    const container =
        document.getElementById(
            "sizeOptions"
        );


    container.innerHTML = "";


    product.sizes.forEach(size => {

        const button =
            document.createElement("button");


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


    document.getElementById(
        "modalQuantity"
    ).textContent =
        modalQuantity;

}


/* =========================================
   ADD PRODUCT TO CART
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

            id: selectedProduct.id,

            name: selectedProduct.name,

            category:
                selectedProduct.category,

            type:
                selectedProduct.type,

            price:
                selectedProduct.price,

            image:
                selectedProduct.image,

            size:
                selectedSize,

            quantity:
                modalQuantity

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
                            Size:
                            ${item.size}
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


    document
        .getElementById(
            "checkoutOverlay"
        )
        .classList.add("active");


    closeCart();

}


/* =========================================
   CLOSE CHECKOUT
========================================= */

function closeCheckout() {

    document
        .getElementById(
            "checkoutOverlay"
        )
        .classList.remove("active");

}


/* =========================================
   CHECKOUT TOTAL
========================================= */

function updateCheckoutTotal() {

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

    });


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


/* =========================================
   PLACE ORDER
========================================= */

function placeOrder() {


    /* -----------------------------
       GET FORM VALUES
    ----------------------------- */

    const name =
        document.getElementById(
            "customerName"
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


    if (!/^[6-9][0-9]{9}$/.test(phone)) {

        alert(
            "Please enter a valid 10 digit Indian mobile number."
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


    if (!/^[0-9]{6}$/.test(pin)) {

        alert(
            "Please enter a valid 6 digit PIN code."
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
       CALCULATE TOTAL
    ----------------------------- */

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

    });


    /* -----------------------------
       WHATSAPP MESSAGE
    ----------------------------- */

    let message = "";

    message +=
        `*FOOTWORLD ORDER*%0A%0A`;


    message +=
        `Order No: ${orderNumber}%0A%0A`;


    message +=
        `*CUSTOMER DETAILS*%0A`;


    message +=
        `Name: ${encodeURIComponent(name)}%0A`;


    message +=
        `Mobile: ${encodeURIComponent(phone)}%0A%0A`;


    message +=
        `*DELIVERY ADDRESS*%0A`;


    message +=
        `${encodeURIComponent(address)}%0A`;


    message +=
        `${encodeURIComponent(city)}, ${encodeURIComponent(state)} - ${encodeURIComponent(pin)}%0A`;


    if (landmark) {

        message +=
            `Landmark: ${encodeURIComponent(landmark)}%0A`;

    }


    message +=
        `%0A*ORDER DETAILS*%0A`;


    cart.forEach(item => {

        message +=
            `%0A${encodeURIComponent(item.name)}%0A`;


        message +=
            `Size: ${encodeURIComponent(item.size)}%0A`;


        message +=
            `Quantity: ${item.quantity}%0A`;


        message +=
            `Price: ₹${item.price}%0A`;

    });


    message +=
        `%0A*TOTAL: ₹${total.toLocaleString("en-IN")}*%0A`;


    message +=
        `Payment: ${encodeURIComponent(payment.value)}%0A%0A`;


    message +=
        `Please confirm my FOOTWORLD order.`;


    /* -----------------------------
       WHATSAPP
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

        loadProducts();

        updateCart();

    }
);
