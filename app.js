require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/V1/auth", require("./src/routes/auth-routes.js"));
app.use("/api/V1/products", require("./src/routes/productRoutes.js"));
app.use("/api/V1/cart", require("./src/routes/cartRoutes.js"));
app.use("/api/V1/order", require("./src/routes/orderRoutes.js"));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("❌ MongoDB URI is missing. Please check your .env file.");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
})
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api/V1/auth`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
