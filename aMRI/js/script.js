// POST DATA
async function postData(aMRIprompt, polygonsAlphas, pathsAlphas) {
  const response = await fetch(`postData.php`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    //headers: {
    //"Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
    //},
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: new URLSearchParams({
      aMRIprompt: aMRIprompt,
      polygonsAlphas: polygonsAlphas,
      pathsAlphas: pathsAlphas,
    }), // body data type must match "Content-Type" header
  });
  let resp = await response.text();
  console.log(resp);
}

window.onload = (event) => {
  const aMRIcanvas = document.getElementById("aMRI-canvas");
  const paths = document.getElementsByTagName("path");
  const polygons = document.getElementsByTagName("polygon");

  let promptValue;
  let mouseDown = false;

  aMRIcanvas.addEventListener("click", (e) => {
    console.log(e.clientX, e.clientY);

    // Create span element
    let ripple = document.createElement("span");

    // Add ripple class to span
    ripple.classList.add("ripple");

    // Add span to the button
    document.body.appendChild(ripple);

    // Get position of X
    let x = e.clientX;

    // Get position of Y
    let y = e.clientY;

    // Position the span element
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  });

  function handleBrainSvgsEvents(e) {
    console.log(e.style);

    // console.log(e.style.opacity);
    let currentOpacity = parseFloat(e.getAttribute("opacity"));
    // console.log(currentOpacity);
    if (currentOpacity < 1) {
      let newOpacity = (currentOpacity += 0.1);
      console.log(newOpacity);
      e.setAttribute("opacity", newOpacity);
    }
  }

  Object.keys(polygons).forEach((i) => {
    polygons[i].setAttribute("opacity", 0.1);
  });

  Object.keys(paths).forEach((i) => {
    paths[i].setAttribute("opacity", 0.1);
  });

  document.addEventListener("mousedown", () => {
    mouseDown = true;
    console.log("mouse down");
  });

  document.addEventListener("mouseup", () => {
    mouseDown = false;
    console.log("mouse up");
  });

  Object.keys(polygons).forEach((i) => {
    polygons[i].addEventListener("mouseover", () => {
      console.log(mouseDown);
      if (mouseDown) {
        handleBrainSvgsEvents(polygons[i]);
      }
    });
  });
  Object.keys(paths).forEach((i) => {
    paths[i].addEventListener("mouseover", () => {
      if (mouseDown) {
        handleBrainSvgsEvents(paths[i]);
      }
    });
  });

  // Submitting the aMRI prompt removes the window, and displays the canvas prompt
  document
    .getElementById("aMRI-prompt-submit-button")
    .addEventListener("click", () => {
      promptValue = document.getElementById("amri-prompt").value;
      document.getElementById("aMRI-prompt-container").remove();
      document.getElementById("aMRI-canvas-prompt-container").style.display =
        "block";
      document.getElementById("aMRI-submit-container").style.display = "block";
    });

  // submit the full aMRI will post the prompt and the opacity level of all paths to the dataset
  document
    .getElementById("aMRI-canvas-prompt-submit-button")
    .addEventListener("click", () => {
      console.log("clicked");
      let polygonsAlphas = [];
      let pathsAlphas = [];

      Object.keys(polygons).forEach((i) => {
        let currentAlpha = parseFloat(polygons[i].getAttribute("opacity"));
        polygonsAlphas.push(currentAlpha);
      });

      Object.keys(paths).forEach((i) => {
        let currentAlpha = parseFloat(paths[i].getAttribute("opacity"));
        pathsAlphas.push(currentAlpha);
      });

      postData(promptValue, polygonsAlphas, pathsAlphas);
      window.location.replace("aMRIs.php");
    });
};
