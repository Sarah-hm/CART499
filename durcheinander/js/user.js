class User {
  constructor() {
    this.element = document.getElementById("user");
    // this.rect = document.getElementById("user").getElementsByTagName("rect")[0];

    this.deltaX = 75;
    this.deltaY = 150;
  }

  mouseMove(x, y) {
    this.x = x - this.deltaX;
    this.y = y - this.deltaY;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}
