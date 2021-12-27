console.log("client side js is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// const url = `http://api.weatherstack.com/current?access_key=f33d22aa667751eb3998cc50826f55ed&query=${latitude},${longitude}`;
// const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//     address
//   )}.json?access_token=pk.eyJ1Ijoic2FqaXRoMTYiLCJhIjoiY2t4anlnejlhNTZhdTMwbzFjNGZtcXdmbCJ9.sTYYJQ5TxK0hMopiTUoe-w`;

// fetch("http://localhost:3000/weather?address=Boston").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log("error");
//     } else {
//       console.log("location", data.location);
//       console.log("forecast", data.forecastData);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading content...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          // console.log("error", data.error);
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecastData;
        }
      });
    }
  );
  // console.log("testing", location);
});
