"use strict"

const tabs = document.querySelectorAll('.welcome__tab');
const tabsContainer = document.querySelector('.welcome__tab-container');
const tabsContent = document.querySelectorAll('.welcome__content');

// Tabbed components  
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.welcome__tab');
    if (!clicked) return;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('welcome__tab--active'));
    tabsContent.forEach(c => c.classList.remove('welcome__content--active'))

    // Activate tab
    clicked.classList.add('welcome__tab--active'); //*1

    //Activate content area
    document.querySelector(`.welcome__content--${clicked.dataset.tab}`).classList.add('welcome__content--active');
});