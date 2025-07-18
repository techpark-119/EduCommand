document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard loaded.");

  // Chart 1: Attendance Trend
  const ctx1 = document.getElementById("attendanceChart").getContext("2d");
  new Chart(ctx1, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Attendance %",
          data: [92, 88, 96, 90, 94],
          borderColor: "#667eea",
          backgroundColor: "rgba(102, 126, 234, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
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

  // Chart 2: Grade Distribution
  const ctx2 = document.getElementById("performanceChart").getContext("2d");
  new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["A", "B", "C", "D", "F"],
      datasets: [
        {
          label: "Students",
          data: [40, 30, 15, 10, 5],
          backgroundColor: [
            "#667eea",
            "#764ba2",
            "#ff6b6b",
            "#ffa726",
            "#e53e3e",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: { color: "#f7fafc" },
        },
      },
    },
  });


  // SEARCH Functionality
  const searchInput = document.getElementById("studentSearch");
  const studentRows = document.querySelectorAll(".student-row");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    studentRows.forEach((row) => {
      const name = row.dataset.name.toLowerCase();
      const roll = row.dataset.roll.toLowerCase();
      if (name.includes(query) || roll.includes(query)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  // SORT (basic name toggle)
  // You can later add <th> click sort logic for each column

  // CLICK → MODAL
  studentRows.forEach((row) => {
    row.addEventListener("click", () => {
      document.getElementById("modalName").innerText = row.dataset.name;
      document.getElementById("modalRoll").innerText = row.dataset.roll;
      document.getElementById("modalGrade").innerText = row.dataset.grade;
      document.getElementById("modalStatus").innerText = row.dataset.status;
      document.getElementById("profileModal").style.display = "block";
    });
  });

  // FAKE NOTIFICATIONS, haha
  const msgBadge = document.getElementById("msgBadge");
  let unreadMsgs = 0;

  setInterval(() => {
    unreadMsgs++;
    msgBadge.innerText = unreadMsgs;
  }, 10000); // Every 10s, new "message"
});

function closeModal() {
  document.getElementById("profileModal").style.display = "none";
}
