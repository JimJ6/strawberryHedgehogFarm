'use strict'

const parentContainer = document.getElementById('cart--container');
const cartItemsContainer = document.querySelector('.cart-items--container');
const subTotalValue = document.querySelector('.cart--subtotal-value');
const itemDiv = document.querySelector('.cart--item');


// Get cart data from local storage
const cart = JSON.parse(localStorage.getItem('cartData')) || [];

//API
const API_URL = `https://farm-shop-inventory-api.herokuapp.com/shopData`;

// Render cart items



function renderCart() {
    if (cart.length == 0) {
        parentContainer.innerHTML = `
        <div class="cart__empty-cart">
        <span>Your cart is empty! :( </span>
        <a href="/shop.html"><button class="btn ">Visit our shop</button></a>
        </div>
        `
    } else {
        cartItemsContainer.innerHTML = cart.map((x) => {
            let { id, image, item, price, quantity, description, amount } = x;

            const markup = `
                <div id="${id}" class="cart--item">
                    <figure class="cart--img">
                        <img src="${image}" alt="product image" />
                    </figure>
                    <div class="cart__product--wrapper">
                        <p id=${id} class="cart__product">${item}, ${quantity}</p>
                    </div>
                    <div class="cart--description">
                        <p>${description.slice(0, 60)}...</p>
                    </div>
                    <div class="cart--price">
                        <p id="cart--price">€${price}</p>
                    </div>
                    <!-- Counter decr/value/incr -->
                    <div id=${id} class="cart--quant-and-update">
                        <div class="cart--quantity counter--quantity">
                            <button id=${id} class="counter__quant--minus-btn cart__quant--minus-btn" type="button" name="button">
                                <i  class="fa fa-minus" aria-hidden="true"></i>
                            </button>
                            <input id=${id} class="counter--quantity_input cart--quantity_input" type="text" name="name" value="${amount}" readonly />
                            <button id=${id} class="counter__quant--plus-btn cart__quant--plus-btn" type="button" name="button">
                                <i  class="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div id=${id} class="cart--total">
                        <p id="cart--total">€${Number(price * amount).toFixed(2)}</p>
                    </div>
                    <div class="cart__remove--wrapper">
                        <div id=${id} class="cart--remove-item">
                            <i id="cart--delete-item" class="fa-solid fa-trash"></i>
                            <p class="cart__remove--text">Remove</p>
                        </div>
                    </div>
                </div>
                `;

            return markup;

        }).join("");
    }
}
renderCart()


// ===== CALCULATE NUMBER OF ITEMS IN CART AND RENDER NUMBER ON CART ICON =====
const cartIconAmount = document.getElementById('cart-amount');

const updateCartIcon = () => {
    const reducedCartAmount = cart.map((x) => x.amount).reduce((x, y) => x + y, 0);
    cartIconAmount.innerHTML = reducedCartAmount;
};

