//Get datascapes data and create the map

fetch("getData.php")
  .then((response) => response.text())
  .then(async (data) => {
    let parsedJSON = JSON.parse(data);
    let prompt;
    let polyAlphas = [];
    let pathAlphas = [];

    let polygons = document
      .getElementById("svg-brain")
      .getElementsByTagName("polygon");
    let paths = document
      .getElementById("svg-brain")
      .getElementsByTagName("path");

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

      displayAMRIprompt(
        prompt,
        parsedJSON,
        polygons,
        paths,
        polyAlphas,
        pathAlphas
      );
    }

    // console.log(polyAlphas);

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

    // Make the prompts appear at random
  });

function displayAMRIprompt(
  prompt,
  data,
  polygons,
  paths,
  polyAlphas,
  pathAlphas
) {
  let pos = randomizePos();

  this.div = document.createElement("div");
  this.div.classList.add("aMRI-displayed-prompt");

  document.body.appendChild(this.div);

  this.div.style.left = `${pos.x}px`;
  this.div.style.top = `${pos.y}px`;

  this.p = document.createElement("p");
  this.div.appendChild(this.p);
  this.p.innerHTML = `${prompt}`;

  this.div.addEventListener("mouseover", () => {
    for (let i = 0; i < data.length - 1; i++) {
      if (prompt === data[i].aMRIprompt) {
        Object.keys(polygons).forEach((j) => {
          //   console.log(polygons[j]);
          //   console.log(polyAlphas[i].currentEntry[j].alpha);
          let opacity = polyAlphas[i].currentEntry[j].alpha;
          polygons[j].setAttribute("opacity", opacity);

          console.log(opacity);
          //   polygons[j].style.opacity = polyAlphas[j];
        });
      }
    }
  });
}

function randomizePos() {
  let x = Math.floor(Math.random() * innerWidth);
  let y = Math.floor(Math.random() * innerHeight);
  return { x, y };
}
