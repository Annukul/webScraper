import puppeteer from 'puppeteer';

export const scrape = async (req, res) => {
    try {
        const URL = req.body.url;
        const browser = await puppeteer.launch();
        const page = await browser.nextPage();

        await page.goto(URL);
        const data = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll('.post-container');
            items.forEach((item) => {
                results.push({
                   title: item.querySelector('.post-title').innerText,
                   author: item.querySelector('.post-author').innerText,
                   post: item.querySelector('.post-content').innerText
                });
            });
            res.status(200).json(results);
        });

        await browser.close();
    } catch (error) {
        res.status(500).json(error.message);
    }
}
