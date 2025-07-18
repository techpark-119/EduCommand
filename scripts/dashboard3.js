window.addEventListener("DOMContentLoaded", () => {
  // Cursor & Particles setup
  const cursor = document.querySelector(".cursor");
  const cursorDot = document.querySelector(".cursor-dot");

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
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    dotX += (mouseX - dotX) * 0.6;
    dotY += (mouseY - dotY) * 0.6;

    cursor.style.transform = `translate3d(${cursorX - 10}px, ${
      cursorY - 10
    }px, 0)`;
    cursorDot.style.transform = `translate3d(${dotX - 2}px, ${dotY - 2}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  function createParticles() {
    const container = document.querySelector(".particles");
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDelay = `${Math.random() * 6}s`;
      p.style.animationDuration = `${3 + Math.random() * 3}s`;
      container.appendChild(p);
    }
  }
  createParticles();

  // Chart.js: Attendance Chart
  const attendanceChart = new Chart(
    document.getElementById("attendanceChart"),
    {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Attendance %",
            data: [89, 92, 94, 90, 93],
            backgroundColor: "rgba(102,126,234,0.2)",
            borderColor: "#667eea",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 100 } },
      },
    }
  );

  // Chart.js: Performance Chart
  const performanceChart = new Chart(
    document.getElementById("performanceChart"),
    {
      type: "doughnut",
      data: {
        labels: ["A+", "A", "B", "C", "Fail"],
        datasets: [
          {
            data: [40, 30, 15, 10, 5],
            backgroundColor: [
              "#34d399",
              "#60a5fa",
              "#fbbf24",
              "#f87171",
              "#a78bfa",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#f7fafc",
              padding: 15,
            },
          },
        },
      },
    }
  );
});
