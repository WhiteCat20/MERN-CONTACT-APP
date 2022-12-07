import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ContactRoute from "./Routes/ContactRoute.js";
import UserRoute from "./Routes/UserRoute.js";

const app = express();

//connect to mongodb
mongoose.connect(`mongodb://127.0.0.1:27017/contact-app`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//try and error connect to mongodb
const db = mongoose.connection;
//jika error
db.on("error", (error) => {
  console.log(error);
});
//jika berhasil
db.once("open", () => {
  console.log("Database Connected, ready to go!");
});

//penggunaan cors
app.use(cors());
//menerima data menggunakan json
app.use(express.json());

//setting up middleware from routes
app.use("/api", ContactRoute);
app.use("/api/user", UserRoute);

//running the server
app.listen(process.env.PORT, () => {
  console.log("server is running");
});
