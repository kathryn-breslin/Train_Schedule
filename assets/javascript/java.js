var config = {
    apiKey: "AIzaSyAVcVypjnMBvFCRZO06A_yQ4DYY45RlX_4",
    authDomain: "hello-d0fed.firebaseapp.com",
    databaseURL: "https://hello-d0fed.firebaseio.com",
    projectId: "hello-d0fed",
    storageBucket: "hello-d0fed.appspot.com",
    messagingSenderId: "873317010849"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  var train = "";
  var destination = "";
  var frequency = "";
  var currentTime = moment();
  var arrivalTime = moment().add("#minutesAway-input");

  $('#add-train').on('click', function(event) {
    event.preventDefault();
  
    train = $('#name-input').val().trim();

    destination = $('#destination-input').val().trim();
    
    frequency = $('#frequency-input').val().trim();
    
    currentTime = moment().format('LLLL');

    arrivalTime = $('#minutesAway-input').val().trim();

    
    if ($('#name-input').val() === "") {
      alert("Please enter the name of the train");
    }
    else if ($('#destination-input').val() === "") {
      alert("Please enter the destination");
    }
    else if ($('#firstTrain-input').val() === "") {
      alert("Please enter the First Train");
    }
    else if ($('#frequency-input').val() === "") {
      alert("Please enter the frequency of the train's route");
    }
    else if ($('#minutesAway-input').val() === "") {
        alert("Please enter the train's arrival time");
      }
    else {
    database.ref().push({
      train: train,
      destination: destination,
      frequency: frequency,
      currentTime: currentTime,
      arrivalTime: arrivalTime
    });

    //clear out all of the inputs
    $('#name-input').val("");
    $('#destination-input').val("");
    $('#firstTrainTime-input').val("");
    $('#frequency-input').val("");
    $('#minutesAway-input').val("");
  }
  });
  
  database.ref().on('child_added', function(snapshot) {
  //builds a new row every time
    var newTrain = $('<tr>');
    var newTrainNameCol = $('<td>');
    var newDestinationCol = $('<td>');
    //var newFirstTrainTimeCol = $('<td>');
    var newFrequencyCol = $('<td>');
    var newCurrentTimeCol = $('<td>');
    var newArrivalTimeCol = $('<td>');

    newCurrentTimeCol.text(snapshot.val().currentTime);
    newTrainNameCol.text(snapshot.val().train);
    newDestinationCol.text(snapshot.val().destination);
    newFrequencyCol.text(snapshot.val().frequency);
    newArrivalTimeCol.text(snapshot.val().arrivalTime);

    newTrain.append(newCurrentTimeCol);
    newTrain.append(newTrainNameCol);
    newTrain.append(newDestinationCol);
    newTrain.append(newFrequencyCol);
    newTrain.append(newArrivalTimeCol);
    //newTrain.append(newNextArrivalTimeCol);
    
    
    $('#dataStore').append(newTrain);
  
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  
  });
  

//console.log(moment().format("dddd, MMMM do YYYY kk:mm:ss A Z"));