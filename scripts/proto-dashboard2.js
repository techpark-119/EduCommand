// Copy the entire cursor + hover + particle logic from auth.js
// Remove form-related logic (login, validation, etc.)

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

window.addEventListener("mousemove", (e) => {
  const { clientX: x, clientY: y } = e;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  cursorDot.style.transform = `translate(${x}px, ${y}px)`;
});

const hoverables = "a, button, .action-btn";
document.addEventListener("mouseover", (e) => {
  if (e.target.closest(hoverables)) toggleHover(true);
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest(hoverables)) toggleHover(false);
});
function toggleHover(on) {
  cursor.classList.toggle("hover", on);
  cursorDot.classList.toggle("hover", on);
}

let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;
let dotX = 0,
  dotY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function animateCursor() {
  const ease = 0.15;
  const dotEase = 0.6;
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;
  dotX += (mouseX - dotX) * dotEase;
  dotY += (mouseY - dotY) * dotEase;
  cursor.style.transform = `translate3d(${cursorX - 10}px, ${
    cursorY - 10
  }px, 0)`;
  cursorDot.style.transform = `translate3d(${dotX - 2}px, ${dotY - 2}px, 0)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  if (!particlesContainer) return;
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}
createParticles();
