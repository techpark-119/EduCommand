const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  const user = { name: "Sarah" }; // Simulating server-side data
  res.render('index', { user }); // Render 'index.ejs' with user data
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
