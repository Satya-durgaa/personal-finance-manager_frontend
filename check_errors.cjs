const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

        console.log('Navigating to http://localhost:5173...');
        await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(async (e) => {
            console.log('Error navigating to 5173:', e.message);
        });

        console.log('Page loaded. Waiting a bit to see if any errors pop up...');
        await page.waitForTimeout(3000);

        const content = await page.content();
        console.log('HTML length:', content.length);
        if (content.length < 500) {
            console.log('HTML Content:', content);
        }

        await browser.close();
    } catch (e) {
        console.error('Puppeteer error:', e);
    }
})();
