const express = require("express");
const axios = require("axios");
const { faker } = require("@faker-js/faker");

const app = express();
const port = 4400;

faker.seed(150);

const createFetcher = (req) => {
  const ac = new AbortController();

  req.on("close", () => {
    ac.abort();
  });

  return axios.create({
    signal: ac.signal,
  });
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get("/", async (req, res) => {
  const requestId = faker.name.findName();
  const fetcher = createFetcher(req);
  const sleepTime = randomIntFromInterval(1, 100) < 50 ? 5000 : 1000;

  console.time("duration");
  console.log("Request started, sleepTime:", sleepTime, "-", requestId);

  try {
    await fetcher.get(`https://httpstat.us/200?sleep=${sleepTime}`);

    console.log("Request finished -", requestId);
    res.send(`Request OK - ${requestId}`);
  } catch (e) {
    console.log("Request abort catched -", requestId, e.message);
  }

  console.timeEnd("duration");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
