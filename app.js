require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// models and routes import
const postRoute = require("./routes/post.route");
const authRoute = require("./routes/auth.route");
const errorMiddleware = require("./middlewares/error.middleware");

// middlewares
const app = express();
app.use(cors());
app.use(express.json()); // json formatdagi malumotlarni tushuntish uchun ishlatilinadi
app.use(cookieParser({})); // cookielar bilan ishlash uchun kerak
app.use(express.static("static")); // static folderdagi fayllarni public qilib korsatadi
app.use(fileUpload({})); // fayllarni yuklash uchun middleware

// Routes line
app.use("/api/post", postRoute); // "api/post" bilan boshlanuvchi barcha routelarni postRoutega jo'natadi
app.use("/api/auth", authRoute);


app.use(errorMiddleware)
// database connection

const PORT = process.env.PORT || 8080;

const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Connected to database"));
    app.listen(PORT, () =>
      console.log(`Server is running on - http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(`Error connecting to database - ${error}`);
  }
};

bootstrap();
