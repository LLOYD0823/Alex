var firebaseConfig = {
  apiKey: "AIzaSyCeSy9qMibAAYCZg5cipJ8097qeh3vwF08",
  authDomain: "testingapp-589a1.firebaseapp.com",
  databaseURL: "https://testingapp-589a1-default-rtdb.firebaseio.com",
  projectId: "testingapp-589a1",
  storageBucket: "testingapp-589a1.appspot.com",
  messagingSenderId: "920622301670",
  appId: "1:920622301670:web:8937030299600fede51627",
  measurementId: "G-ZJP7HRFH98",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

var database = firebase.database();

function countUniqueUserIDs() {
  var userIDRef = database.ref("UserID");
  userIDRef.on("value", function (snapshot) {
    var uniqueIDs = snapshot.numChildren();
    console.log("UserID:", snapshot.val());
    document.getElementById("uniqueIDs").innerText = "Count:" + uniqueIDs;
  });
}

function countEstablishmentAccommodationType() {
  var EstablishmentIDRef = database.ref("EstablishmentID");
  var totalCount = 0;
  EstablishmentIDRef.on("value", function (snapshot) {
    totalCount = 0;
    snapshot.forEach(function (childSnapshot) {
      var establishmentData = childSnapshot.val();
      var establishmentType = establishmentData.type;
      if (establishmentType === "Accommodation Establishment") {
        totalCount++;
      }
    });
    console.log("Total Establishment Type Count:", totalCount);
    document.getElementById("establishmentTypeCounts").innerText =
      "Total: " + totalCount;
  });
}

window.onload = function () {
  countEstablishmentAccommodationType();
  countUniqueUserIDs();
};
