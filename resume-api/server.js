import express from "express";

const GITHUB_URL = "https://api.github.com/repos/cofad/resume/releases/latest";

const app = express();
const port = process.env.PORT || 3000;

app.use(["/latest"], async (req, res) => {
  const pdf = await fetchPdf();
  res.contentType("application/pdf");
  res.send(pdf);
});

app.listen(port, () =>
  console.log(`Cofad resume api listening on port ${port}!`)
);

async function fetchPdf() {
  const pdfDownloadUrl = await fetchGitHubLatestReleaseAssetUrl();
  return await fetchPdfFromGitHub(pdfDownloadUrl);
}

async function fetchGitHubLatestReleaseAssetUrl() {
  const response = await fetch(GITHUB_URL);
  const json = await response.json();
  return json.assets[0].browser_download_url;
}

async function fetchPdfFromGitHub(url) {
  const pdfResponse = await fetch(url);
  const pdfArrayBuffer = await pdfResponse.arrayBuffer();
  return Buffer.from(pdfArrayBuffer);
}
