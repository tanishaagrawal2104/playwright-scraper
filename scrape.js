const { chromium } = require('playwright');

(async () => {
  try {
    const seeds = Array.from({ length: 10 }, (_, i) => 24 + i);
    let total = 0;

    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const seed of seeds) {
      const url = `https://randomds.miit.co.in/qa/seed/${seed}`;
      console.log(`Visiting: ${url}`);
      await page.goto(url);

      const numbers = await page.$$eval('table td', tds =>
        tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
      );

      const sum = numbers.reduce((acc, val) => acc + val, 0);
      console.log(`Seed ${seed}: ${sum}`);
      total += sum;
    }

    console.log("Email: 23f3001897@ds.study.iitm.ac.in");
    console.log("TOTAL SUM:", total);
    await browser.close();
  } catch (err) {
    console.error("Error occurred:", err);
    process.exit(1);
  }
})();

