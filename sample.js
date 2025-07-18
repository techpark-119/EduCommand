const btn = document.getElementById("colorBtn");
const header = document.getElementById("main-title");
const message = document.getElementById("message");
const colors = ["#ff6f61", "#6a89cc", "#38ada9", "#f6b93b", "#b71540", "#ff9f43"];
let idx = 0;
btn.addEventListener("click", () => {
  idx = (idx + 1) % colors.length;
  header.style.color = colors[idx];
  message.textContent = `Header color changed to ${colors[idx]}`;
});
