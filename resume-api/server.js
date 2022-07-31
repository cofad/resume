import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const GITHUB_URL = "https://api.github.com/repos/cofad/resume/releases/latest";

app.get(["/releases/latest/pdf"], async (req, res) => {
  const response = await fetch(GITHUB_URL);
  const json = await response.json();
  res.send(json.assets[0].browser_download_url);
});

app.listen(port, () =>
  console.log(`Cofad resume api listening on port ${port}!`)
);
