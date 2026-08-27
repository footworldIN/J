/* =========================================================
   FOOTWORLD - COUNTRY & CURRENCY SYSTEM
========================================================= */

const COUNTRY_SETTINGS = {
    IN: {
        name: "India",
        flag: "🇮🇳",
        currency: "INR",
        symbol: "₹",
        locale: "en-IN"
    },

    CA: {
        name: "Canada",
        flag: "🇨🇦",
        currency: "CAD",
        symbol: "$",
        locale: "en-CA"
    },

    US: {
        name: "United States",
        flag: "🇺🇸",
        currency: "USD",
        symbol: "$",
        locale: "en-US"
    },

    GB: {
        name: "United Kingdom",
        flag: "🇬🇧",
        currency: "GBP",
        symbol: "£",
        locale: "en-GB"
    },

    AU: {
        name: "Australia",
        flag: "🇦🇺",
        currency: "AUD",
        symbol: "$",
        locale: "en-AU"
    },

    DE: {
        name: "Germany",
        flag: "🇩🇪",
        currency: "EUR",
        symbol: "€",
        locale: "de-DE"
    }
};


/* =========================================================
   CURRENT COUNTRY
========================================================= */

let selectedCountry =
    localStorage.getItem("footworldCountry") || null;


/* =========================================================
   SELECT COUNTRY
========================================================= */

function selectShoppingCountry(countryCode) {

    if (!COUNTRY_SETTINGS[countryCode]) {
        console.error("Invalid country:", countryCode);
        return;
    }

    selectedCountry = countryCode;

    localStorage.setItem(
        "footworldCountry",
        countryCode
    );

    updateCountryDisplay();

    updateAllPrices();

    updatePaymentMethods();

    const selector =
        document.getElementById("countrySelector");

    if (selector) {
        selector.classList.remove("active");
        selector.style.display = "none";
    }
}


/* =========================================================
   CHANGE COUNTRY
========================================================= */

function changeCountry() {

    const selector =
        document.getElementById("countrySelector");

    if (!selector) return;

    selector.style.display = "flex";
    selector.classList.add("active");
}


/* =========================================================
   UPDATE HEADER COUNTRY
========================================================= */

function updateCountryDisplay() {

    if (!selectedCountry) return;

    const country =
        COUNTRY_SETTINGS[selectedCountry];

    const flag =
        document.getElementById("headerCountryFlag");

    const name =
        document.getElementById("headerCountryName");

    if (flag) {
        flag.textContent = country.flag;
    }

    if (name) {
        name.textContent = country.name;
    }

    const countrySelect =
        document.getElementById("customerCountry");

    if (countrySelect) {
        countrySelect.value = selectedCountry;
    }
}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(amount) {

    if (!selectedCountry) {
        selectedCountry = "CA";
    }

    const country =
        COUNTRY_SETTINGS[selectedCountry];

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
   UPDATE PRODUCT PRICES
========================================================= */

function updateAllPrices() {

    document.querySelectorAll(
        "[data-price]"
    ).forEach(element => {

        const price =
            Number(element.dataset.price);

        if (!isNaN(price)) {
            element.textContent =
                formatPrice(price);
        }

    });

    updateCartTotal();

    updateCheckoutTotal();
}


/* =========================================================
   UPDATE PAYMENT METHODS
========================================================= */

function updatePaymentMethods() {

    if (!selectedCountry) return;

    const india =
        document.getElementById("indiaPayments");

    const canada =
        document.getElementById("canadaPayments");

    const international =
        document.getElementById("internationalPayments");

    if (india) india.style.display = "none";
    if (canada) canada.style.display = "none";
    if (international) international.style.display = "none";

    if (selectedCountry === "IN") {

        if (india) {
            india.style.display = "block";
        }

    } else if (selectedCountry === "CA") {

        if (canada) {
            canada.style.display = "block";
        }

    } else {

        if (international) {
            international.style.display = "block";
        }

    }

    updateCurrencyNotice();
}


/* =========================================================
   CURRENCY NOTICE
========================================================= */

function updateCurrencyNotice() {

    const notice =
        document.getElementById("currencyNotice");

    if (!notice || !selectedCountry) return;

    const country =
        COUNTRY_SETTINGS[selectedCountry];

    notice.textContent =
        `Prices shown in ${country.currency}`;
}


/* =========================================================
   CUSTOMER COUNTRY CHANGE
========================================================= */

function countryChanged() {

    const select =
        document.getElementById("customerCountry");

    if (!select) return;

    const country =
        select.value;

    if (!COUNTRY_SETTINGS[country]) return;

    selectedCountry = country;

    localStorage.setItem(
        "footworldCountry",
        country
    );

    updateCountryDisplay();

    updateAllPrices();

    updatePaymentMethods();
}


/* =========================================================
   START COUNTRY SYSTEM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * If customer already selected a country,
         * use it.
         */

        if (selectedCountry) {

            updateCountryDisplay();

            updateAllPrices();

            updatePaymentMethods();

        }

    }
);
