const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://api.openai.com/v1/chat/completions",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + apiKey,
  },
};

function askGPT(q) {
  let data = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: q,
      },
    ],
  });
  config.data = data;
  return axios.request(config);
}

module.exports = askGPT;
