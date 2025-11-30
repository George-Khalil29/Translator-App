// ================================
// SIMPLE LOGIN / SIGNUP SYSTEM
// ================================

const authPage = document.getElementById("auth-page");
const translatorPage = document.getElementById("translator-page");

const authTitle = document.getElementById("auth-title");
const authActionBtn = document.getElementById("auth-action-btn");
const switchBtn = document.getElementById("switch-btn");
const switchText = document.getElementById("switch-text");
const authError = document.getElementById("auth-error");

let isLogin = true;

// Show login page on start
window.onload = () => {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
        console.log("%cUser already logged in:", "color:lime", loggedUser);
        showTranslatorPage();
    } else {
        showAuthPage();
    }
};

function showAuthPage() {
    authPage.style.display = "block";
    translatorPage.style.display = "none";
}

function showTranslatorPage() {
    translatorPage.style.display = "block";
    authPage.style.display = "none";
}

// SWITCH MODE LOGIN ↔ SIGNUP
switchBtn.addEventListener("click", () => {
    isLogin = !isLogin;

    if (isLogin) {
        authTitle.textContent = "Login";
        authActionBtn.textContent = "Login";
        switchText.innerHTML = `Don't have an account? <b id="switch-btn">Sign Up</b>`;
    } else {
        authTitle.textContent = "Sign Up";
        authActionBtn.textContent = "Sign Up";
        switchText.innerHTML = `Already have an account? <b id="switch-btn">Login</b>`;
    }
});

// AUTH ACTION BUTTON
authActionBtn.addEventListener("click", () => {
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value.trim();

    if (!email || !password) {
        showError("Please fill in all fields");
        return;
    }

    if (isLogin) {
        loginUser(email, password);
    } else {
        registerUser(email, password);
    }
});

// REGISTRATION
function registerUser(email, password) {
    if (localStorage.getItem(email)) {
        showError("User already exists!");
        console.log("%cSignup Failed: User already exists", "color:red");
        return;
    }

    localStorage.setItem(email, password);
    console.log("%cUser Registered Successfully:", "color:cyan", email);

    authTitle.textContent = "Login";
    authActionBtn.textContent = "Login";
    isLogin = true;
}

// LOGIN
function loginUser(email, password) {
    const stored = localStorage.getItem(email);

    if (!stored || stored !== password) {
        showError("Invalid email or password");
        console.log("%cFailed login attempt", "color:red");
        return;
    }

    console.log("%cUser Logged In:", "color:lime", email);
    localStorage.setItem("loggedUser", email);

    showTranslatorPage();
}

// LOGOUT
document.getElementById("logout-btn").addEventListener("click", () => {
    const loggedUser = localStorage.getItem("loggedUser");

    console.log("%cUser Logged Out:", "color:orange", loggedUser);

    localStorage.removeItem("loggedUser");
    showAuthPage();
});

// ERROR DISPLAY
function showError(msg) {
    authError.textContent = msg;
    authError.style.display = "block";
    setTimeout(() => authError.style.display = "none", 3000);
}
