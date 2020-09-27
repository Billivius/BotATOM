const VkBot = require("node-vk-bot-api");
const bot = new VkBot(
    "2da2aea977d6aea7594df1a7667b6b9d77b9fb1545bc3ba3f9a3cc50d83b09bd51228c129cc26b33cb7f1"
);
const fs = require('fs');
//const User = require("./User.js");
const Command = require("./CommandList.js");

let userData = JSON.parse(fs.readFileSync("UsersList.json"));
let command = new Command(userData);

bot.on(async context => {
    let answer = command.Cmd(context);
    if (answer != null) {
        try {
            await context.reply(answer);
        } catch (e) {
            console.error(e);
        }
    }
});

bot.startPolling();
