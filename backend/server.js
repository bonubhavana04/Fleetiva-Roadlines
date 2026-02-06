require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");

const errorHandler = require("./middleware/errorHandler");
const { connectMongo } = require("./config/db");

require("./config/clients");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

if (process.env.SKIP_FIREBASE === "true") {
} else if (
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_PRIVATE_KEY &&
  process.env.FIREBASE_CLIENT_EMAIL
) {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
    }
  } catch (err) {
    // Firebase initialization failed
  }
}

connectMongo().catch((err) => {
  process.exit(1);
});

app.get("/", (req, res) => {
  res.json({ status: "Fleetiva backend running" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/logistics", require("./routes/logistics"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
