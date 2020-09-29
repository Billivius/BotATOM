const VkBot = require("node-vk-bot-api");
const bot = new VkBot(
    "efdf2124aaf9b6dafd88d5451b32f34b9daa74297d3364c3920cd573b58b7aee9fea5382855110a40c33f"
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
