document.addEventListener("DOMContentLoaded", () => {
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




  function showModal(student) {
    const modal = document.createElement("div");
    modal.className = "auth-container";
    modal.style.cssText = `
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      padding: 30px;
      width: 90%;
      max-width: 400px;
      background: rgba(10,10,10,0.95);
      border-radius: 20px;
      color: white;
    `;

    modal.innerHTML = `
      <h2>${student.name}</h2>
      <p><strong>Roll No:</strong> ${student.roll}</p>
      <p><strong>Program:</strong> ${student.program}</p>
      <p><strong>Status:</strong> ${student.status}</p>
      <button onclick="this.parentElement.remove()" class="access-btn" style="margin-top: 20px;">Close</button>
    `;

    document.body.appendChild(modal);
  }

  document.querySelectorAll(".student-row").forEach((row) => {
    row.querySelector(".access-btn").addEventListener("click", () => {
      const student = {
        name: row.cells[1].innerText,
        roll: row.cells[2].innerText,
        program: row.cells[3].innerText,
        status: row.cells[4].innerText,
      };
      showModal(student);
    });
  });
});

function sortTable(columnIndex) {
  const tbody = document.getElementById("studentTable");
  const rows = Array.from(tbody.rows);

  const sorted = rows.sort((a, b) => {
    const textA = a.cells[columnIndex].innerText.toLowerCase();
    const textB = b.cells[columnIndex].innerText.toLowerCase();
    return textA.localeCompare(textB);
  });

  // Clear and re-append sorted rows
  tbody.innerHTML = "";
  sorted.forEach((row) => tbody.appendChild(row));
}
  