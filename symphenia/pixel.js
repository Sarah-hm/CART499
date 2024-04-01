class Pixel {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.dur = 120;
    this.h = Math.floor(Math.random() * (360 + 1));
    this.s = 60;
    this.l = 60;

    this.mindurch = 10;
    this.maxdurch = 200;
    this.durDelta = 1;

    // create pixel element and append it to grid container
    this.container = document.getElementById("grid-container");
    this.element = document.createElement("div");
    this.element.classList.add("grid-item");
    // Set a unique identifier for each element
    this.container.appendChild(this.element);

    // set its colour
    this.range = this.hues(this.h);
    this.setColor(this.getRandomInteger(this.range.min, this.range.max));
  }

  increaseDurch() {
    // console.log("increase");
    if (this.dur < this.maxdurch) {
      this.dur += this.durDelta;
    }
  }

  decreaseDurch() {
    // console.log("decrease");
    if (this.dur > this.mindurch) {
      this.dur -= this.durDelta;
    }
  }

  setColor(h) {
    this.element.style.background = `hsl(${h}deg, ${this.s}%, ${this.l}%)`;

    // calculate a range with the current hue value
    this.range = this.hues(h);

    // reset a new timeout to recolor
    this.timeout = this.getRandomInteger(500, 1000);

    // update durcheinrecolor piston after timeout
    setTimeout(() => {
      this.setColor(this.getRandomInteger(this.range.min, this.range.max));
    }, this.timeout);
  }

  hues(hue) {
    // calculate minimum from current hue + durch rate
    if (hue - this.dur > this.mindurch) {
      this.min = hue + this.dur;
    } else {
      this.min = this.maxdurch;
    }

    // calculate maximum from current hue + durch rate
    if (hue + this.dur < this.maxdurch) {
      this.max = hue + this.dur;
    } else {
      this.max = this.maxdurch;
    }
    return { min: this.min, max: this.max };
  }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
