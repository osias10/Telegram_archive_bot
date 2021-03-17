const TelegramBot = require('node-telegram-bot-api');
const {
    TELEGRAM_KEY
} = require('./../key.json');

const bot = new TelegramBot(TELEGRAM_KEY, {polling: true});

bot.on('message',(msg) =>{
    const chatId = msg.chat.id;
    console.log(msg);
    bot.sendMessage(chatId,`${msg.text}  메시지받음`);
})

