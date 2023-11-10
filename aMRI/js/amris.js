//Get datascapes data and create the map

fetch("getData.php")
  .then((response) => response.text())
  .then(async (data) => {
    let parsedJSON = JSON.parse(data);
    let prompt;
    let polyAlphas = [];
    let pathAlphas = [];

    for (let i = 0; i < parsedJSON.length - 1; i++) {
      let currentEntry = i;
      prompt = parsedJSON[i].aMRIprompt;

      let polySplitStringAr = parsedJSON[i].polygonsAlphas.split(",");
      let pathSplitStringAr = parsedJSON[i].polygonsAlphas.split(",");

      //Put all alpha level (of all polygons) in an array, per dataset item (one aMRI)
      let polyTempAr = [];
      polySplitStringAr.forEach((e) => {
        polyTempAr.push({ alpha: parseFloat(e) });
      });

      polyAlphas.push({ currentEntry: polyTempAr });

      //   console.log(polyAlphas);

      let pathTempAr = [];
      pathSplitStringAr.forEach((e) => {
        pathTempAr.push({ alpha: parseFloat(e) });
      });

      pathAlphas.push({ currentEntry: pathTempAr });
    }

    // console.log(polyAlphas);

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
      for (let i = 0; i < parsedJSON.length - 1; i++) {
        let currentAlpha = polyAlphas[i].currentEntry[j].alpha;
        totalAlpha += currentAlpha;
      }

      averageAlpha = totalAlpha / parsedJSON.length;

      polygons[j].style.opacity = averageAlpha;
    });

    Object.keys(paths).forEach((j) => {
      let totalAlpha = 0;
      let averageAlpha = 0;
      //   let averAlpha;
      for (let i = 0; i < parsedJSON.length - 1; i++) {
        let currentAlpha = pathAlphas[i].currentEntry[j].alpha;
        totalAlpha += currentAlpha;
      }

      averageAlpha = totalAlpha / parsedJSON.length;

      paths[j].style.opacity = averageAlpha;
    });

    //For all parsed object, store the X poly Alpha in the X Alpha array,

    //which you average out and give the opacity to
  });
