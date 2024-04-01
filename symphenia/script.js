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
      let pixel = new Pixel(gridContainer, row, col);
      pixels.push(pixel);
    }
  }

  document.addEventListener("mousemove", (e) => {
    mouseMove(e.clientX, e.clientY);

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

    console.log(pixels[0].h);
  });

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
