//Get datascapes data and create the map

fetch("getData.php")
  .then((response) => response.text())
  .then(async (data) => {
    let parsedJSON = JSON.parse(data);

    for (let i = 0; i < parsedJSON.length - 1; i++) {
      let prompt = parsedJSON[i].aMRIprompt;

      let polyAlphas = parsedJSON[i].polygonsAlphas.split(",");

      let pathAlphas = parsedJSON[i].pathsAlphas.split(",");

      let polygons = document
        .getElementById("svg-brain")
        .getElementsByTagName("polygon");
      let paths = document
        .getElementById("svg-brain")
        .getElementsByTagName("path");

      Object.keys(polygons).forEach((j) => {
        polygons[j].style.opacity = polyAlphas[j];
      });

      Object.keys(paths).forEach((j) => {
        paths[j].style.opacity = pathAlphas[j];
      });
    }
  });
