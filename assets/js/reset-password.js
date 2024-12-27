// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsntxiFZCq2Px3Vd9PqzRyBr19nwUOP-4",
  authDomain: "irc-webtech-ca.firebaseapp.com",
  databaseURL: "https://irc-webtech-ca-default-rtdb.firebaseio.com",
  projectId: "irc-webtech-ca",
  storageBucket: "irc-webtech-ca.firebasestorage.app",
  messagingSenderId: "374012110811",
  appId: "1:374012110811:web:28adeb351b9027b248a9fe",
  measurementId: "G-Y0VFY2NZPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Select DOM elements
const back_to_login_btn = document.querySelector("#back-to-login-btn");
const reset_password_btn = document.querySelector("#reset-password-btn");
const email_input = document.querySelector("#email");

// Event listener for "Back to Login" button
back_to_login_btn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default button behavior
  window.location.href = "login-signup.html"; // Redirect to login/signup page
});

// Event listener for "Reset Password" button
reset_password_btn.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent default button behavior

  const email = email_input.value.trim(); // Get the email input value

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  try {
    // Send password reset email
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent. Please check your inbox.");
  } catch (error) {
    console.error("Error sending password reset email:", error);

    // Handle specific error codes
    switch (error.code) {
      case "auth/user-not-found":
        alert("No user found with this email address.");
        break;
      case "auth/invalid-email":
        alert("Invalid email format. Please check and try again.");
        break;
      default:
        alert("Failed to send password reset email. Please try again.");
    }
  }
});
