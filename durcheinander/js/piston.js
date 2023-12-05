class Piston {
  constructor(gridContainer, row, col) {
    this.hovering = false;

    this.container = gridContainer;

    this.row = row;
    this.col = col;

    this.className = "grid-item";

    this.minHue = 200;
    this.maxHue = 250;

    this.gridItem = document.createElement("div");
    this.gridItem.classList.add("grid-item");
    // this.gridItem.classList.add("pressed");

    // Set a unique identifier for each grid item (optional)
    this.gridItem.setAttribute(
      "data-position",
      `${this.row + 1}-${this.col + 1}`
    );

    // Append the grid item to the container
    this.container.appendChild(this.gridItem);

    this.intLength = 500;

    this.setColor(
      this.getRandomInteger(this.minHue, this.maxHue),
      this.getRandomInteger(this.minHue, this.maxHue),
      this.getRandomInteger(this.minHue, this.maxHue)
    );
  }

  setColor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;

    this.gridItem.style.backgroundColor = `rgb(${this.r}, ${this.g}, ${this.b})`;

    if (!this.hovering) {
      this.timeout = this.getRandomInteger(500, 1000);

      setTimeout(() => {
        this.setColor(
          this.getRandomInteger(this.minHue, this.maxHue),
          this.getRandomInteger(this.minHue, this.maxHue),
          this.getRandomInteger(this.minHue, this.maxHue)
        );
      }, this.timeout);
    }
  }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
