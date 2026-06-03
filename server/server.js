import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/database.js";
import app from "./src/app.js";


// Connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});