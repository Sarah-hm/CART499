window.onload = (event) => {
  const paths = document.getElementsByTagName("path");

  //   document.getElementsByTagNameNS

  Object.keys(paths).forEach((i) => {
    paths[i].addEventListener("click", (e) => {
      console.log(e.clientX, e.clientY);

      // Create span element
      let ripple = document.createElement("span");

      // Add ripple class to span
      ripple.classList.add("ripple");

      // Add span to the button
      document.body.appendChild(ripple);

      // Get position of X
      let x = e.clientX;

      // Get position of Y
      let y = e.clientY;

      // Position the span element
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Remove span after 0.3s
      setTimeout(() => {
        ripple.remove();
      }, 300);
    });
  });
};
