// require("dotenv").config();
// console.log(process.env);

var API_KEY = "hAqRzYzMAFDKEnVTacuBgxtTayZqHDvb5UqazeiX";

let likeImgArr = JSON.parse(localStorage.getItem("likeImgArr")) || [];

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

function displayData(data) {
  let allImage = [];
  for (let i = 0; i < data.length; i++) {
    if (likeImgArr.includes(data[i].date)) {
      if (data[i].media_type === "video") {
        allImage.push(
          `<div id="imgDesc">
            <h2>${data[i].title}</h2>
            <p>${data[i].date}</p>
            <iframe width="420" height="345" src="${data[i].url}">Video Not Available</iframe>
            <button type="button" class="unlikeBtnClass" id="likeBtn` +
            [i] +
            `">Unlike</button>
            <i class="fas fa-heart iconHeart" id="heartIcon` +
            [i] +
            `"></i>
            <a href="https://twitter.com/share?url=${data[i].url}&text=Check out this image from NASA!" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="https://www.facebook.com/sharer.php?u=${data[i].url}" target="_blank"><i class="fab fa-facebook"></i></a>
          </div>`
        );
      } else {
        allImage.push(
          `<div id="imgDesc">
            <h2>${data[i].title}</h2>
            <p>${data[i].date}</p>
            <img src="${data[i].url}" alt="${data[i].explanation}"/>
            <button type="button" class="unlikeBtnClass" id="likeBtn` +
            [i] +
            `">Unlike</button>
            <i class="fas fa-heart iconHeart" id="heartIcon` +
            [i] +
            `"></i>
            <a href="https://twitter.com/share?url=${data[i].url}&text=Check out this image from NASA!" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="https://www.facebook.com/sharer.php?u=${data[i].url}" target="_blank"><i class="fab fa-facebook"></i></a>
          </div>`
        );
      }
    } else {
      if (data[i].media_type === "video") {
        allImage.push(
          `<div id="imgDesc">
            <h2>${data[i].title}</h2>
            <p>${data[i].date}</p>
            <iframe width="420" height="345" src="${data[i].url}">Video Not Available</iframe>
            <button type="button" class="likeBtnClass" id="likeBtn` +
            [i] +
            `">Like</button>
            <i class="fas fa-heart iconHeart" id="heartIcon` +
            [i] +
            `"></i>
            <a href="https://twitter.com/share?url=${data[i].url}&text=Check out this image from NASA!" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="https://www.facebook.com/sharer.php?u=${data[i].url}" target="_blank"><i class="fab fa-facebook"></i></a>
          </div>`
        );
      } else {
        allImage.push(
          `<div id="imgDesc">
            <h2>${data[i].title}</h2>
            <p>${data[i].date}</p>
            <img src="${data[i].url}" alt="${data[i].explanation}"/>
            <button type="button" class="likeBtnClass" id="likeBtn` +
            [i] +
            `">Like</button>
            <i class="fas fa-heart iconHeart" id="heartIcon` +
            [i] +
            `"></i>
            <a href="https://twitter.com/share?url=${data[i].url}&text=Check out this image from NASA!" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="https://www.facebook.com/sharer.php?u=${data[i].url}" target="_blank"><i class="fab fa-facebook"></i></a>
          </div>`
        );
      }
    }
  }

  document.querySelector(".allImages").innerHTML = allImage.join("");

  for (let j = 0; j < allImage.length; j++) {
    document
      .querySelector("#likeBtn" + [j])
      .addEventListener(`click`, (event) => {
        if (document.querySelector("#likeBtn" + [j]).innerText === "Like") {
          document.querySelector("#likeBtn" + [j]).innerText = "Unlike";
          document
            .querySelector("#likeBtn" + [j])
            .classList.remove("likeBtnClass");
          document
            .querySelector("#likeBtn" + [j])
            .classList.add("unlikeBtnClass");
          document
            .querySelector("#heartIcon" + [j])
            .classList.remove("unlikeHeart");
          document.querySelector("#heartIcon" + [j]).classList.add("likeHeart");
          if (!likeImgArr.includes(data[j].date)) likeImgArr.push(data[j].date);
          localStorage.setItem("likeImgArr", JSON.stringify(likeImgArr.sort()));
        } else {
          document.querySelector("#likeBtn" + [j]).innerText = "Like";
          // document.querySelector("#likeBtn" + [j]).innerHTML = `<i class="fas fa-heart">Like</i>`;
          document
            .querySelector("#likeBtn" + [j])
            .classList.remove("unlikeBtnClass");
          document
            .querySelector("#likeBtn" + [j])
            .classList.add("likeBtnClass");
          document
            .querySelector("#heartIcon" + [j])
            .classList.remove("likeHeart");
          document
            .querySelector("#heartIcon" + [j])
            .classList.add("unlikeHeart");
          if (likeImgArr.includes(data[j].date))
            likeImgArr.splice(likeImgArr.indexOf(data[j].date), 1);
          localStorage.setItem("likeImgArr", JSON.stringify(likeImgArr));
        }
      });
    console.log({ likeImgArr });
  }

  console.log({ allImage });
}
