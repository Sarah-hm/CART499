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

  // run through every frame, regardless of mouse movement
  //(so durcheinander can decrease even on contemplation)

  document.addEventListener("mousemove", (e) => {
    user.mouseMove(e.clientX, e.clientY);

    let userRect = user.element.getBoundingClientRect();
    for (let piston of pistons) {
      let pistonRect = piston.element.getBoundingClientRect();
      const hovering = isHovering(userRect, pistonRect);

      if (hovering) {
        piston.hovering = true;
        piston.element.classList.add("pressed");
        // average out the color of all hovered pistons
        //by taking RGB values, reducing the 2 smaller and increasing the higher
        // console.log(piston.colorAvg);
      } else {
        piston.hovering = false;
        piston.element.classList.remove("pressed");
      }
    }
  });

  // Every second, take a screenshot of the pistons that are pressed and take their RGB values and average them together, eg: red is predominant, add 5 to all R values, decrease all GB by 5
  setInterval(() => {
    let pressedReds = [];
    let pressedGreens = [];
    let pressedBlues = [];

    for (let piston of pistons) {
      if (piston.element.classList.contains("pressed")) {
        let color = toRGBObject(piston.element.style.backgroundColor);

        pressedReds.push(color.red);
        pressedGreens.push(color.green);
        pressedBlues.push(color.blue);
      }
    }

    // calculate sum of all individual three values
    let sumRed = 0;
    for (let i = 0; i < pressedReds.length; i++) {
      sumRed += pressedReds[i];
    }
    let sumGreen = 0;
    for (let i = 0; i < pressedReds.length; i++) {
      sumGreen += pressedGreens[i];
    }
    let sumBlue = 0;
    for (let i = 0; i < pressedReds.length; i++) {
      sumBlue += pressedBlues[i];
    }

    // Switch between which RGB value has global highest average
    let highestHue = Math.max(sumRed, sumGreen, sumBlue);

    // Get the piston objects that are pressed only
    for (let piston of pistons) {
      if (piston.element.classList.contains("pressed")) {
        // reinforce the highest hue for every piston's color
        switch (highestHue) {
          case sumRed:
            piston.r += 5;
            piston.g -= 5;
            piston.b -= 5;
            break;
          case sumGreen:
            piston.g += 5;
            piston.r -= 5;
            piston.b -= 5;
            break;
          case sumBlue:
            piston.b += 5;
            piston.r -= 5;
            piston.g -= 5;
            break;
          default:
            console.log("error with highest hue switch");
        }
      } else {
        // if not pressed, make the rgb values < and > 200 slowly oscillate around 200
        if (piston.r >= 200) {
          piston.r -= 2;
        } else if (piston.r < 200) {
          piston.r += 2;
        }
        if (piston.g >= 200) {
          piston.g -= 2;
        } else if (piston.g < 200) {
          piston.g += 2;
        }
        if (piston.b >= 200) {
          piston.b -= 2;
        } else if (piston.b < 200) {
          piston.b += 2;
        }
      }
    }
  }, 1000);

  // function reinfornceHue(hue) {
  //   for (let piston of pistons) {
  //     if (piston.element.classList.contains("pressed")) {
  //       switch(hue){
  //         case "red":
  //         break;
  //         case "green":
  //         break;
  //         case "blue":
  //         break;
  //         default:
  //         console.log("error with the highest hue reinforcement")
  //       }
  //     }
  //   }
  // }

  function isHovering(user, pistonRect) {
    // console.log(userRects);
    // Check for overlap
    const overlap = !(
      user.right < pistonRect.left ||
      user.left > pistonRect.right ||
      user.bottom < pistonRect.top ||
      user.top > pistonRect.bottom
    );
    return overlap;
  }

  const toRGBObject = (rgbStr) => {
    const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
    return { red, green, blue };
  };
};
