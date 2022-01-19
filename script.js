// require("dotenv").config();
// console.log(process.env);

// var API_KEY = hAqRzYzMAFDKEnVTacuBgxtTayZqHDvb5UqazeiX;

const api_url = `https://api.nasa.gov/planetary/apod?api_key=hAqRzYzMAFDKEnVTacuBgxtTayZqHDvb5UqazeiX&concept_tags=True&thumbs=True&start_date=2022-01-01&end_date=2022-01-10`;
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
      console.log({ data });
      displayData(data);
    });
}

getNasaData(api_url);

function displayData(data) {
  //   const { title } = data[0].title;
  //   const { date } = data[0].date;
  //   const { image } = data[0].url;

  //   console.log({ title });
  //   console.log({ date });
  //   console.log({ image });
  document.getElementById("title").textContent = data.map(data => data.title);
  document.getElementById("date").textContent = data.map(data => data.date);
//   document.getElementById("image").src = data.map(data => data.url);
}
