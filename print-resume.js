import { launch } from "puppeteer";
import fs from "fs";

(async () => {
  const packageJson = JSON.parse(fs.readFileSync("./package.json").toString());

  // Only use this config for trusted code
  const browser = await launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/src/resume.html`);
  await page.pdf({
    path: `resume-${packageJson.version}.pdf`,
    format: "letter",
  });

  await browser.close();
})();
