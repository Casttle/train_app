// Initialize Firebase
var config = {
    apiKey: "AIzaSyDfksCoaCMtsEtYS7CQKEgTc6_W-gEq9oQ",
    authDomain: "train-app-e2625.firebaseapp.com",
    databaseURL: "https://train-app-e2625.firebaseio.com",
    projectId: "train-app-e2625",
    storageBucket: "",
    messagingSenderId: "768372750799"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


$("#submit").on("click", function() {
//   event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTime = moment($("#").val().trim(), "MM/DD/YYYY").format("X");
  var frequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    first: firstTime,
    frequency: frequency 
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTime").val("");
  $("#").val("");
});