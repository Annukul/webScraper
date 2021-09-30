import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import scrapeRoute from './routes/scrapeRoute.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use("/", scrapeRoute);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
