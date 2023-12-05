class Piston {
  constructor(gridContainer, row, col) {
    this.colorAvg = 225;

    // original delta rate with which to randomize color (with starting color average)
    this.durcheinanderRate = 25;

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

    this.setColor(
      this.getRandomInteger(this.hues().min, this.hues().max),
      this.getRandomInteger(this.hues().min, this.hues().max),
      this.getRandomInteger(this.hues().min, this.hues().max)
    );
  }

  setColor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;

    this.element.style.backgroundColor = `rgb(${this.r}, ${this.g}, ${this.b})`;

    this.timeout = this.getRandomInteger(500, 1000);

    setTimeout(() => {
      this.setColor(
        this.getRandomInteger(this.hues().min, this.hues().max),
        this.getRandomInteger(this.hues().min, this.hues().max),
        this.getRandomInteger(this.hues().min, this.hues().max)
      );
    }, this.timeout);
  }

  increaseDurcheinander() {
    console.log("increasing durcheinander");
  }

  decreaseDurcheinander() {
    console.log("decreasing durcheinander");
  }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Possible hues to a specific piston's durcheinander rate
  hues() {
    this.min = this.colorAvg - this.durcheinanderRate;
    this.max = this.colorAvg + this.durcheinanderRate;

    return { min: this.min, max: this.max };
  }
}
