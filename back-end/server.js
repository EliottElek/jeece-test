require("dotenv").config();
const cors = require('cors')
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
//routes
app.use("/products", productRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
