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


$("#submit").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTime = $("#firstTime").val().trim();
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
  $("#frequency").val("");
});


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;



    var firstTimeConverted = moment(firstTime, "hh:mm");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  
  
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(moment(nextTrain).format("LT")),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#trainList > tbody").append(newRow);
  });
  