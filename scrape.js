const { chromium } = require('playwright');

(async () => {
    const seeds = Array.from({ length: 10 }, (_, i) => 24 + i);
    let totalSum = 0;

    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const seed of seeds) {
        const url = `https://23f3001897.ds.study.iitm.ac.in/qa/seed${seed}.html`;
        await page.goto(url);
        const tableData = await page.$$eval("table td", tds =>
            tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
        );
        const pageSum = tableData.reduce((a, b) => a + b, 0);
        totalSum += pageSum;
    }

    console.log("TOTAL SUM:", totalSum);
    await browser.close();
})();
