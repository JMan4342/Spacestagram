// require("dotenv").config();
// console.log(process.env);

var API_KEY = "hAqRzYzMAFDKEnVTacuBgxtTayZqHDvb5UqazeiX";

document.querySelector("#searchBtn").addEventListener("click", getNasaData);

function getNasaData(event) {
  event.preventDefault();
  var start_date = document.querySelector("#startDate").value;
  var end_date = document.querySelector("#endDate").value;
  console.log({ start_date }, { end_date });
  const api_url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&concept_tags=True&thumbs=True&start_date=${start_date}&end_date=${end_date}`;
  console.log("API url", api_url);
  // const response = await fetch(url);
  // var data = await response.json();
  // if (response) {
  //     hideloader();
  // }
  // display(data);
  fetch(api_url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log({ data });
      displayData(data);
    });
}

// getNasaData(api_url);

function displayData(data) {
  let allImage = [];
  for (let i = 0; i < data.length; i++) {
    //   for (let obj of data) {

          if (data[i].media_type === "video") {
            allImage.push(
              `<div id="imgDesc">
                  <h2>${data[i].title}</h2>
                  <p>${data[i].date}</p>
                  <iframe width="420" height="345" src="${data[i].url}">Video Not Available</iframe>
                  <button type="button" class="btnClass" id="likeBtn` + [i] + `"  >Like</button>
                  </div>`
            );
          } else {
            allImage.push(
              `<div id="imgDesc">
                      <h2>${data[i].title}</h2>
                      <p>${data[i].date}</p>
                      <img src="${data[i].url}" alt="${data[i].explanation}"/>
                      <button type="button" class="btnClass" id="likeBtn` + [i] + `"  >Like</button>
                      </div>`
            );
        //   }
      }
  }

  document.getElementById("allImages").innerHTML = allImage.join("");

  console.log(allImage);

  document.querySelectorAll(".btnClass").forEach((item) => {
    item.addEventListener("click", (event) => {
      //handle click
      event.preventDefault();
        if (document.querySelector(".btnClass").innerHTML === "Like") {
          document.querySelector(".btnClass").innerHTML = "Unlike";
        } else {
          document.querySelector(".btnClass").innerHTML = "Like";
        }
    });
  });
}

// document.querySelectorAll(".btnClass").forEach((item) => {
//   item.addEventListener("click", (event) => {
// if (document.querySelector(".btnClass").innerText === "Like") {
//   document.querySelector(".btnClass").innerText = "Unlike";
// } else {
//   document.querySelector(".btnClass").innerText = "Like";
// }
//   });
// });

//  function clickLike() {
// if (document.querySelector(".btnClass").innerText === "Like") {
//     document.querySelector(".btnClass").innerText = "Unlike";
//   } else {
//     document.querySelector(".btnClass").innerText = "Like";
//   }

//  function clickLike() {
// if (document.querySelector(".btnClass").innerText === "Like") {
//     document.querySelector(".btnClass").innerText = "Unlike";
//   } else {
//     document.querySelector(".btnClass").innerText = "Like";
//   }

// }
