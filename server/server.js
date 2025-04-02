// const express = require("express");
// const app = express();
// app.use(express.json());

// require("dotenv").config();

// const cors = require("cors");

// // CORS options
// const corsOptions = {
//   origin: process.env.CLIENTS_URI,
//   methods: ["GET", "POST", "DELETE", "PUT"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
// app.use(cors(corsOptions));


// //const path = require('path');
// const _dirname = path.resolve();

// app.use(express.static(path.join(_dirname, "/frontend/dist")));
// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// });





// // Import and connect to the database
// const { dbConnect } = require("./config/database");
// dbConnect();

// //routes configuration
// const authRoutes = require("./routes/auth-routes")
// const instructorroutes = require("./routes/instructor-routes")
// const studentroutes =require("./routes/student-routes")
// app.use("/auth", authRoutes);
// app.use("/instructor", instructorroutes);
// app.use("/student", studentroutes);

// // Define routes
// app.get("/", (req, res) => {
//   res.send("Hello ji");
// });
// //http://localhost:3096/auth/register

// // Start the server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`App is running on port ${PORT}`);
// });
const express = require("express");
const path = require("path");  // ✅ Import path
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());

// CORS options
const corsOptions = {
  origin: process.env.CLIENTS_URI || "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Serve frontend
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Database connection
const { dbConnect } = require("./config/database");
dbConnect();

// Routes
const authRoutes = require("./routes/auth-routes");
const instructorRoutes = require("./routes/instructor-routes");
const studentRoutes = require("./routes/student-routes");

app.use("/auth", authRoutes);
app.use("/instructor", instructorRoutes);
app.use("/student", studentRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Hello ji");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
