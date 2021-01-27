const VkBot = require("node-vk-bot-api");
const bot = new VkBot(
    "ключ доступа группы"
);
const fs = require('fs');
//const User = require("./User.js");
const Command = require("./CommandList.js");

let userData = JSON.parse(fs.readFileSync("UsersList.json"));
let command = new Command(userData);

bot.on(async context => {
    let answer = command.Cmd(context, bot);
    if (answer != null) {
        try {
            await context.reply(answer);
        } catch (e) {
            console.error(e);
        }
    }
});

bot.startPolling();
