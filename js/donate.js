'use strict'

const amountInputBtn = document.querySelectorAll('.donation-amount');
const otherAmountBtn = document.getElementById("amount-other");
const donateBtn = document.querySelector('.donation-submit--btn');
const donationError = document.querySelector(".donation--error");
let selectedAmount;


// Safari button focus fix (:-webkit-focus not working)
amountInputBtn.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault()
    btn.focus();
}));

amountInputBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedAmount = btn.value;
        if (btn) { otherAmountBtn.value = ""; }
    });
});

otherAmountBtn.addEventListener('input', (e) => {
    selectedAmount = otherAmountBtn.value;
});

donateBtn.addEventListener('click', (e) => {
    e.preventDefault();
});

// -- MODAL --
const modal = document.querySelector('.modal');
const modalBackgroundOverlay = document.querySelector('.modal-background--dark-overlay');
const closeModal = document.querySelectorAll('.close-modal');
const modalPromptAmount = document.querySelector(".modal--prompt-amount");
const modalPrompt = document.querySelector(".modal--prompt");
const modalContinueBtn = document.querySelector('.modal-btn--continue');
const modalImg = document.querySelector('.donate-modal-img');


// Open Modal on clicking donate
const modalOpen = () => {
    modalBackgroundOverlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    modalPromptAmount.innerHTML = `You are about to donate €${selectedAmount} !`;
};

donateBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (selectedAmount == undefined) {
        donationError.classList.remove("hidden")
    }
    if (selectedAmount) {
        donationError.classList.add("hidden")
        modalOpen()
    }
});

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

// Redirect prompt and spinner animation //
modalContinueBtn.addEventListener('click', () => {
    modalPromptAmount.innerHTML = `Redirecting!`;
    modalImg.classList.add('spin-animation');
    modalPrompt.classList.add('hidden');
    modalContinueBtn.classList.add('hidden');

    setTimeout(() => {
        modalPromptAmount.innerHTML = `Redirect to payment form, Stripe, Paypal, etc..`;
        modalImg.classList.add('hidden');
        modalPrompt.classList.remove('hidden');
        modalPrompt.innerHTML = "*Based on the clients instructions"
    }, 2000);
});