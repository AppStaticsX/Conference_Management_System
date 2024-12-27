import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Your web app's Firebase configuration
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
const database = getDatabase(app);

// AES-128 Encryption
async function encryptPassword(password, secretKey) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretKey.padEnd(16, "0").slice(0, 16)); // Ensure the key is 16 bytes
  const iv = crypto.getRandomValues(new Uint8Array(16)); // Generate a random 16-byte IV

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  const passwordData = encoder.encode(password);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    passwordData
  );

  return {
    iv: Array.from(iv).map((byte) => String.fromCharCode(byte)).join(""),
    encrypted: Array.from(new Uint8Array(encrypted))
      .map((byte) => String.fromCharCode(byte))
      .join(""),
  };
}

// AES-128 Decryption
async function decryptPassword(encrypted, iv, secretKey) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretKey.padEnd(16, "0").slice(0, 16));

  const ivBytes = new Uint8Array(iv.split("").map((char) => char.charCodeAt(0)));
  const encryptedBytes = new Uint8Array(
    encrypted.split("").map((char) => char.charCodeAt(0))
  );

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBytes },
    key,
    encryptedBytes
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

// Firebase Signup and Save Encrypted Password
const signupSubmit = document.getElementById("signup-submit");
const signinSubmit = document.getElementById("signin-submit");
const progressDialog = document.getElementById("progress-dialog");
const lottieContainer = document.getElementById("lottie-container");
const errorDialog = document.getElementById("error-dialog");
const errorlottieContainer = document.getElementById("error-lottie-container");

let progressLottieAnimation = null;
let errorLottieAnimation = null;

// Show progress dialog with Lottie animation
function showProgressDialog(lottiePath, message, shouldLoop = true) {
  progressDialog.style.display = "flex";

  const progressMessage = progressDialog.querySelector("p");
  if (progressMessage) {
    progressMessage.textContent = message;
  }

  // Destroy previous animation if any
  if (progressLottieAnimation) {
    progressLottieAnimation.destroy();
  }

  progressLottieAnimation = lottie.loadAnimation({
    container: lottieContainer,
    renderer: "svg",
    loop: shouldLoop,
    autoplay: true,
    path: lottiePath,
  });
}

// Show error dialog with Lottie animation
function showErrorDialog(lottiePath, message, shouldLoop = true) {
  errorDialog.style.display = "flex";

  const errorMessage = errorDialog.querySelector("p");
  if (errorMessage) {
    errorMessage.textContent = message;
  }

  // Destroy previous animation if any
  if (errorLottieAnimation) {
    errorLottieAnimation.destroy();
  }

  errorLottieAnimation = lottie.loadAnimation({
    container: errorlottieContainer,
    renderer: "svg",
    loop: shouldLoop,
    autoplay: true,
    path: lottiePath,
  });
}

// Hide progress dialog and stop Lottie animation
function hideProgressDialog() {
  if (progressLottieAnimation) {
    progressLottieAnimation.destroy();
    progressLottieAnimation = null;
  }

  if (progressDialog) {
    progressDialog.style.display = "none";
  }
}

// Hide error dialog and stop Lottie animation
function hideErrorDialog() {
  if (errorLottieAnimation) {
    errorLottieAnimation.destroy();
    errorLottieAnimation = null;
  }

  if (errorDialog) {
    errorDialog.style.display = "none";
  }
}



