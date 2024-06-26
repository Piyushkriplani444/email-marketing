import { google } from "googleapis";

const gmail = google.gmail({ version: "v1" });
export const sendEmail = async (auth, senderEmail, subject, message) => {
  try {
    const from = "me";
    const to = senderEmail;
    const raw = createEmail(from, to, subject, message);

    await gmail.users.messages.send({
      auth: auth,
      userId: "me",
      requestBody: {
        raw: Buffer.from(raw).toString("base64"),
      },
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const createEmail = (from, to, subject, message) => {
  const emailLines = [
    `From: ${from}`,
    `To: ${to}`,
    "Content-Type: text/html; charset=utf-8",
    `Subject: ${subject}`,
    "",
    `${message}`,
  ];

  return emailLines.join("\n");
};

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

export async function listTodaysUnreadEmails(auth) {
  console.log("listtoday");
  const gmail = google.gmail({ version: "v1", auth });
  const todayDate = getTodayDate();
  const res = await gmail.users.messages.list({
    userId: "me",
    q: `is:unread after:${todayDate}`,
  });
  return res.data.messages || [];
}
