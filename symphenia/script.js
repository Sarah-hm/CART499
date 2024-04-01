window.onload = () => {
  const gridContainer = document.getElementById("grid-container");

  const col_num = getComputedStyle(document.documentElement).getPropertyValue(
    "--col-num"
  );
  const row_num = getComputedStyle(document.documentElement).getPropertyValue(
    "--row-num"
  );

  let deltaX = 75;
  let deltaY = 150;
  let user = document.getElementById("user");

  let pixels = [];

  // let userEls = document.getElementById("user").getElementsByTagName("rect")[0];

  //   for each rows
  for (let row = 0; row < row_num; row++) {
    // for each columns
    for (let col = 0; col < col_num; col++) {
      let pixel = new Pixel(row, col);
      pixels.push(pixel);
    }
  }

  for (let row = 0; row < row_num; row++) {
    // for each columns
    for (let col = 0; col < col_num; col++) {
      // get all 4 nearest h values
      for (let pixel in pixels) {
      }
    }
  }

  document.addEventListener("mousemove", (e) => {
    mouseMove(e.clientX, e.clientY);

    // for (let pixel of pixels) {
    // }
  });

  // Every second, take a screenshot of the pistons that are pressed and take their RGB values and average them together, eg: red is predominant, add 5 to all R values, decrease all GB by 5
  setInterval(() => {
    let userRect = user.getBoundingClientRect();
    for (let pixel of pixels) {
      let pixelRect = pixel.element.getBoundingClientRect();
      const hovering = isHovering(userRect, pixelRect);

      if (hovering) {
        pixel.decreaseDurch();
      } else {
        pixel.increaseDurch();
      }
    }
  }, 1000);

  function mouseMove(x, y) {
    x = x - deltaX;
    y = y - deltaY;
    user.style.left = `${x}px`;
    user.style.top = `${y}px`;
  }

  function isHovering(rectA, rectB) {
    // console.log(userRects);
    // Check for overlap
    const overlap = !(
      rectA.right < rectB.left ||
      rectA.left > rectB.right ||
      rectA.bottom < rectB.top ||
      rectA.top > rectB.bottom
    );
    return overlap;
  }
};
