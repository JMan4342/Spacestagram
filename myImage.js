// require("dotenv").config();
// console.log(process.env);

var API_KEY = "hAqRzYzMAFDKEnVTacuBgxtTayZqHDvb5UqazeiX";

// Render saved images from local storage
window.onload = async function getFavData() {
  const likeImgArr =
    (await JSON.parse(localStorage.getItem("likeImgArr"))) || [];
  console.log({ likeImgArr });

  let favImages = [];

  for (let i = 0; i < likeImgArr.length; i++) {
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
    await fetch(api_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log({ data });
        displayFavImg(data);
      });
    // }

    function displayFavImg(data) {
      // for (let i = 0; i < data.length; i++) {
      if (data.media_type === "video") {
        favImages.push(
          `<div id="imgDesc` +
            [i] +
            `">
                    <h2>${data.title}</h2>
                    <p id="date` +
            [i] +
            `">${data.date}</p>
                            <iframe width="420" height="345" src="${data.url}">Video Not Available</iframe>
                    <button type="button" class="btnClass" id="likeBtn` +
            [i] +
            `"  >Unlike</button>
            <a href="https://twitter.com/share?url=${data.url}">
            Twitter
        </a>
        
                    </div>`
        );
      } else {
        favImages.push(
          `<div id="imgDesc` +
            [i] +
            `">
                        <h2>${data.title}</h2>
                        <p id="date` +
            [i] +
            `">${data.date}</p>
                        <img src="${data.url}" alt="${data.explanation}"/>
                        <button type="button" class="btnClass" id="likeBtn` +
            [i] +
            `"  >Unlike</button>
            <a href="https://twitter.com/share?url=${data.url}">
            Twitter
        </a>

                        </div>`
        );
      }
      document.querySelector(".myFavImages").innerHTML = favImages.join("");

      for (let j = 0; j < favImages.length; j++) {
        document
          .querySelector("#likeBtn" + [j])
          .addEventListener(`click`, (event) => {
            if (document.querySelector("#likeBtn" + [j]).innerText === "Like") {
              document.querySelector("#likeBtn" + [j]).innerText = "Unlike";
              if (
                !likeImgArr.includes(
                  document.querySelector("#date" + [j]).innerText
                )
              )
                likeImgArr.push(
                  document.querySelector("#date" + [j]).innerText
                );
              localStorage.setItem(
                "likeImgArr",
                JSON.stringify(likeImgArr.sort())
              );
            } else {
              document.querySelector("#likeBtn" + [j]).innerText = "Like";
              if (
                likeImgArr.includes(
                  document.querySelector("#date" + [j]).innerText
                )
              )
                likeImgArr.splice(
                  likeImgArr.indexOf(
                    document.querySelector("#date" + [j]).innerText
                  ),
                  1
                );
              localStorage.setItem("likeImgArr", JSON.stringify(likeImgArr));
              document.querySelector("#imgDesc" + [j]).remove();
              alert("You unliked the image");
            }
          });
        console.log({ likeImgArr });
      }
    }
  }
  console.log({ favImages });
};
