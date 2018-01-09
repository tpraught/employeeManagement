// Initialize Firebase
var config = {
   apiKey: "AIzaSyCEzXuy7QwNgy3Mh-3VD8g5sjY7vAGGPoA",
   authDomain: "project-1-e80c4.firebaseapp.com",
   databaseURL: "https://project-1-e80c4.firebaseio.com",
   projectId: "project-1-e80c4",
   storageBucket: "project-1-e80c4.appspot.com",
   messagingSenderId: "687543752874"
 };
firebase.initializeApp(config);

 var database = firebase.database();

 var name = "";
 var role = "";
 var startDate = "";
 var rate = 0;

 // $(document).ready(function(){
       $("#employees").on("click", function(){  
       });


 // Capture Button Click
   $("#add-employee").on("click", function(event) {
     event.preventDefault();

     // Grabbed values from text boxes
     name = $("#name-input").val().trim();
     role = $("#role-input").val().trim();
     startDate = moment($("#startDate-input").val().trim(), "DD/MM/YY").format("X");
     rate = $("#rate-input").val().trim();

    

     // Code for handling the push
     database.ref().push({
       name: name,
       role: role,
       startDate: startDate,
       rate: rate
     });

	$("#name-input").val("");
	$("#role-input").val("");
	$("#startDate-input").val("");
	$("#rate-input").val("");

   });

database.ref().on("child_added", function(snapshot) {
     // storing the snapshot.val() in a variable for convenience
     var sv = snapshot.val();

     // Console.loging the last user's data
     console.log(sv.name);
     console.log(sv.role);
     console.log(sv.startDate);
     console.log(sv.rate);

	var monthsWorked = moment().diff(moment(sv.startDate), "months");
	console.log(monthsWorked);

 	var billed = (monthsWorked*sv.rate);
   
    var markup = "<tr><td>" + sv.name + "</td><td>" + sv.role + "</td><td>" + sv.startDate + "</td><td>" + monthsWorked + "</td><td>"+ "$" + sv.rate+"</td><td>"+ "$" + billed + "</td></tr>";
       
       $("#employees").prepend(markup);

// var markup = "<tr><td>" + sv.name + "</td><td>" + sv.role + "</td><td>" + sv.startDate + "</td><td>" + monthsWorked+ "</td><td>"+sv.rate+"</td><td>"+ billed+ "</td></tr>";
//         $("table tbody").append(markup);
     // Handle the errors
   }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
   });