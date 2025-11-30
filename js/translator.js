// ----------------------------
// SWITCH BETWEEN LOGIN/SIGNUP
// ----------------------------
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const goSignup = document.getElementById("goSignup");
const goLogin = document.getElementById("goLogin");

goSignup.onclick = () => {
    loginBox.classList.add("hidden");
    signupBox.classList.remove("hidden");
};

goLogin.onclick = () => {
    signupBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
};


// ===============================
// SIGN UP
// ===============================
document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === email)) {
        console.log("❌ Signup failed: Email exists");
        alert("Email already exists!");
        return;
    }

    const newUser = {
        name,
        email,
        password,
        createdAt: new Date().toLocaleString()
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("✅ USER SIGNED UP:");
    console.table(newUser);

    alert("Account created!");
    signupBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
});


// ===============================
// LOGIN
// ===============================
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        console.log("❌ Login failed for email:", email);
        alert("Invalid email or password.");
        return;
    }

    const sessionUser = {
        name: user.name,
        email: user.email,
        loginTime: new Date().toLocaleString()
    };

    localStorage.setItem("loggedInUser", JSON.stringify(sessionUser));

    console.log("🔐 USER LOGGED IN:");
    console.table(sessionUser);

    document.getElementById("authContainer").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
});


// ===============================
// CHECK SESSION
// ===============================
const activeUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (activeUser) {
    console.log("📌 ACTIVE SESSION DETECTED:");
    console.table(activeUser);

    document.getElementById("authContainer").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}


// ===============================
// LOGOUT
// ===============================
document.getElementById("logoutBtn").onclick = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    console.log("🚪 USER LOGGED OUT at " + new Date().toLocaleString());
    console.table(user);

    localStorage.removeItem("loggedInUser");

    location.reload();
};


// ===============================
// TRANSLATOR LOGIC (EXAMPLE)
// ===============================
document.getElementById("btnTranslate").onclick = () => {
    let text = document.getElementById("textInput").value;
    document.getElementById("outputBox").innerText = text.toUpperCase();
};
