// require("dotenv").config();
// console.log(process.env);

var API_KEY = "hAqRzYzMAFDKEnVTacuBgxtTayZqHDvb5UqazeiX";

let likeImgArr = JSON.parse(localStorage.getItem("likeImgArr")) || [];

// Render saved images from local storage
function getFavData() {
  for (let i = 0; i = likeImgArr.length; i++) {

    const api_url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&concept_tags=True&thumbs=True&start_date=${likeImgArr[i]}`;
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
        displayFavImg(data);
      });
  }
}


function displayFavImg(data) {
  let favImages = [];
  for (let i = 0; i < data.length; i++){
    if (data[i].media_type === "video") {
      favImages.push(
        `<div id="imgDesc">
              <h2>${data[i].title}</h2>
              <p>${data[i].date}</p>
              <iframe width="420" height="345" src="${data[i].url}">Video Not Available</iframe>
              <button type="button" class="btnClass" id="likeBtn` +
          [i] +
          `"  >Unlike</button>
              </div>`
      );
    } else {
      favImages.push(
        `<div id="imgDesc">
                  <h2>${data[i].title}</h2>
                  <p>${data[i].date}</p>
                  <img src="${data[i].url}" alt="${data[i].explanation}"/>
                  <button type="button" class="btnClass" id="likeBtn` +
          [i] +
          `"  >Unlike</button>
                  </div>`
      );
    }
  }
  document.querySelector(".myFavImages").innerHTML = favImages.join("");

}
