// require("dotenv").config();
// console.log(process.env);

var API_KEY = "hAqRzYzMAFDKEnVTacuBgxtTayZqHDvb5UqazeiX";

let likeImgArr = JSON.parse(localStorage.getItem("likeImgArr")) || [];
console.log({ likeImgArr });

// Render saved images from local storage
window.onload = function getFavData() {
  let favImages = [];

  for (i = 0; i < likeImgArr.length; i++) {
    const api_url =
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&concept_tags=True&thumbs=True&date=` +
      likeImgArr[i];
    console.log({ api_url });
    // console.log("API url", api_url);
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
        displayFavImg(data);
      });
      function displayFavImg(data) {
        // for (let i = 0; i < data.length; i++) {
          if (data.media_type === "video") {
            favImages.push(
              `<div id="imgDesc">
                  <h2>${data.title}</h2>
                  <p>${data.date}</p>
                  <iframe width="420" height="345" src="${data.url}">Video Not Available</iframe>
                  <button type="button" class="btnClass" id="likeBtn"  >Unlike</button>
                  </div>`
            );
          } else {
            favImages.push(
              `<div id="imgDesc">
                      <h2>${data.title}</h2>
                      <p>${data.date}</p>
                      <img src="${data.url}" alt="${data.explanation}"/>
                      <button type="button" class="btnClass" id="likeBtn"  >Unlike</button>
                      </div>`
            );
          }
        // }
        console.log({ favImages });
        document.querySelector(".myFavImages").innerHTML = favImages.join("");
      }
  }

};

