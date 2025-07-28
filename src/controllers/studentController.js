const fs = require("fs");
const path = require("path");
const databasePath = path.join(__dirname, "../../database.json");

function normalizeStudent(student, index) {
  return {
    id: student.id || `user${index + 1}`,
    name: student.name || "",
    roll: student.roll || student.id || "",
    program: student.program || "N/A",
    status: student.status || "Active",
    email: student.email || "",
    skills: student.skills || student.Skills || [],
  };
}

exports.getAllStudents = (req, res) => {
  fs.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const database = JSON.parse(data);
    const students = Object.values(database.students).map(normalizeStudent);
    res.render("students", { students });
  });
};

exports.createStudent = (req, res) => {
  const newId = `user${Date.now()}`;
  const newStudent = {
    id: newId,
    name: req.body.name,
    roll: req.body.roll || newId,
    program: req.body.program || "N/A",
    status: req.body.status || "Active",
    email: req.body.email,
    skills: req.body.skills
      ? req.body.skills.split(",").map((skill) => skill.trim())
      : [],
  };

  fs.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const database = JSON.parse(data);
    database.students[newId] = newStudent;

    fs.writeFile(databasePath, JSON.stringify(database, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving student" });
      }
      res.redirect("/students");
    });
  });
};

exports.updateStudent = (req, res) => {
  const studentId = req.params.id;

  fs.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const database = JSON.parse(data);
    const student = database.students[studentId];

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.name = req.body.name || student.name;
    student.roll = req.body.roll || student.roll;
    student.program = req.body.program || student.program;
    student.status = req.body.status || student.status;
    student.email = req.body.email || student.email;
    student.skills = req.body.skills
      ? req.body.skills.split(",").map((skill) => skill.trim())
      : student.skills;

    fs.writeFile(databasePath, JSON.stringify(database, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating student" });
      }
      res.redirect("/students");
    });
  });
};

exports.deleteStudent = (req, res) => {
  const studentId = req.params.id;

  fs.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const database = JSON.parse(data);

    if (!database.students[studentId]) {
      return res.status(404).json({ message: "Student not found" });
    }

    delete database.students[studentId];

    fs.writeFile(databasePath, JSON.stringify(database, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting student" });
      }
      res.redirect("/students");
    });
  });
};

exports.searchStudents = (req, res) => {
  const query = (req.query.q || "").toLowerCase();

  fs.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading database" });
    }
    const database = JSON.parse(data);
    const students = Object.values(database.students)
      .filter(
        (student) =>
          (student.name && student.name.toLowerCase().includes(query)) ||
          (student.roll && student.roll.toLowerCase().includes(query)) ||
          (student.email && student.email.toLowerCase().includes(query))
      )
      .map(normalizeStudent);
    res.render("students", { students });
  });
};
