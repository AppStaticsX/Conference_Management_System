import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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
const database = getDatabase(app);

/**
 * Stores a username in the Firebase Realtime Database under a specified session.
 * @param {string} session - The session name (e.g., "session-1").
 * @param {string} username - The username to store.
 */
// Import necessary Firebase modules (Assuming Firebase is already set up in the project)
// import { getDatabase, ref, set } from "firebase/database";

function storeUsername(session, username) {
  if (!session || typeof session !== "string" || session.trim() === "") {
    console.error("Invalid session. It must be a non-empty string.");
    return;
  }

  if (!username || typeof username !== "string" || username.trim() === "") {
    console.error("Invalid username. It must be a non-empty string.");
    return;
  }

  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    console.error("No userId found in session storage. Ensure the userId is set before storing the username.");
    return;
  }

  try {
    const database = getDatabase(); // Initialize the database instance
    const userRef = ref(database, `registrations/${session}/${userId}`);

    set(userRef, username)
      .then(() => {
        console.log(`Username '${username}' stored successfully under session '${session}' with userId '${userId}'.`);
      })
      .catch((error) => {
        console.error("Error storing username:", error.message);
      });
  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}


// Automatically call storeUsername every 3 seconds
const session = sessionStorage.getItem("sessionId");
const username = sessionStorage.getItem("userName");

setInterval(() => {
  storeUsername(session, username);
}, 3000);