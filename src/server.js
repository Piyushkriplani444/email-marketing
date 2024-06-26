import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import { listTodaysUnreadEmails } from "./email.js";
import { add } from "./bullmq.js";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
dotenv.config();

const app = express();
export let narr = [];

app.use(express.json());
app.use(
  session({ secret: "your_secret", resave: false, saveUninitialized: true })
);

const scopes = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.modify",
  "profile",
  "email",
];
app.get("/auth/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(authUrl);
});

app.get("/auth/google/callback", async (req, res) => {
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  req.session.tokens = tokens;

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });
  const userInfo = await oauth2.userinfo.get();
  console.log("User profile:", userInfo.data);

  res.redirect("/check-emails");
});

app.get("/check-emails", async (req, res) => {
  if (!req.session.tokens) {
    return res.redirect("/auth/google");
  }

  oauth2Client.setCredentials(req.session.tokens);

  try {
    const messages = await listTodaysUnreadEmails(oauth2Client);
    console.log("Today's unread emails: ", messages);
    await add(messages, req.session.tokens);
    narr.push(req.session.tokens);
    res.json({ messages });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).send("Error fetching emails.");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
