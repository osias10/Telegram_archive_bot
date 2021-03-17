const puppeteer = require('puppeteer');
const moment = require('moment');

async function makeFileName(link){
    if (link.indexOf('://')){

           

        return ((link.substring(link.indexOf('://')+3,(link.length))).replace(/\//g,'_'));
    }
    else (link.replace(/\//g,'_'));
    
}


async function getImg(link,name) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768,
        deviceScaleFactor: 1,
    });
    await page.goto(link);           
    //await page.setContent('https://www.naver.com');
    const imgFileName = await makeFileName(link);
    await page.screenshot({path: `./../files/${imgFileName}-${name}.png`,fullPage: true});
    await browser.close();
    return  `${imgFileName}-${name}.png`;
}

async function getPdf(link,name){
    const pdfFileName = await makeFileName(link);
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link, {
          waitUntil: 'networkidle2',
        });
        
        await page.pdf({ path: `./../files/${pdfFileName}-${name}.pdf`, format: 'a4' });
      
        await browser.close();
        
      })();
      return `${pdfFileName}-${name}.pdf`;
}



module.exports = {
    getImg,
    getPdf
}
