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

// Function to retrieve the title and set it to the HTML element
async function setTitleToHTML(sessionNum, sessionTitleId) {
  try {
    // Reference to the specific document
    const docRef = doc(db, "sessionData", sessionNum);

    // Get the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Access the "title" field
      const title = docSnap.data().title;

      // Set the title to the HTML element
      const titleElement = document.getElementById(sessionTitleId);
      if (titleElement) {
        titleElement.textContent = title;
      } else {
        console.error(`Element with ID '${sessionTitleId}' not found!`);
      }
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// Function to retrieve the description and set it to the HTML element
async function setDescriptionToHTML(sessionNum, sessionDescriptionId) {
  try {
    // Reference to the specific document
    const docRef = doc(db, "sessionData", sessionNum);

    // Get the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Access the "description" field
      const description = docSnap.data().description;

      // Set the description to the HTML element
      const descriptionElement = document.getElementById(sessionDescriptionId);
      if (descriptionElement) {
        descriptionElement.textContent = description;
      } else {
        console.error(`Element with ID '${sessionDescriptionId}' not found!`);
      }
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// Function to retrieve the date and set it to the HTML element
async function setDateToHTML(sessionNum, sessionDateId) {
  if (!sessionNum || !sessionDateId) {
    console.error("Invalid sessionNum or sessionDateId provided.");
    return;
  }

  try {
    // Reference to the specific document
    const docRef = doc(db, "sessionData", sessionNum);

    // Get the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data()) {
      // Access the "date" field
      const date = docSnap.data().date;

      // Ensure the date is valid
      if (!date) {
        console.error(`No "date" field found in the document for session '${sessionNum}'.`);
        return;
      }

      // Set the description to the HTML element
      const dateElement = document.getElementById(sessionDateId);
      if (dateElement) {
        dateElement.textContent = date;

        // Store the date in session storage with a descriptive key
        sessionStorage.setItem(`sessionDate_${sessionNum}`, date);
      } else {
        console.error(`Element with ID '${sessionDateId}' not found!`);
      }
    } else {
      console.log(`No document found for session '${sessionNum}'.`);
    }
  } catch (error) {
    console.error(`Error fetching document for session '${sessionNum}':`, error);
  }
}

// Function to retrieve the time and set it to the HTML element
async function setTimeToHTML(sessionNum, sessionTimeId) {
  // Validate inputs
  if (!sessionNum || !sessionTimeId) {
    console.error("Invalid sessionNum or sessionTimeId provided.");
    return;
  }

  try {
    // Reference to the specific document in Firestore
    const docRef = doc(db, "sessionData", sessionNum);

    // Fetch the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data()) {
      // Extract the "time" field from the document
      const time = docSnap.data().time;

      // Validate the "time" field
      if (!time) {
        console.error(`No "time" field found in the document for session '${sessionNum}'.`);
        return;
      }

      // Locate the HTML element to update
      const timeElement = document.getElementById(sessionTimeId);
      if (timeElement) {
        // Update the HTML element with the retrieved time
        timeElement.textContent = time;

        // Store the time in sessionStorage with a descriptive key
        sessionStorage.setItem(`sessionTime_${sessionNum}`, time);
      } else {
        console.error(`Element with ID '${sessionTimeId}' not found!`);
      }
    } else {
      console.log(`No document found for session '${sessionNum}'.`);
    }
  } catch (error) {
    console.error(`Error fetching document for session '${sessionNum}':`, error);
  }
}


// Function to retrieve the location and set it to the HTML element
async function setLocationToHTML(sessionNum, sessionLocationId) {
  try {
    // Reference to the specific document
    const docRef = doc(db, "sessionData", sessionNum);

    // Get the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Access the "location" field
      const location = docSnap.data().location;

      // Set the location to the HTML element
      const locationElement = document.getElementById(sessionLocationId);
      if (locationElement) {
        locationElement.textContent = location;
      } else {
        console.error(`Element with ID '${sessionLocationId}' not found!`);
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
  setTitleToHTML("session-1", "session-1-title");
  setDescriptionToHTML("session-1", "session-1-description");
  setDateToHTML("session-1", "session-1-date");
  setTimeToHTML("session-1", "session-1-time");
  setLocationToHTML("session-1", "session-1-location");

  // load session-2 data
  setTitleToHTML("session-2", "session-2-title");
  setDescriptionToHTML("session-2", "session-2-description");
  setDateToHTML("session-2", "session-2-date");
  setTimeToHTML("session-2", "session-2-time");
  setLocationToHTML("session-2", "session-2-location");

  // load session-3 data
  setTitleToHTML("session-3", "session-3-title");
  setDescriptionToHTML("session-3", "session-3-description");
  setDateToHTML("session-3", "session-3-date");
  setTimeToHTML("session-3", "session-3-time");
  setLocationToHTML("session-3", "session-3-location");

  // load session-4 data
  setTitleToHTML("session-4", "session-4-title");
  setDescriptionToHTML("session-4", "session-4-description");
  setDateToHTML("session-4", "session-4-date");
  setTimeToHTML("session-4", "session-4-time");
  setLocationToHTML("session-4", "session-4-location");

  // load session-5 data
  setTitleToHTML("session-5", "session-5-title");
  setDescriptionToHTML("session-5", "session-5-description");
  setDateToHTML("session-5", "session-5-date");
  setTimeToHTML("session-5", "session-5-time");
  setLocationToHTML("session-5", "session-5-location");
};