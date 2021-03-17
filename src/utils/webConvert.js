const puppeteer = require('puppeteer');
async function getImg(link) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 960,
        height: 760,
        deviceScaleFactor: 1,
    });
    await page.goto(link);           
    //await page.setContent('https://www.naver.com');
    await page.screenshot({path: `./files/${link}.png`});
    await browser.close();
    return  0;
}

async function getPdf(link){
    
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link, {
          waitUntil: 'networkidle2',
        });
        await page.pdf({ path: `./${link}.pdf`, format: 'a4' });
      
        await browser.close();
      })();
}

exports = {
    getImg,
    getPdf
}