////    ===== Cart functionality =====
cartItemsContainer.addEventListener('click', (e) => {
    const productLink = e.target.closest('.cart__product')
    const plusButtonTarget = e.target.closest('.cart__quant--plus-btn');
    const minusButtonTarget = e.target.closest('.cart__quant--minus-btn');
    const ItemContainer = e.target.closest('.cart--item');
    const removeItem = e.target.closest('.cart--remove-item');


    //Link to product in cart
    if (productLink) {
        const productCheck = cart.find((x) => x.id === productLink.id);
        const url = `/shop-item.html?product=${productCheck.item}`

        return window.location = url.toLowerCase();
    }

    //DECREASE QUANTITY
    if (minusButtonTarget) {
        const ItemContainer = e.target.closest('.cart--item');
        const itemTotalEl = ItemContainer.querySelector('.cart--total');

        let cartItem = cart.find((x) => x.id === minusButtonTarget.id);
        let currentQuant = cartItem.amount;

        // click minus, decrease amount by 1 (quantity of 1 base number)
        currentQuant <= 1 ? cartItem.amount = 1 : cartItem.amount = currentQuant - 1;
        currentQuant = cartItem.amount;

        // render quantity counter amount
        let counter = minusButtonTarget.nextElementSibling;
        counter.value = cartItem.amount

        localStorage.setItem('cartData', JSON.stringify(cart));
        updateCartIcon()
        updateTotal(cartItem, itemTotalEl)

    }

    //INCREASE QUANTITY
    if (plusButtonTarget) {
        // total element for specific item element
        const itemTotalEl = ItemContainer.querySelector('.cart--total');

        // matches item id with plus button element id
        let cartItem = cart.find((x) => x.id === plusButtonTarget.id);
        let currentQuant;

        // click plus, adds 1
        currentQuant = cartItem.amount + 1;
        cartItem.amount = currentQuant;

        // render quantity counter amount
        let counter = plusButtonTarget.previousElementSibling;
        counter.value = cartItem.amount;

        // update cart object, cart icon counter, and subTotal  
        localStorage.setItem('cartData', JSON.stringify(cart));
        updateCartIcon()
        updateTotal(cartItem, itemTotalEl)
    }

    if (removeItem) {
        ItemContainer.remove()
        const removeFromCart = cart.findIndex((obj) => obj.id === removeItem.id);
        cart.splice(removeFromCart, 1);

        // update cart object, cart icon counter, and subTotal  
        localStorage.setItem('cartData', JSON.stringify(cart));
        updateCartIcon()
        subTotal()
        renderCart()


    }
}, true);

// ===== UPDATE ITEM TOTAL =====
function updateTotal(obj, el) {

    if (obj && el) {
        const quantity = obj.amount;
        const itemPrice = obj.price;
        const curPrice = itemPrice;
        const newPrice = Number(quantity * curPrice).toFixed(2);

        el.innerHTML = "€" + newPrice;
    }
    else {
        // el.innerHTML = "€" + cart.amount
    }
    subTotal()

};


// Render Subtotal
const subTotal = () => {
    const sum = cart.reduce((accum, obj) => {
        return accum + Number(obj.price * obj.amount)
    }, 0);

    subTotalValue.innerHTML = "€" + sum.toFixed(2);
}
subTotal()






// -- MODAL --
const checkoutBtn = document.querySelector(".cart__checkout--btn");
const modal = document.querySelector('.modal');
const modalBackgroundOverlay = document.querySelector('.modal-background--dark-overlay');
const closeModal = document.querySelectorAll('.close-modal');
const modalPromptAmount = document.querySelector(".modal--prompt-amount");
const modalPrompt = document.querySelector(".modal--prompt");
const modalContinueBtn = document.querySelector('.modal-btn--continue');
const modalImg = document.querySelector('.donate-modal-img');


// Open Modal on clicking 'checkout' button
const modalOpen = () => {
    modalBackgroundOverlay.classList.remove('hidden');
    modal.classList.remove('hidden');

    modalPromptAmount.innerHTML = `Your cart total is ${subTotalValue.innerHTML} !`;
};

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOpen();

    });
};

// CLOSE MODAL
const modalClose = () => {
    modal.classList.add('hidden');
    modalBackgroundOverlay.classList.add('hidden');
};

closeModal.forEach(btn => {
    btn.addEventListener('click', () => {
        modalClose()
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalClose()
    };
});


modalContinueBtn.addEventListener('click', () => {
    modalPromptAmount.innerHTML = `Redirecting!`;
    modalImg.classList.add('spin-animation');
    modalPrompt.classList.add('hidden');
    modalContinueBtn.classList.add('hidden');

    setTimeout(() => {
        // modalPromptAmount.innerHTML = `Redirect to payment form, Stripe, Paypal, etc..`;
        // modalImg.classList.add('hidden');
        // modalPrompt.classList.remove('hidden');
        // modalPrompt.innerHTML = "*Based on the clients instructions"
        const url = '/checkout.html'
        return window.location = url;
    }, 3000)
});