'use strict'

const shopContainer = document.getElementById("shop__products--grid");

//category links
const categoryNav = document.querySelector(".shop__items--nav-wrapper");

// API URL
const API_URL = `/api/db.json`;

// Cart
let cart = JSON.parse(localStorage.getItem("cartData")) || [];

// Helper functions
function outOfStock() {
  const noStockMsg = `
         <div class="shop--stock-update">
         <span> We are currently updating our inventory -  Please check back, or follow this <a target="_self" href="/contact.html" style="color:green">Link</a> to contact us with any inquiries. 
         Thanks - Team SH!</span>
         </div>
         `;
  return noStockMsg
}

async function getShopData() {
  const res = await fetch(API_URL);
  let data = await res.json();

  return data.shopData;
}

// == RENDER STOCK ==
export async function renderShop(itemCategory) {
  const shopData = await getShopData();

  try {
    // If itemCategory !defined, get from  URL parameters
    if (!itemCategory) {
      const params = new URLSearchParams(window.location.search);
      itemCategory = params.get('product');
    }

    // Render ALL items on load
    if (!itemCategory) {
      generateMarkup(shopData)
    }

    // Renders category from category nav links
    if (itemCategory) {
      shopContainer.innerHTML = ``;
      const filteredItems = shopData.filter(item => item.category === itemCategory);
      if (filteredItems.length === 0) {
        shopContainer.innerHTML = ``;
        shopContainer.insertAdjacentHTML('afterbegin', outOfStock());
      } else {
        generateMarkup(filteredItems);
      }
    };

    addOneToCart(shopData)

  }
  catch (error) {
    console.error(error)
  }
};
renderShop()

// == GENERATE MARKUP ==
export async function generateMarkup(itemCategory) {
  const fragment = document.createDocumentFragment();

  itemCategory.forEach(({ id, image, item, price, quantity }) => {
    const product = document.createElement('div');
    product.classList.add('shop__product');
    product.id = `product-id-${id}`;

    const figure = document.createElement('figure');
    figure.classList.add('shop__product--img-wrapper');
    const img = document.createElement('img');
    img.classList.add('shop__product--img', 'lazy-img');
    img.dataset.src = image;
    img.alt = '';
    figure.appendChild(img);
    product.appendChild(figure);

    const title = document.createElement('div');
    title.classList.add('shop__product--title');
    title.dataset.title = item;
    title.dataset.weight = quantity;
    const titleP = document.createElement('p');
    titleP.classList.add('shop__product--title-p');
    titleP.textContent = `${item}, ${quantity}`;
    title.appendChild(titleP);
    product.appendChild(title);

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('shop__product--price_container');
    const priceEl = document.createElement('p');
    priceEl.classList.add('shop__product--price');
    priceEl.textContent = `€${price}`;
    priceContainer.appendChild(priceEl);
    product.appendChild(priceContainer);

    const addToCart = document.createElement('div');
    addToCart.classList.add('shop__product--add-cart', 'btn');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-cart-shopping', 'icon');
    const p = document.createElement('p');
    p.textContent = 'Add to cart';
    addToCart.appendChild(icon);
    addToCart.appendChild(p);
    product.appendChild(addToCart);

    fragment.appendChild(product);
  });

  shopContainer.appendChild(fragment);

  // LAZY LOAD IMAGES
  function lazyLoad() {
    const imageTargets = document.querySelectorAll(".shop__product--img");

    function imgLoad(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const image = entry.target;
        const src = image.getAttribute('data-src');
        if (!src) return;
        image.setAttribute('src', src);
        image.removeAttribute('data-src');
        image.classList.remove('lazy-img');
        observer.unobserve(image);
      });
    }

    const imgObserver = new IntersectionObserver(imgLoad, {
      root: null,
      threshold: 0,
      rootMargin: '200px'
    });

    imageTargets.forEach(image => imgObserver.observe(image));
  }

  lazyLoad();

  // REDIRECT to SHOP-ITEM.HTML (with product data)
  shopContainer.addEventListener('click', e => {
    const shopData = getShopData();
    const productEl = e.target.closest(".shop__product");
    if (!productEl) return;

    if (e.target.closest(".shop__product--add-cart")) {
      console.log("button");
      addOneToCart(shopData)
    } else {
      const productId = productEl.id.split('-')[2];
      const productCheck = itemCategory.find(x => x.id === productId);
      if (!productCheck) return;

      const url = `/shop-item.html?product=${productCheck.item}`;
      window.location = url.toLowerCase();

    }
  });
}


// ADD TO CART BUTTON (x1 amount)
function addOneToCart(data) {
  function handleAddToCartClick(event) {
    const addToCartBtn = event.target.closest(".shop__product--add-cart");
    if (addToCartBtn) {
      const productEl = event.target.closest(".shop__product");
      const productId = productEl.id.split('-')[2];
      const searchData = data.find(({ id }) => id === productId);
      if (!searchData) return;

      const { item: productTitle, quantity: productWeight, price: productPrice, desc: productDescription, image: productImage } = searchData;
      const searchCart = cart.find(({ id }) => id === productId);

      if (!searchCart) {
        cart.push({
          id: productId,
          item: productTitle,
          quantity: productWeight,
          price: productPrice,
          amount: 1,
          description: productDescription,
          image: productImage
        });
      } else {
        searchCart.amount += 1;
      }
      localStorage.setItem("cartData", JSON.stringify(cart));
      updateCart();
    }
  }

  shopContainer.addEventListener('click', handleAddToCartClick);
};


// Update cart
const cartIconAmount = document.getElementById('cart-amount');

const updateCart = () => {
  const reducedCartAmount = cart.map((x) => x.amount).reduce((x, y) => x + y, 0);
  cartIconAmount.innerHTML = reducedCartAmount;
};


// Render specific category based on click of sub-nav bar 
if (categoryNav) {
  categoryNav.addEventListener('click', (e) => {
    e.preventDefault();
    const categoryNavLink = e.target.closest('a');

    if (categoryNavLink) {
      const newURL = `/shop.html?product=${categoryNavLink.id}`;
      const newTitle = categoryNavLink.id;
      const newState = { additionalInformation: 'Updated the URL with JS' };

      window.history.pushState(newState, newTitle, newURL);
      renderShop(categoryNavLink.id);
    }
  });

  window.addEventListener('popstate', (e) => {
    // Get the current URL and category ID from the window location
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('product');

    // Render the shop with the category ID
    renderShop(categoryId);
  });
}