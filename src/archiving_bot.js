const TelegramBot = require('node-telegram-bot-api');
const fs=require('fs');
const func=require('./archiving_Func');

const {
    TELEGRAM_KEY
} = require('./../key.json');

const bot = new TelegramBot(TELEGRAM_KEY, {polling: true});

bot.on('message', async (msg) =>{
    const chatId = msg.chat.id;
    if (msg.text.startsWith('http')) {
        bot.sendMessage(chatId,`${msg.text} 페이지  생성중`);

        const makeFiles = await func.makeArchive(msg.text,chatId).catch(e=> console.log(e));
        console.log(makeFiles);
        await bot.sendPhoto(msg.chat.id,`./../files/${makeFiles[0]}`);
        await bot.sendDocument(msg.chat.id,`./../files/${makeFiles[1]}`);
        if (makeFiles[0]!=undefined) {func.deleteFile(makeFiles[0])}
        if (makeFiles[1]!=undefined) {func.deleteFile(makeFiles[1])}

    }
    else{
        bot.sendMessage(chatId,`http/https 로 시작하는 주소를 보내주세요`);
    }
   


    //const stream = await fs.createReadStream('./../files/test.mp3');

    //bot.sendAudio(chatId, stream);
    //bot.sendDocument(msg.chat.id,'./my.pdf').catch(e=> console.log(e));
    //bot.sendDocument(msg.chat.id,'./../files/naver.com.pdf', {}, fileOptions);

    

    //bot.sendDocument(msg.chat.id,'https://telegram.org/img/t_logo.png');
})

