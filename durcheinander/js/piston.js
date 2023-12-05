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

    // Start from plain light gray
    this.r = 200;
    this.g = 200;
    this.b = 200;

    // set the min and max for each rgb values
    this.rHues = this.hues(this.r);
    this.gHues = this.hues(this.g);
    this.bHues = this.hues(this.b);

    // set piston color with random RGB between current value +/- durcheinander rate
    this.setColor(
      this.getRandomInteger(this.rHues.min, this.rHues.max),
      this.getRandomInteger(this.gHues.min, this.gHues.max),
      this.getRandomInteger(this.gHues.min, this.gHues.max)
    );
  }

  setColor(r, g, b) {
    // set piston color to rgb value
    this.element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Update durcheinander rate
    if (this.hovering) {
      this.decreaseDurcheinander();
    } else {
      this.increaseDurcheinander();
    }
    // reset the min and max for each rgb values
    this.rHues = this.hues(this.r);
    this.gHues = this.hues(this.g);
    this.bHues = this.hues(this.b);

    // reset a new timeout to recolor
    this.timeout = this.getRandomInteger(500, 1000);

    // update durcheinrecolor piston after timeout
    setTimeout(() => {
      this.setColor(
        this.getRandomInteger(this.rHues.min, this.rHues.max),
        this.getRandomInteger(this.gHues.min, this.gHues.max),
        this.getRandomInteger(this.gHues.min, this.gHues.max)
      );
    }, this.timeout);
  }

  increaseDurcheinander() {
    if (this.durcheinanderRate <= 75) {
      this.durcheinanderRate += this.durcheinanderDelta;
    }
  }

  decreaseDurcheinander() {
    console.log("decreasing durcheinander");
    if (this.durcheinanderRate <= 0) {
      this.durcheinanderRate -= this.durcheinanderDelta;
    }
  }

  // calculates the minimum and maximum hue for a specific RGB value (-/+ Durcheinander rate)
  hues(hue) {
    // calculate minimum from current hue + durch rate
    if (hue - this.durcheinanderRate > 0) {
      this.min = hue - this.durcheinanderRate;
    } else {
      this.min = 0;
    }
    // calculate maximum from current hue + durch rate
    if (hue + this.durcheinanderRate < 255) {
      this.max = hue + this.durcheinanderRate;
    } else {
      this.max = 255;
    }
    return { min: this.min, max: this.max };
  }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toRGBObject(rgbString) {
    const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
    return { red, green, blue };
  }
}
