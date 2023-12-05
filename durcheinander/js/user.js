class User {
  constructor() {
    this.user = document.getElementById("user");

    this.rect = document.getElementById("user").getElementsByTagName("rect")[0];

    this.deltaX = 150;
    this.deltaY = 250;
  }

  mouseMove(x, y) {
    this.x = x - this.deltaX;
    this.y = y - this.deltaY;

    this.user.style.left = `${this.x} `;
    this.user.style.top = `${this.y}`;
  }
}
