const fs = require("fs");
const path = require("path");
const databasePath = path.join(__dirname, "../../database.json");

exports.login = (req, res) => {
  const { email, password, rememberMe } = req.body;

  fs.readFile(databasePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .render("login", {
          title: "EduCommand - Student Management System",
          error: "Server error. Try again.",
        });
    }

    const database = JSON.parse(data);
    const admin = Object.values(database.admins).find((a) => a.email === email);

    if (admin && admin.password === password) {
      req.session.user = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        skills: admin.skills,
      };

      if (rememberMe) {
        res.cookie("rememberMe", admin.email, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }

      return res.redirect("/dashboard");
    } else {
      return res
        .status(401)
        .render("login", {
          title: "EduCommand - Student Management System",
          error: "Invalid credentials.",
        });
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("rememberMe");
    res.redirect("/auth/login");
  });
};
