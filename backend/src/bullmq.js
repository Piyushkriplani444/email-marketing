import { Worker, Queue } from "bullmq";
// import { redisConnection } from "./redisConfig.js";

import { redisConnection } from "./redisConfig.js";
// redisConnection

const myQueue = new Queue("createMail", { connection: redisConnection });
// const myQueue = new Queue("",)

// const myQueue = new Queue("foo");

async function addJobs() {
  await myQueue.add("myJobName", { foo: "bar" }, { delay: 3000 });
  await myQueue.add("myJobName", { qux: "baz" });
}

// await addJobs

const worker = new Worker(
  "foo",
  async (job) => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    console.log(job.data);
  },
  { connection: redisConnection }
);

module.exports = {
  addJobs,
};
