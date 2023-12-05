class Piston {
  constructor(gridContainer, row, col) {
    this.colorAvg = 225;

    // original delta rate with which to randomize color (with starting color average)
    this.durcheinanderRate = 25;

    // rate at which durcheinander changes every time to color gets randomized
    this.durcheinanderDelta = 1;

    this.hovering = false;

    this.container = gridContainer;

    this.row = row;
    this.col = col;

    // Create element
    this.element = document.createElement("div");
    this.element.classList.add("grid-item");

    // Set a unique identifier for each element
    this.element.setAttribute(
      "data-position",
      `${this.row + 1}-${this.col + 1}`
    );

    // Append the grid item to the container
    this.container.appendChild(this.element);

    this.r = 125;
    this.g = 125;
    this.b = 125;

    this.rHues = this.hues(this.r);
    this.gHues = this.hues(this.g);
    this.bHues = this.hues(this.b);

    this.setColor(
      this.getRandomInteger(this.rHues.min, this.rHues.max),
      this.getRandomInteger(this.gHues.min, this.gHues.max),
      this.getRandomInteger(this.gHues.min, this.gHues.max)
    );
  }

  setColor(r, g, b) {
    console.log(r, g, b);
    this.element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    this.timeout = this.getRandomInteger(500, 1000);

    setTimeout(() => {
      if (this.hovering) {
        this.decreaseDurcheinander();
      } else {
        this.increaseDurcheinander();
      }
      this.setColor(
        this.getRandomInteger(this.rHues.min, this.rHues.max),
        this.getRandomInteger(this.gHues.min, this.gHues.max),
        this.getRandomInteger(this.gHues.min, this.gHues.max)
      );
    }, this.timeout);
  }

  increaseDurcheinander() {
    // console.log("increasing durcheinander");
    if (this.durcheinanderRate <= 75) {
      this.durcheinanderRate += this.durcheinanderDelta;
    }
    // this.recalculateColorAvg("increase");
  }

  decreaseDurcheinander() {
    // console.log("decreasing durcheinander");
    if (this.durcheinanderRate <= 0) {
      this.durcheinanderRate -= this.durcheinanderDelta;
    }
    // this.recalculateColorAvg("decrease");
  }

  // recalculateColorAvg(delta) {
  //   switch (delta) {
  //     case "increase":
  //       this.colorAvg += this.durcheinanderRate;
  //       break;
  //     case "decrease":
  //       this.colorAvg -= this.durcheinanderRate;
  //       break;
  //     default:
  //       console.log("something gone wrong recalculating color avgs");
  //   }
  // }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Possible hues to a specific piston's durcheinander rate
  hues(hue) {
    // console.log(hue);
    // reduce minimum
    if (hue > 0) {
      // console.log("hello");
      this.min = hue - this.durcheinanderRate;
      // console.log(hue - this.durcheinanderRate);
    } else {
      this.min = 0;
    }
    if (hue < 225) {
      this.max = hue + this.durcheinanderRate;
    } else {
      this.max = 200;
    }
    // console.log(this.min);

    return { min: this.min, max: this.max };
  }

  toRGBObject(rgbString) {
    const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
    return { red, green, blue };
  }
}
