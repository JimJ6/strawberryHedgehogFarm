'use strict'

const checkoutSummary = document.getElementById('checkout-summary--body');
const subtotalRow = document.querySelector(".checkout_summary-sub-total--row");
const deliveryMethodRadioBtns = document.querySelectorAll(".delivery-methods--radio-btn");
const collectionBtn = document.querySelector(".checkout_delivery-collection--info");
const summaryDeliveryOrCollectionEl = document.querySelector(".checkout--delivery-or-collect");
const deliveryFee = document.querySelector(".delivery-or-collect--fee");
const CheckoutTotal = document.querySelector(".checkout--total--fee");

const cart = JSON.parse(localStorage.getItem('cartData'));
const itemTotals = cart.map(({ price, amount }) => (price * amount).toFixed(2));
const subTotal = itemTotals.reduce((accum, itemTotal) => Number(accum) + Number(itemTotal));

const total = () => {
    CheckoutTotal.textContent = (parseFloat(subTotal) + parseFloat(deliveryFee.innerHTML.slice(1))).toFixed(2);
}


// Display collection option info
deliveryMethodRadioBtns.forEach(btn =>
    btn.addEventListener('change', (e) => {
        if (e.target.id === "nationwide") {
            collectionBtn.style.display = "none";
            summaryDeliveryOrCollectionEl.textContent = "Delivery:";
            deliveryFee.textContent = "€8.50";
        } else {
            collectionBtn.style.display = "flex";
            summaryDeliveryOrCollectionEl.textContent = "Collection:";
            deliveryFee.textContent = "€0.00";
        }
        total()
    })
)

// Render Checkout summary table content
cart.forEach(({ image, item, quantity, price, amount, description }) => {
    const itemRow = document.createElement("tr");
    const imageTd = createTdWithImage(image, description);
    const productNameTd = createTdWithText(item, 'checkout--product-name');
    const quantityTd = createTdWithText(quantity, 'checkout-quantity');
    const priceTd = createTdWithText(`€${price}`, "checkout-price", "text-right");
    const itemTotal = `€${(price * amount).toFixed(2)}`;
    const itemTotalTd = createTdWithText(itemTotal, "checkout_item-total", "text-right");

    itemRow.append(imageTd, productNameTd, quantityTd, priceTd, itemTotalTd);
    checkoutSummary.insertBefore(itemRow, subtotalRow);
});

function createTdWithImage(src, alt) {
    const imageTd = document.createElement("td");
    const imageContainer = document.createElement("div");
    const itemImage = document.createElement("img");
    itemImage.src = src;
    itemImage.alt = alt;
    imageContainer.classList.add("checkout-image");
    imageContainer.appendChild(itemImage);
    imageTd.appendChild(imageContainer);
    return imageTd;
};

function createTdWithText(text, className, ...classList) {
    const td = document.createElement("td");
    td.classList.add(className, ...classList);
    td.textContent = text;
    return td;
};