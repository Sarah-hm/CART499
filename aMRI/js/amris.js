//Get datascapes data and create the map

fetch("getData.php")
  .then((response) => response.text())
  .then(async (data) => {
    let parsedJSON = JSON.parse(data);
    let prompt;
    let polyAlphas = [];
    let pathAlphas = [];

    for (let i = 0; i < parsedJSON.length - 1; i++) {
      prompt = parsedJSON[i].aMRIprompt;
      //   polyAlphas.push(parsedJSON[i].polygonsAlphas.split(","));
      //   pathAlphas.push(parsedJSON[i].pathsAlphas.split(","));
      polyAlphas = parsedJSON[i].polygonsAlphas.split(",");
      pathAlphas = parsedJSON[i].pathsAlphas.split(",");
    }

    let polygons = document
      .getElementById("svg-brain")
      .getElementsByTagName("polygon");
    let paths = document
      .getElementById("svg-brain")
      .getElementsByTagName("path");

    //foor all polygons, find its opacity (alpha) average given by all the dataset
    Object.keys(polygons).forEach((j) => {
      let totalAlpha = 0;
      let averageAlpha = 0;
      //   let averAlpha;
      for (let i = 0; i < parsedJSON.length; i++) {
        console.log(polyAlphas[j]);
        let currentAlpha = parseFloat(polyAlphas[j]);
        totalAlpha = totalAlpha + currentAlpha;
        console.log(totalAlpha);
      }

      averageAlpha = totalAlpha / parsedJSON.length;
      console.log(averageAlpha);

      polygons[j].style.opacity = averageAlpha;
    });

    Object.keys(paths).forEach((j) => {
      let totalAlpha = 0;
      let averageAlpha = 0;
      //   let averAlpha;
      for (let i = 0; i < parsedJSON.length; i++) {
        //   console.log(polyAlphas[j]);
        let currentAlpha = parseFloat(pathAlphas[j]);
        totalAlpha = totalAlpha + currentAlpha;
        console.log(totalAlpha);
      }

      averageAlpha = totalAlpha / parsedJSON.length;
      console.log(averageAlpha);

      paths[j].style.opacity = averageAlpha;
    });

    //For all parsed object, store the X poly Alpha in the X Alpha array,

    //which you average out and give the opacity to
  });
