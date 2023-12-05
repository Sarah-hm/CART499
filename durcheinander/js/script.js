window.onload = () => {
  // window loaded
  const gridContainer = document.getElementById("grid-container");

  const col_num = getComputedStyle(document.documentElement).getPropertyValue(
    "--col-num"
  );
  const row_num = getComputedStyle(document.documentElement).getPropertyValue(
    "--row-num"
  );

  let pistons = [];

  let user = new User();

  // let userEls = document.getElementById("user").getElementsByTagName("rect")[0];

  //   for each rows
  for (let row = 0; row < row_num; row++) {
    // for each columns
    for (let col = 0; col < col_num; col++) {
      let currentPiston = new Piston(gridContainer, row, col);
      pistons.push(currentPiston);
    }
  }

  document.addEventListener("mousemove", (e) => {
    user.mouseMove(e.clientX, e.clientY);

    // let userElsRects = [];
    // for (let element of user.elements) {
    //   let currentRect = element.getBoundingClientRect();
    //   userElsRects.push(currentRect);
    // }

    for (let piston of pistons) {
      //   console.log(piston);
      let pistonRect = piston.gridItem.getBoundingClientRect();
      const hovering = isHovering(user.rect, pistonRect);

      if (hovering) {
        piston.hovering = true;
        piston.gridItem.classList.add("pressed");

        let rgbValues = toRGBObject(piston.gridItem.style.backgroundColor);
        // console.log(rgbValues.red);

        const colorDelta = 5;

        let min = rgbValues.red - colorDelta;
        let max = rgbValues.red + colorDelta;
        let red = piston.getRandomInteger(min, max);

        min = rgbValues.green - colorDelta;
        max = rgbValues.green + colorDelta;
        let green = piston.getRandomInteger(min, max);

        min = rgbValues.blue - colorDelta;
        max = rgbValues.blue + colorDelta;
        let blue = piston.getRandomInteger(min, max);

        piston.setColor(red, green, blue);
        // console.log(red);
      } else {
        piston.gridItem.classList.remove("pressed");
        piston.hovering = false;
        // piston.setColor(
        //   piston.getRandomInteger(this.minHue, this.maxHue),
        //   piston.getRandomInteger(this.minHue, this.maxHue),
        //   piston.getRandomInteger(this.minHue, this.maxHue)
        // );
      }
    }
  });

  function isHovering(userRects, pistonRect) {
    // console.log(userRects);
    console.log(userRects[0]);
    // Check for overlap
    const overlap = !(
      userRects[0].right < pistonRect.left ||
      userRects[0].left > pistonRect.right ||
      userRects[0].bottom < pistonRect.top ||
      userRects[0].top > pistonRect.bottom
    );
    return overlap;
  }

  const toRGBObject = (rgbStr) => {
    const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
    return { red, green, blue };
  };
};
