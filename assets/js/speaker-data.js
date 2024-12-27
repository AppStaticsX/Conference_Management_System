// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to retrieve the image and set it to the HTML element
async function setRoleToHTML(speakerNum, speakerNameId) {
  try {
    // Reference to the specific document
    const docRef = doc(db, "speakers", speakerNum);

    // Get the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Access the "title" field
      const name = docSnap.data().name;

      // Set the title to the HTML element
      const nameElement = document.getElementById(speakerNameId);
      if (nameElement) {
        nameElement.textContent = name;
      } else {
        console.error(`Element with ID '${speakerNameId}' not found!`);
      }
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// Function to retrieve the description and set it to the HTML element
async function setNameToHTML(speakerNum, speakerNameId) {
  try {
    // Reference to the specific document
    const docRef = doc(db, "speakers", speakerNum);

    // Get the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Access the "description" field
      const name = docSnap.data().name;

      // Set the description to the HTML element
      const nameElement = document.getElementById(speakerNameId);
      if (nameElement) {
        nameElement.textContent = name;
      } else {
        console.error(`Element with ID '${speakerNameId}' not found!`);
      }
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// Call the functions when the page loads
window.onload = function () {
  // load session-1 data
  setNameToHTML("speaker-1", "speaker-1-name");
  setRoleToHTML("speaker-1", "speaker-1-role");

  // load session-2 data
  setNameToHTML("speaker-2", "speaker-2-name");
  setRoleToHTML("speaker-2", "speaker-2-role");

  // load session-3 data
  setNameToHTML("speaker-3", "speaker-3-name");
  setRoleToHTML("speaker-3", "speaker-3-role");

  // load session-4 data
  setNameToHTML("speaker-4", "speaker-4-name");
  setRoleToHTML("speaker-4", "speaker-4-role");

  // load session-5 data
  setNameToHTML("speaker-5", "speaker-5-name");
  setRoleToHTML("speaker-5", "speaker-5-role");
};