// Import Dependencies
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`);
});

app.get("/", async (req, res) => {
  const { url } = req.body
  const split = url.split("/")
  const screen_name = `screen_name=${split.length - 1}`

  const response = await fetch(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?${screen_name}&count=2&trim_user=true&exclude_replies=false&include_rts=false`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`
      },
    }
  )
  .then(res => res.json())
  .then(json => res.send(json));
});
