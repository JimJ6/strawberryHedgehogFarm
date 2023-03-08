'use strict'


// **..Either complete this section of the project, or continue with React material/new project, then return to this at a later date..**


const logIconTog = document.querySelector(".toggle-password--log");
const regIconTog = document.querySelector(".toggle-password--reg");
const loginContainer = document.querySelector(".login--container");
const regContainer = document.querySelector(".reg--container")
const loginFormRegLink = document.querySelector(".login--reg-link");
const regFormLoginLink = document.querySelector(".reg--login-link");
const LogInBtn = document.querySelector("#login--btn");
const regSubmitBtn = document.querySelector("#reg--submit");


function togglePasswordVis(password, icon) {
    // type attribute toggle
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // icon toggle
    icon.classList.toggle("fa-eye");
};

// TOGGLE PASSWORD VISIBILTY/ICON SLASH
logIconTog.addEventListener('click', function (e) {
    const password = e.target.previousElementSibling;
    const icon = this;

    togglePasswordVis(password, icon)
});

regIconTog.addEventListener('click', function (e) {
    const password = e.target.previousElementSibling;
    const icon = this;

    togglePasswordVis(password, icon)
});

// login form registerlink 
loginFormRegLink.addEventListener('click', () => {
    loginContainer.style.visibility = "hidden";
    regContainer.style.visibility = "visible";
});

//Register form login link
regFormLoginLink.addEventListener('click', () => {
    regContainer.style.visibility = "hidden";
    loginContainer.style.visibility = "visible";
});


// REGISTRATION FUNCTIONALITY
const name1 = document.querySelector("#firstname");
const name2 = document.querySelector("#lastname");
const email = document.querySelector("#reg_email");
const password = document.querySelector(".reg--password-input");
const finalUser = JSON.parse(localStorage.getItem('users'));


function addUser(e) {
    //     // Prevent submit if forms left blank
    //     if (name1.value === "" || name2.value === "" || email.value === "" || password.value === "") {
    //         alert("Please complete all fields");
    //         // return false;
    //         e.preventDefault()

    //     }

    // let user = {
    //     firstname: name1.value,
    //     lastname: name2.value,
    //     emailAll: email.value,
    //     passwordAll: password.value
    // }

    let users = [];

    console.log(indUser);

    alert('Registration completed, log in')

    // window.location.href = "login.html"
    // e.preventDefault()
};

let usersDb = JSON.parse(localStorage.getItem("userData")) || [];
console.log(usersDb);


// REGISTER USER
function registerUser() {
    const user = {
        firstname: name1.value,
        lastname: name2.value,
        email: email.value,
        password: password.value,
        id: "id" + Math.floor(new Date() * Math.random() / 100000)
    };
    usersDb.push(user)

    localStorage.setItem('userData', JSON.stringify(usersDb))
    // PLACE MODAL (w/timer-redirect) HERE INSTEAD OF ALERT!
    alert("Registered!")
    window.location.href = "login.html"
};

regSubmitBtn.addEventListener('click', () => {
    registerUser()
});

// LOG IN USER
const loginEmail = document.querySelector('#login_email');
const loginPassword = document.querySelector('#login_password');

function logInUser() {
    const userVerify = usersDb.filter(obj => obj.email === loginEmail.value)[0];
    console.log(`User object based on email: ${JSON.stringify(userVerify)}`);

    if (userVerify && userVerify.password === loginPassword.value) {
        alert("'Logged in!'");
        window.location.replace('shop.html')
    } else if (userVerify === undefined) {
        alert('We cannot find your account. Please check your details, or register!')
    }
    else if (!userVerify || userVerify.password !== loginPassword.value) {
        alert('Please check your login details and try again!')
    }

};

LogInBtn.addEventListener('click', (e) => {
    e.preventDefault()
    logInUser()
});