document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard loaded.");

  const totalEnrolled = 1245;
  const pendingRequests = 78;
  const attendanceAvg = 95;
  const newAdmissions = 32;

  document.getElementById("totalEnrolled").innerText = totalEnrolled;
  document.getElementById("pendingRequests").innerText = pendingRequests;
  document.getElementById("attendanceAvg").innerText = attendanceAvg + "%";
  document.getElementById("newAdmissions").innerText = newAdmissions;

  const ctx = document.getElementById("attendanceChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [{
        label: "Attendance %",
        data: [92, 88, 96, 90, 94],
        borderColor: "#667eea",
        backgroundColor: "rgba(102, 126, 234, 0.2)",
        fill: true,
        tension: 0.4,
      }],
    },
    options: {
      plugins: {
        legend: {
          labels: { color: "#f7fafc" },
        },
      },
      scales: {
        x: { ticks: { color: "#a0aec0" } },
        y: { ticks: { color: "#a0aec0" } },
      },
    },
  });
});