// Signup Process
if (signupSubmit) {
  signupSubmit.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const userName = document.getElementById("signup-userName").value;
    const profession = document.getElementById("signup-profession").value;

    if (!email || !password || !userName || !profession) {
      showErrorDialog('./assets/images/animated/fill_anim.json', 'Please fill out all fields.', false);
      setTimeout(() => {
        hideErrorDialog();
      }, 3000);
      return;
    }

    const secretKey = "secret-key"; // Replace with a secure key

    // Show progress dialog and initialize Lottie animation
    showProgressDialog('./assets/images/animated/loading_anim.json', 'We are setting-up your account, Please wait...', true);

    try {
      const { iv, encrypted } = await encryptPassword(password, secretKey);
      const sanitizedEmail = email.replace(/\./g, "+");

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          // Log encrypted data for debugging
          console.log("Encrypted Password:", encrypted);
          console.log("IV:", iv);

          // Saving data to Firebase
          set(ref(database, "users/" + sanitizedEmail), {
            email: email,
            encryptedPassword: encrypted,
            iv: iv,
            userId: user.uid,
            userName: userName,
            profession: profession,
          })
            .then(() => {
              hideProgressDialog();

              if (container) {
                container.classList.remove("sign-up-mode");
              }
              
            })
            .catch((error) => {
              hideProgressDialog();
              alert("Failed to save user data: " + error.message);
              console.error("Error saving data:", error);
            });
        })
        .catch((error) => {
          hideProgressDialog();
          showErrorDialog('./assets/images/animated/error_anim.json', 'Account Already Exists, Please Try Another Email.', false);
          setTimeout(() => {
            hideErrorDialog();
          }, 3000);
        });

    } catch (error) {
      hideProgressDialog();
      console.error("Encryption error:", error);
      alert("Failed to encrypt password.");
    }
  });
}

// Signin Process
if (signinSubmit) {
  signinSubmit.addEventListener("click", async function (event) {
    event.preventDefault();

    const signinEmail = document.getElementById("signin-email").value;
    const signinPassword = document.getElementById("signin-password").value;

    if (!signinEmail || !signinPassword) {
      showErrorDialog('./assets/images/animated/fill_anim.json', 'Please fill out all fields.', false);
      setTimeout(() => {
        hideErrorDialog();
      }, 3000);
      return;
    }

    const sanitizedEmail = signinEmail.replace(/\./g, "+");

    sessionStorage.setItem("emailId_", signinEmail.replace(/\./g, "+"));

    // Show progress dialog and initialize Lottie animation
    showProgressDialog('./assets/images/animated/loading_anim.json', 'Logging to your account, Please wait...', true);

    try {
      const userRef = ref(database, "users/" + sanitizedEmail);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const { encryptedPassword, iv, userName, userId } = userData;

        const secretKey = "secret-key"; // Replace with the same key used during encryption
        const decryptedPassword = await decryptPassword(
          encryptedPassword,
          iv,
          secretKey
        );

        if (decryptedPassword === signinPassword) {
          // Save login status and email to session storage
          sessionStorage.setItem("loggedIn", "true");
          sessionStorage.setItem("userEmail", signinEmail);
          sessionStorage.setItem("userName", userName);
          sessionStorage.setItem("userId", userId);

          if (signinEmail === "admin@irc.itum.com") {
            window.location.href = "admin-dashboard.html";
          } else {
            // Hide progress dialog and redirect to dashboard
            hideProgressDialog();
            window.location.href = "user-dashboard.html";
          }
        } else {
          // Hide progress dialog and show error alert
          hideProgressDialog();
          showErrorDialog('./assets/images/animated/invalid_anim.json', 'Incorrect Password, Please Try Again.', false);
          setTimeout(() => {
            hideErrorDialog();
          }, 3000);
        }
      } else {
        // Hide progress dialog and show error alert
        hideProgressDialog();
        showErrorDialog('./assets/images/animated/404_anim.json', 'Account Not Found, Please Try Again.', false);
        setTimeout(() => {
          hideErrorDialog();
        }, 3000);
      }
    } catch (error) {
      // Hide progress dialog and show error alert
      hideProgressDialog();
      console.error("Failed to retrieve account data:", error);
      alert("Error occurred during login. Please try again later.");
    }
  });
}

// JavaScript for Sign-In / Sign-Up Form Toggles
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

if (sign_up_btn) {
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });
}

if (sign_in_btn) {
  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });
}

// Forgot Password Redirect
const forgot_pass_btn = document.querySelector(".reset-password-btn");
if (forgot_pass_btn) {
  forgot_pass_btn.addEventListener("click", () => {
    window.location.href = "reset-password.html";
  });
}