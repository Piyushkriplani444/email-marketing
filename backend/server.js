// const express = require("express");
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;
import { addJobs } from "./src/bullmq.js";

app.use(cors);

app.use("/");

app.listen(port, () => {
  console.log("Server  is running on port 3000");
});
