//Get datascapes data and create the map
fetch("getData.php")
  .then((response) => response.text())
  .then(async (data) => {
    let parsedJSON = JSON.parse(data);

    // let currentCoords = await fetchGeolocation();
    // console.log(currentCoords);
    // console.log(currentCoords);
    //set the empty line array that is going to create the path
    let line = [];
    //  console.log(parsedJSON);
    for (let i = 0; i < parsedJSON.length - 1; i++) {
      let lati = parseFloat(parsedJSON[i].latitude);
      let long = parseFloat(parsedJSON[i].longitude);

      // console.log(lati, long);
      let coords = { lat: lati, lng: long };
      line.push(coords);
    }
    // console.log(line);

    const loadMap = new Promise((resolve, reject) => {
      // console.log(clientCoords);
      map = new MyMap(clientCoords.latitude, clientCoords.longitude);
      map.initPolyline(line);
    });
    // == DATA_SCAPES DATA FETCH ==

    //Fetch data from native-land, send it to map object
    fetch("https://native-land.ca/api/index.php?maps=territories")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        //Run through data and divide the polygons (puts it in temp) data.length
        for (let i = 0; i < data.length; i++) {
          // console.log(i);
          //console.log(data[i]);
          let link = data[i].properties.description;

          // console.log(data[i].geometry.coordinates)
          let temp = data[i].geometry.coordinates;
          //  let geomArray = data[i].geometry.coordinates[0];
          // console.log(temp);
          //Puts all polygon lines (in temp) into their own arrays (geomArray)
          for (let j = 0; j < temp.length; j++) {
            //console.log (temp[j]);
            let geomArray = temp[j];
            //set the empty line array that is going to create the path
            let line = [];
            //Parse all the lines' coordinates (latitude, longitude) and push them into the array
            for (let k = 0; k < geomArray.length; k++) {
              //  console.log(geomArray[k])
              let coordinates = geomArray[k];
              let long = parseFloat(coordinates[0]);
              let lati = parseFloat(coordinates[1]);
              let coords = { lat: lati, lng: long };
              line.push(coords);
            } //FOR GEOMARRAY (coordinates)

            let polygon = L.polygon(line, {
              zindex: 0,
              color: "white",
              fillOpacity: 0.0,
              stroke: false,
              className: "native-land-polygons",
            });
            nativeLandPolys.push({ polygon: polygon, link: link });
          }
        }
        //set the data in the map as native land;
        map.nativeLandData = nativeLandPolys;
        //toggle the map on
        map.toggleNativeLandLayer();
      });
    // == NATIVE LAND DATA FETCH ==
  })
  .catch((error) => console.error(error));
