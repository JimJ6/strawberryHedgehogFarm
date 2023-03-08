"use strict";

// import { updateCart } from "../js/shop-item.js";

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <nav class="nav">
      <div class="main-nav">
        <div class="nav-items--wrapper">
          <a href="/index.html" class="nav_home-icon--wrapper" aria-label="a house shaped icon link that will lead you to our homepage">
            <i class="fa-solid fa-house icon nav_home--icon"></i>
          </a>
          <div class="shop">
            <a class="nav-item" href="/shop.html">Shop</a>
            <i class="fa-solid fa-caret-down icon nav-caret"></i>
            <ul class="dropdown">
              <li class="dropdown-link">
                <a href="/shop.html">Online Store</a>
              </li>
              <li class="dropdown-link"><a href="/markets.html">Markets</a></li>
              <li class="dropdown-link">
                <a href="/community.html">Community</a>
              </li>
              <li class="dropdown-link">
                <a href="/partners.html">Our Partners</a>
              </li>
            </ul>
          </div>
          <div class="education">
            <a class="nav-item" href="/education.html">Education</a>
            <i class="fa-solid fa-caret-down nav-caret icon"></i>
            <ul class="dropdown">
              <li class="dropdown-link">
                <a href="/education.html#petting_zoo">Petting Zoo</a>
              </li>
              <li class="dropdown-link">
                <a href="/education.html#farm_friends">Farm Tours</a>
              </li>
              <li class="dropdown-link">
                <a href="/education.html#courses">Courses</a>
              </li>
              <li class="dropdown-link">
                <a href="/education.html#volunteer">Volunteer</a>
              </li>
            </ul>
          </div>
          <div class="contact">
            <a class="nav-item" href="/contact.html">Contact</a>
          </div>
        </div>
        <div class="logo-wrapper">
          <a href="/index.html"><img class="logo" src="/img/Strawberry_Hedgehog_logo.png" alt="logo with a sillohuette of a hedgehog" /></a>
        </div>
        <div class="nav-items--wrapper">
          <div class="about">
            <a class="nav-item" href="/about.html">About</a>
          </div>
          
          <div class="donate">
            <a class="nav-item" href="/donate.html">Donate</a>
          </div>
          <div class="nav--social-icons">
            <a href="#" aria-label="an instagram icon that will link you to our instagram page, come follow us and see some of our stories and blogs">
              <i class="fa-brands fa-instagram icon nav--insta-icon"></i>
            </a>
            <a href="#" aria-label="a Facebook icon that will link you to our FB page, come follow us and see some of our stories and blogs!">
              <i class="fa-brands fa-facebook icon"></i>
            </a>
            <a href="#" class="nav--twitter-icon" aria-label="a Twitter icon that will link you to our Twitter page, come follow us and see some of our stories and blogs!">
              <i class="fa-brands fa-twitter icon"></i>
            </a>

            <a href="/login.html" aria-label="you can log into your profile page here, and register if not already with us">
              <i class="fa-solid fa-user icon nav--user-icon"></i>
            </a>
            <a href="/cart.html">
            <span id="cart-amount" class="cart-amount">0</span>
              <div id="shopping-cart" class="cart_amount--container">
                <i class="fa-solid fa-cart-shopping icon nav--cart-icon"></i>
              </div>
            </a>
          </div>
          
        </div>
        <!-- sub nav-->
        
      </div>
      <div class="sub-nav">
          <div class="sub-nav-item sub-nav-item--left">
            <i class="fa-solid fa-location-dot"></i>
            <p>12, Homefarm road, Farmington, Farmville</p>
          </div>
          <div class="sub-nav-item sub-nav-item--center">
          </div>
          <div class="sub-nav-item sub-nav-item--right">
            <i class="fa-solid fa-mobile-screen"></i>
            <p>+353 91 123123</p>
          </div>
          <div class="sub-nav-item sub-nav-item--right">
            <i class="fa-regular fa-envelope"></i>
            <p>farm@strawberryhedgehog.ie</p>
          </div>
        </div>


        <!--  MOBILE VIEW -->
      <div class="nav-bar__mobile">
        <div class="nav-left--mobile">
              <a class=" nav_home-icon--wrapper" href="/index.html">
                <i class="fa-solid fa-house icon nav_home--icon"> </i>
              </a>
        </div>
        <div class="mobile-logo-wrapper">
          <a href="/index.html"><img id="logo" src="/img/Strawberry_Hedgehog_logo.png" alt="" /></a>
        </div>
        <div class="nav-right--mobile">
          <div class="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </div>
        

        <!-- Hamburger Menu -->
        <div class="hamburger-menu-wrapper">
          <ul class="hamburger-menu">
            <li class="hamburger-item">
              <a class="ham-link" href="/shop.html">Shop</a>
            </li>
            <li class="hamburger-item">
              <a class="ham-link" href="/markets.html">Markets</a>
            </li>
            <li class="hamburger-item">
              <a class="ham-link" href="/education.html">Education</a>
            </li>
            <li class="hamburger-item">
              <a class="ham-link" href="/education.html">Petting Zoo</a>
            </li>
            <li class="hamburger-item">
              <a class="ham-link" href="/contact.html">Contact</a>
            </li>
            <li class="hamburger-item">
              <a class="ham-link" href="/about.html">About</a>
            </li>
            <li class="hamburger-item">
              <a class="ham-link" href="/donate.html">Donate</a>
            </li>
          </ul>
        </div>
        </div>
        <div class="sub-nav--mobile">
          <a href="/login.html">
            <i class="fa-solid fa-user icon nav--user-icon"></i>
          </a>
          <span id="cart-amount--mobile" class="cart-amount">0</span>
          <div id="shopping-cart" class="cart_amount--container nav--cart-icon">
            <a href="/cart.html" >
              <i class="fa-solid fa-cart-shopping icon"></i>
            </a>
          </div>
        </div>
    </nav>
        `;
  }
}

customElements.define("header-component", Header);

// Nav hide/appear on scroll up/down
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (currentScrollPos > 4.5 * 16) {
    if (prevScrollpos > currentScrollPos) {
      document.querySelector("nav").style.top = "0";
    } else {
      document.querySelector("nav").style.top = "-130px";
    }
  } else {
    document.querySelector("nav").style.top = "0";
  }
  prevScrollpos = currentScrollPos;
};

// HAMBURGER MENU

const hamburger = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const hamburgerLink = document.querySelectorAll(".ham-link");

// Hamburger link functionality
//*SHOWS/HIDES hamburger-menu when hamburger is clicked (transforms to X also)
hamburger.addEventListener("click", function mobileHamMenu() {
  hamburger.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
});

//*HIDES hamburger-menu when link is clicked
hamburgerLink.forEach((hl) =>
  hl.addEventListener("click", function closeMenu() {
    hamburger.classList.remove("active");
    hamburgerMenu.classList.remove("active");
  })
);

// Update Cart Icon Amount
const cartIconAmount = document.getElementById("cart-amount");
const cartIconAmountMobile = document.getElementById("cart-amount--mobile");

function updateCartIconCounter() {
  const getCartData = JSON.parse(localStorage.getItem("cartData"));
  const cartAmount = getCartData
    .map((x) => x.amount)
    .reduce((x, y) => x + y, 0);

  cartIconAmount.innerHTML = cartAmount;
  cartIconAmountMobile.innerHTML = cartAmount;
}
updateCartIconCounter();
