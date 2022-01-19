// require("dotenv").config();
// console.log(process.env);

// var API_KEY = hAqRzYzMAFDKEnVTacuBgxtTayZqHDvb5UqazeiX;

const api_url = `https://api.nasa.gov/planetary/apod?api_key=hAqRzYzMAFDKEnVTacuBgxtTayZqHDvb5UqazeiX`;
console.log("API url", api_url);

async function getNasaData(api_url) {
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
      console.log("hello", data);
      display(data);
    });
}

getNasaData(api_url);
