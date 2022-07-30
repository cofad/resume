import { launch } from 'puppeteer';

(async () => {
  // Only use this config for trusted code
  const browser = await launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/src/resume.html`);
  await page.pdf({path: 'resume.pdf', format: 'letter'});

  await browser.close();
})();