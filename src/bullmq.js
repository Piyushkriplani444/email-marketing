import { Worker, Queue, tryCatch } from "bullmq";
import { redisConnection } from "./redisConfig.js";
import { google } from "googleapis";
import { createData } from "./useAi.js";
import { oauth2Client } from "./oauthConfig.js";

const myQueue = new Queue("reachindex", { connection: redisConnection });

async function addJobs(id, OauthClient) {
  console.log("oauth token", OauthClient);
  await myQueue.add(id, { OauthClient, id });
  console.log("Added to Queue");
}
const worker = new Worker("reachindex", async (job) => {
  try {
    console.log("Worker running ");
    await getData(job.data.OauthClient, job.data.id);
    console.log("queue complete");
  } catch (error) {}
});

async function markEmailRead(auth, messageId) {
  try {
    const modifyRequestBody = {
      removeLabelIds: ["UNREAD"],
    };

    await gmail.users.messages.modify({
      auth: auth,
      userId: "me",
      id: messageId,
      requestBody: modifyRequestBody,
    });

    console.log(`Email ${messageId} marked as read.`);
  } catch (error) {
    console.error("Error marking email as read:", error);
    throw error;
  }
}

async function getEmail(auth, id) {
  const gmail = google.gmail({ version: "v1", auth });
  const result = await gmail.users.messages.get({
    userId: "me",
    id: id,
  });
  const headers = result.data.payload?.headers;
  const fromHeader = headers?.find((header) => header.name === "From");

  let fromEmail = "";
  if (fromHeader) {
    const fromValue = fromHeader.value;
    const match = fromValue?.match(/^(.*)<(.*)>$/);
    if (match) {
      fromEmail = match[2].trim();
    } else {
      fromEmail = fromValue || "";
    }
  }
  return [result.data, fromEmail];
}
async function getData(oauthClient, id) {
  try {
    oauth2Client.setCredentials(oauthClient);
    cosnt[(message, toEmail)] = await getEmail(oauth2Client, id);
    await markEmailRead(oauth2Client, id);
    console.log("unread email", messages);
    const promt = `Categorizing the email based on the content and assign a label as follows -Interested,Not Interested,More information, on email ${JSON.stringify(
      messages
    )}`;
    let result = await createData(promt);
    console.log(result, " from id : ", id);
    if (result == "Interested") {
      await sendEmail(oauth2Client, toEmail, "hello there", hello.Interested);
    } else if (result == "Not Interested") {
      await sendEmail(
        oauth2Client,
        toEmail,
        "hello there",
        hello["Not Interested"]
      );
    } else {
      await sendEmail(
        oauth2Client,
        toEmail,
        "hello there",
        hello["More information"]
      );
    }
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
}

module.exports = {
  addJobs,
};
