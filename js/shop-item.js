'use strict'

const parentContainer = document.getElementById('shop-item--section');

//Get local storage data, OR, empty array 
let cart = JSON.parse(localStorage.getItem("cartData")) || [];

// -- API -- // 
const API_URL = `/api/db.json`;

// Render product based on div clicked in shop.html
export async function renderItem() {
  try {
    const res = await fetch(API_URL);
    let data = await res.json();
    data = data.shopData

    // grab item query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('product');

    // Match query parameter with product, render markup
    if (product) {

      const productSearch = data.filter(p => p.item.toLowerCase() === product)
      let { id, image, item, price, quantity, desc } = productSearch[0];
      console.log(productSearch[0].item);
      const markup = `
      <div id=${id} class="shop-item--container">
        <figure id="shop-item--image">
          <img class="shop-item--img-src" src="${image}" alt="" />
        </figure>
        <div class="shop-item--details text-container">
          <h2 class="shop-item--title">${item}, ${quantity}</h2>
          <p class="shop-item--description">
            ${desc}
          </p>
          <div class="shop-item--quant-price">
            <div class="shop-item--price_tag">
                <span class="shop__product--price shop-item--total_price" value="${price}" data-price="${price}" itemprop="price"> €${price}</span>
            </div>
            <div class="counter--quantity">
              <button class="counter__quant--minus-btn" type="button" name="button">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </button>
              <input class="counter--quantity_input" id="${id}" type="text" name="name" data-title="${item}" data-quantity="${quantity}" value="1" readonly/>
              <button class="counter__quant--plus-btn" type="button" name="button">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div id="add-to-cart" class="shop-item--add-cart btn">
            <i class="fa-solid fa-cart-shopping icon"></i>
            <p>Add to cart</p>
          </div>
        </div>
      </div>`;

      parentContainer.innerHTML += markup;
    };
  }
  catch (error) {
    console.error(error)
  }
};
renderItem()



////    ===== QUANTITY BUTTON LISTENER =====
parentContainer.addEventListener('click', (e) => {
  const plusButtonTarget = e.target.closest('.counter__quant--plus-btn');
  const minusButtonTarget = e.target.closest('.counter__quant--minus-btn');
  const quantityAmount = document.querySelector('.counter--quantity_input')

  //DECREASE QUANTITY
  if (minusButtonTarget) {
    let curQuant = parseInt(quantityAmount.value);
    curQuant <= 1 ? quantityAmount.value = 1 : quantityAmount.value = curQuant - 1;
    curQuant = quantityAmount.value;
    renderPrice(curQuant)
  }

  //INCREASE QUANTITY
  if (plusButtonTarget) {
    let curQuant = parseInt(quantityAmount.value) + 1;
    quantityAmount.value = curQuant;
    renderPrice(curQuant)
  }
}, true);

// ===== CALCULATE NUMBER OF ITEMS IN CART AND RENDER NUMBER ON CART ICON =====
const cartIconAmount = document.getElementById('cart-amount');
const updateCart = () => {
  const reducedCartAmount = cart.map((x) => x.amount).reduce((x, y) => x + y, 0);
  cartIconAmount.innerHTML = reducedCartAmount;
};

// ===== RENDER PRICE TAG UPDATE =====
const renderPrice = (quantity) => {

  const itemPrice = document.querySelector('.shop-item--total_price');

  let curPrice = parseFloat(itemPrice.getAttribute('value'));
  let newPrice = Number(quantity * curPrice).toFixed(2);
  itemPrice.innerHTML = "€" + newPrice;
};

// ===== ADD TO CART =====
parentContainer.addEventListener('click', (e) => {
  const addToCartBtn = e.target.closest('.shop-item--add-cart');
  const quantityAmount = document.querySelector('.counter--quantity_input');
  const ItemWeight = quantityAmount.dataset.quantity;
  const counterValue = parseInt(quantityAmount.value);

  if (addToCartBtn) {
    const selectedItem = e.target.closest('.shop-item--container');
    const searchCart = cart.find((x) => x.id === selectedItem.id);
    const itemPrice = document.querySelector('.shop-item--total_price');
    const description = document.querySelector('.shop-item--description');
    const itemImage = document.querySelector('.shop-item--img-src').src;

    if (searchCart === undefined) {
      cart.push({
        id: selectedItem.id,
        item: quantityAmount.dataset.title,
        quantity: ItemWeight,
        price: itemPrice.dataset.price,
        amount: Number(counterValue),
        description: description.innerText,
        image: itemImage
      });
    }
    else {
      searchCart.amount += Number(counterValue);
    }

    // Save to local storage
    localStorage.setItem("cartData", JSON.stringify(cart));

    updateCart()
  };
});

// Categories navigation
document.addEventListener('DOMContentLoaded', () => {
  const categoryNav = document.querySelector('.shop__items--navbar');

  categoryNav.addEventListener('click', (e) => {
    e.preventDefault();
    const categoryNavLink = e.target.closest('a');

    if (categoryNavLink) {
      console.log(categoryNavLink.id);
      const url = `/shop.html?product=${categoryNavLink.id}`;
      return window.location = url.toLowerCase();
    };
  });
});
