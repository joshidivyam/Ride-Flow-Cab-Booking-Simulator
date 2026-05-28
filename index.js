
const h2_FlowDiv = document.createElement("div");
h2_FlowDiv.id = "h2_FlowDiv";

function addMessage(message) {
  const h2_message = document.createElement("h2");
  h2_message.id = "h2_message";
  h2_message.textContent = message;
  h2_FlowDiv.append(h2_message);
}

let somethingWrong = false;


function cabBook(cabDetails) {
  addMessage("...Booking cab....");
  return new Promise((resolve, reject) => {
    if (somethingWrong) {
      reject("driver couldnt pick u up!");
      return;
    };
    setTimeout(() => {
      addMessage(`A ${cabDetails.cab_Pref} ${cabDetails.cab_Number} is booked for you and ${cabDetails.driver_Name} is on his way to pick u up from ${cabDetails.pickup_Location}`);
      cabDetails.booking = true;
      resolve(cabDetails);
    }, 5000);
  });
};


function driverPickup(cabDetails) {
  addMessage(`Your driver ${cabDetails.driver_Name} is here!`);
  return new Promise((resolve, reject) => {
    if (somethingWrong) {
      reject("driver couldnt pick u up!");
      return;
    };
    setTimeout(() => {
      addMessage(`${cabDetails.driver_Name} has arrived at ${cabDetails.pickup_Location} and is waiting for you! Please share ${cabDetails.otp} with him to begin ride!`);
      cabDetails.pickup = true;
      resolve(cabDetails);
    }, 5000);
  });

};


function startRide(cabDetails) {
  addMessage("...starting ride");
  return new Promise((resolve, reject) => {
    if (somethingWrong) {
      reject("the ride couldn't begin!");
      return;
    };
    setTimeout(() => {
      addMessage(`Your ride has started and you're on your way to ${cabDetails.drop_Location} with ${cabDetails.driver_Name}!`);
      cabDetails.rideStarted = true;
      cabDetails.timeOfStart = Date();
      resolve(cabDetails);
    }, 5000);
  });

};


function endRide(cabDetails) {
  addMessage("Almost there, ride will end soon!");
  return new Promise((resolve, reject) => {
    if (somethingWrong) {
      reject("the ride ended unexpectedly");
      return;
    };
    setTimeout(() => {
      addMessage(`You have arrived, ${cabDetails.driver_Name} has dropped you from ${cabDetails.pickup_Location} to ${cabDetails.drop_Location}`);
      cabDetails.rideEnded = true;
      cabDetails.timeOfEnd = Date();
      resolve(cabDetails);
    }, 5000)
  });

};


function giveRating(cabDetails) {
  addMessage(`${cabDetails.cab_Price} is your total amount to be paid to ${cabDetails.driver_Name}. Thank you for travelling with us!`);
  return new Promise((resolve, reject) => {
    if (somethingWrong) {
      reject("couldnt give ratings!");
      return;
    };
    setTimeout(() => {
      addMessage("Please provide the driver's ratings:⭐/⭐⭐/⭐⭐⭐/⭐⭐⭐⭐/⭐⭐⭐⭐⭐");
      cabDetails.giveRatings = true;
      resolve(cabDetails);
    }, 5000)
  });

};

async function startSysem(cabDetails) {
  try {
    const cabBooked = await cabBook(cabDetails);
    const driverArrived = await driverPickup(cabBooked);
    const rideStarted = await startRide(driverArrived);
    const rideEnded = await endRide(rideStarted);
    const gaveRatings = await giveRating(rideEnded);
  }
  catch (error) {
    console.log("error:", error);
  }
}



const parent = document.querySelector("#parent");//parent div
const clickButton = document.querySelector("#clickButton");//click button

const detailsWindow = document.createElement("div");
detailsWindow.id = "detailsWindow";
//after clickbtn div window

const detailsForm = document.createElement("form");//form 
detailsForm.id = "detailsForm";

const userNameLabel = document.createElement("label");//name label input
userNameLabel.textContent = "Your Name:"
userNameLabel.id = "userNameLabel";
userNameLabel.htmlFor = "userNameInput";
const userNameInput = document.createElement("input");
userNameInput.id = "userNameInput";
userNameInput.required = true;

const pickUpLocLabel = document.createElement("label");//pickuploc label input
pickUpLocLabel.textContent = "Pick Up Location:"
pickUpLocLabel.id = "pickUpLocLabel";
pickUpLocLabel.htmlFor = "pickUpLocInput";
const pickUpLocInput = document.createElement("input");
pickUpLocInput.id = "pickUpLocInput";
pickUpLocInput.required = true;

const dropLocLabel = document.createElement("label");//droploc label input
dropLocLabel.textContent = "Drop Off Location:"
dropLocLabel.id = "dropLocLabel";
dropLocLabel.htmlFor = "dropLocInput";
const dropLocInput = document.createElement("input");
dropLocInput.id = "dropLocInput";
dropLocInput.required = true;
const cabTypePrefLabel = document.createElement("label");//cabtypepref label input
cabTypePrefLabel.textContent = "Cab Preference:"
cabTypePrefLabel.id = "cabTypePrefLabel";
cabTypePrefLabel.htmlFor = "cabTypePrefInput";
const cabTypePrefInput = document.createElement("input");
cabTypePrefInput.id = "cabTypePrefInput";
cabTypePrefInput.required = true;

const submitButton = document.createElement("button");
submitButton.id = "submitButton";
submitButton.textContent = "Book Cab!";
submitButton.type = "submit";


clickButton.addEventListener('click', (e) => {
  //action to perform after clicking clickbtn
  if (detailsWindow.contains(detailsForm)) return;
  detailsForm.append(userNameLabel, userNameInput, pickUpLocLabel, pickUpLocInput, dropLocLabel, dropLocInput, cabTypePrefLabel, cabTypePrefInput, submitButton);
  detailsWindow.append(detailsForm);
  parent.append(detailsWindow);
})

detailsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cabDetails = {
    driver_Name: "Matthew",
    passenger_Name: userNameInput.value.trim(),
    cab_Number: "HR99AY3333",
    cab_Price: "1500Rs",
    otp: 12345,
    pickup_Location: pickUpLocInput.value.trim(),
    drop_Location: dropLocInput.value.trim(),
    cab_Pref: cabTypePrefInput.value.trim()
  }
  detailsWindow.append(h2_FlowDiv);
  parent.append(detailsWindow);
  startSysem(cabDetails);
});