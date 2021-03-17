const puppeteer = require('puppeteer');


async function makeFileName(link){
    if (link.indexOf('://')){

           

        return ((link.substring(link.indexOf('://')+3,(link.length))).replace(/\//g,'_'));
    }
    else (link.replace(/\//g,'_'));
    
}


async function getImg(link,name,nowTime) {
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
    await page.screenshot({path: `./../files/${imgFileName}-${name}${nowTime}.png`,fullPage: true});
    await browser.close();
    return  `${imgFileName}-${name}${nowTime}.png`;
}

async function getPdf(link,name,nowTime){
    const pdfFileName = await makeFileName(link);
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link, {
          waitUntil: 'networkidle2',
        });
        
        await page.pdf({ path: `./../files/${pdfFileName}-${name}${nowTime}.pdf`, format: 'a4' });
      
        await browser.close();
        
      })();
      return `${pdfFileName}-${name}${nowTime}.pdf`;
}



module.exports = {
    getImg,
    getPdf
}
