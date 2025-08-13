import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import mailRouter from "./routes/mailRoute.js";
import offerRouter from "./routes/offerRoute.js";


dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// DB Connection
const userDB = await mongoose.connect("mongodb://127.0.0.1:27017/user");
console.log("User DB connected");
const offerDB = await mongoose.createConnection("mongodb://127.0.0.1:27017/offer");
console.log("Offer DB connected");

// Test API
app.get("/", (req, res) => {
  res.send("This is a test text");
});

app.use("/", mailRouter);
app.use("/offer", offerRouter);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
