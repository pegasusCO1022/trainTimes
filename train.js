var config = {
    apiKey: "AIzaSyAtNRTy9cP0A6Tb3KmZ0mK4Edl8tl62Y-0",
    authDomain: "train-schedule-5721b.firebaseapp.com",
    databaseURL: "https://train-schedule-5721b.firebaseio.com",
    projectId: "train-schedule-5721b",
    storageBucket: "train-schedule-5721b.appspot.com",
    messagingSenderId: "732409883354"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

var name = "";
var destination = "";
var trainTime;
var frequency = 0;
var minutesAway = 0;

$("#Esubmit").on("click", function () {
    event.preventDefault();

    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
    });

    $("#name").val('');
    $("#destination").val('');
    $("#trainTime").val('');
    $("#frequency").val('');
});


database.ref().on("child_added", function(childSnapshot) {


// we're getting the current time
var currentTime = moment();
console.log(currentTime);
//get train start time from the database
var trainStart = childSnapshot.val().trainTime;
console.log(trainStart);
// push the start time back one year so it comes before the current time
var trainStartconv = moment(trainStart, "hh:mm").subtract(1, "years");
console.log(trainStartconv);
//calculate the difference between the current time and the trainStartconv
var timeDiff = moment().diff(moment(trainStartconv), "minutes");
console.log(timeDiff);
// time apart timeDiff remainder% frequency
// minutes until arrival frequecy - timeApart
// 

// minutes till arrival into add, "m" .format("LT")
var nextArrival = moment().add();
var minutesAway = moment(nextArrival).diff(currentTime, "minutes");
    // Log everything that's coming out of snapshot
        $("#headInfo").append(`<
            <tr>
                    <td>${childSnapshot.val().name}</td>
                    <td>${childSnapshot.val().destination}</td> 
                    <td>${childSnapshot.val().frequency}</td>
                    <td>${nextArrival}</td>
                    <td>${minutesAway} </td> 
            </tr>
            `);
        // Change the HTML to reflect
        // Handle the errors
        }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
