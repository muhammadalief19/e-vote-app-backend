import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import DataUserRoute from "./routes/DataUserRoute.js";
import CandidateRoute from "./routes/CandidateRoutes.js";
import SuksesiRoute from "./routes/SuksesiRoutes.js";
import VotingRoute from "./routes/VotingRoutes.js";
import AuthRoute from "./routes/AuthRoutes.js";
import ValidateRoute from "./routes/ValidateRoutes.js";
import db from "./config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// dotenv configuration
dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Database connection is success");
  // (async () => {
  //   await db.sync();
  // })();
  // store.sync();
} catch (error) {
  console.log(error);
}

// static
app.use("/static", express.static("public"));

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// route
app.get("/", (req, res) => {
  res.send("HALO");
});

app.use("/api/users", UserRoute);
app.use("/api/data-users", DataUserRoute);
app.use("/api/candidate", CandidateRoute);
app.use("/api/suksesi", SuksesiRoute);
app.use("/api/voting", VotingRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/validate", ValidateRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Aplikasi berjalan pada port ${process.env.APP_PORT}`);
});
