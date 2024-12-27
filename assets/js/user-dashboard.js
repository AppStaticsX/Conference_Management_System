

document.querySelector('.user-logged-in').style.display = 'none';

const loggedIn = sessionStorage.getItem("loggedIn");
const userEmail = sessionStorage.getItem("userEmail");
const userName = sessionStorage.getItem("userName");
const userId = sessionStorage.getItem("userId");

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

if (loggedIn === "true" && userEmail) {

  document.querySelector('.register-btn').style.display = 'none';
  document.querySelector('.user-logged-in').style.display = 'flex';
  
  // Display the user's email
  document.getElementById("user-email").textContent = userEmail;
  document.getElementById("user-greet").textContent = `Hello, ${userName}!`;

}

// Forgot Password Redirect
const forgot_pass_btn = document.querySelector(".register-btn");
if (forgot_pass_btn) {
  forgot_pass_btn.addEventListener("click", () => {
    window.location.href = "login-signup.html";
  });
}

// Get all buttons with the class 'openDialog'
const openDialogBtn_session_1 = document.getElementById('session-register-btn-1');
const openDialogBtn_session_2 = document.getElementById('session-register-btn-2');
const openDialogBtn_session_3 = document.getElementById('session-register-btn-3');
const openDialogBtn_session_4 = document.getElementById('session-register-btn-4');
const openDialogBtn_session_5 = document.getElementById('session-register-btn-5');

const dialog = document.getElementById('confirmDialog');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Add click event listeners to all openDialog buttons
    // Common function to handle session button clicks
function handleSessionClick(sessionName, sessionId) {
  if (loggedIn === "true" && userEmail) {
    openDialog();

    // Overwrite session data in sessionStorage
    sessionStorage.setItem("sessionName", sessionName);
    sessionStorage.setItem("sessionId", sessionId);
    document.getElementById("session-name").textContent = sessionName;

    generateQR(sessionName);

    // Retrieve date and time (if available) or set defaults
    const sessionDate = sessionStorage.getItem("sessionDate") || "Date not set";
    const sessionTime = sessionStorage.getItem("sessionTime") || "Time not set";

    // Update session-date with a calendar icon
    document.getElementById("session-date").innerHTML = `
      <i class="fa fa-calendar" aria-hidden="true"></i> ${sessionDate}
    `;

    // Update session-time with a clock icon
    document.getElementById("session-time").innerHTML = `
      <i class="fa fa-clock" aria-hidden="true"></i> ${sessionTime}
    `;
  } else {
    showErrorDialog('./assets/images/animated/warning_anim.json', 'To continue, Please Sign-in/Sign-up to your Account.', false);
    setTimeout(() => {
      hideErrorDialog();
    }, 3000);
  }
}

// Event listeners for each session button
openDialogBtn_session_1.addEventListener('click', () => {
  handleSessionClick(
    "TRACK 01 - Sustainable Infrastructure and Mechanical Systems.\n",
    "session-1"
  );
});

openDialogBtn_session_2.addEventListener('click', () => {
  handleSessionClick(
    "TRACK 02 - Renewable Energy Systems and Smart Grid Technologies.\n",
    "session-2"
  );
});

openDialogBtn_session_3.addEventListener('click', () => {
  handleSessionClick(
    "TRACK 03 - Sustainable Materials and Green Manufacturing Processes.\n",
    "session-3"
  );
});

openDialogBtn_session_4.addEventListener('click', () => {
  handleSessionClick(
    "TRACK 04 - Digital Solutions for Sustainable Engineering.\n",
    "session-4"
  );
});

openDialogBtn_session_5.addEventListener('click', () => {
  handleSessionClick(
    "TRACK 05 - Interdisciplinary Approaches to Sustainability in Education.\n",
    "session-5"
  );
});


const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    // Toggle menu visibility
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Open dialog function
function openDialog() {
  const overlay = document.querySelector('.overlay');
  const dialog = document.querySelector('.dialog');
  overlay.style.display = 'flex';  // Show overlay
  setTimeout(() => dialog.classList.add('open'), 10);  // Animate dialog
}

// Close dialog function
function closeDialog() {
  const overlay = document.querySelector('.overlay');
  const dialog = document.querySelector('.dialog');
  dialog.classList.remove('open'); // Close dialog with animation
  setTimeout(() => {
    overlay.style.display = 'none'; // Hide overlay after animation
  }, 300); // Match animation duration
}

// Event listener for the cancel button
document.querySelector('.dialog .cancel').addEventListener('click', closeDialog);

let imgSrc; // Declare imgSrc globally

function generateQR(session) {
  let userData = `User_Id: ${userId} Session: ${session}`;
  imgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${userData}`;
  
  // Select all elements with the class 'qr-img' and set their src attribute
  const qrImage = document.querySelector('.qr-image');
  if (qrImage) {
    qrImage.src = imgSrc;
  }
}

document.querySelector('.dialog .confirm').addEventListener('click', () => {
  // Get the session name from the session storage
  const sessionName = sessionStorage.getItem("sessionName") || "Session not set";

  sendEmail(userName, "ITUM-IRC 2024", sessionName, userEmail, imgSrc); // Use imgSrc here
  closeDialog();

  showProgressDialog('./assets/images/animated/done_anim.json', 'We are setting-up your account, Please wait...', true);
  setTimeout(() => {
    hideProgressDialog();
    location.reload();
  }, 3000);
});


function sendEmail(toName, fromName, message, toEmail, qrImage) {
  // Replace with your EmailJS service ID, template ID, and public key
  const serviceID = 'service_0wpp13i';
  const templateID = 'template_bxgjdja';
  const publicKey = '2rfGMdWRhm4z2Aiko';

  // Initialize EmailJS
  emailjs.init(publicKey);

  // Prepare the template parameters
  const templateParams = {
      to_name: toName,
      from_name: fromName,
      message: message,
      to_email: toEmail,
      qrCode: qrImage
  };

  // Send the email
  emailjs.send(serviceID, templateID, templateParams)
      .then(function(response) {
          console.log('Email sent successfully!', response.status, response.text);
      }, function(error) {
          console.error('Failed to send email:', error);
      });
}

// Select all menu links
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href'); // Get the target section ID
    if (targetId.startsWith('#')) {
      event.preventDefault(); // Prevent default anchor link behavior
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', // Enable smooth scrolling
        });
      }
    }
  });
});
