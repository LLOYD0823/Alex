import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCeSy9qMibAAYCZg5cipJ8097qeh3vwF08",
    authDomain: "testingapp-589a1.firebaseapp.com",
    databaseURL: "https://testingapp-589a1-default-rtdb.firebaseio.com",
    projectId: "testingapp-589a1",
    storageBucket: "testingapp-589a1.appspot.com",
    messagingSenderId: "920622301670",
    appId: "1:920622301670:web:8937030299600fede51627",
    measurementId: "G-ZJP7HRFH98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Function to display required tourist data
function displayTouristData() {
    const dataContainer = document.getElementById('data-container');

    // Check if the container exists
    if (!dataContainer) {
        console.error("Data container not found");
        return;
    }

    // Fetch tourist data
    const touristRef = ref(db, "TouristID");

    onValue(touristRef, (snapshot) => {
        dataContainer.innerHTML = "";

        snapshot.forEach((touristSnapshot) => {
            const touristData = touristSnapshot.val();
            const touristID = touristSnapshot.key;
            const lastName = touristData.lastName || "N/A";
            const firstName = touristData.firstName || "N/A";
            const middleName = touristData.middleName || "N/A";
            const nationality = touristData.nationality || "N/A";
            const sex = touristData.sex || "N/A";
            const birthday = touristData.birthday || "N/A";
            const age = touristData.age || "N/A";
            const civilStatus = touristData.civilStatus || "N/A";
            const visitorType = touristData.visitorType || "N/A";

            // Construct HTML elements to display the data
            const touristInfo = document.createElement('div');
            touristInfo.classList.add('tourist-info');

            // Add the required fields
            touristInfo.innerHTML = `
                <h2>Tourist ID: ${touristID}</h2>
                <p>Last Name: ${lastName}</p>
                <p>First Name: ${firstName}</p>
                <p>Middle Name: ${middleName}</p>
                <p>Nationality: ${nationality}</p>
                <p>Sex: ${sex}</p>
                <p>Birthday: ${birthday}</p>
                <p>Age: ${age}</p>
                <p>Civil Status: ${civilStatus}</p>
                <p>Visitor Type: ${visitorType}</p>
            `;

            dataContainer.appendChild(touristInfo);
        });
    });
}

// Call the displayTouristData function when the window loads
window.onload = displayTouristData;
