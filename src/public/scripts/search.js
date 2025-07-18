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
});