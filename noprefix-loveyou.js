const fs = require("fs");
module.exports.config = {
	name: "loveyouto",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "MrTomXxX", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "tea",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("I love you bot")==0 || event.body.indexOf("bot i love you")==0 || event.body.indexOf("Bot i love you")==0 || event.body.indexOf("i love you bot")==0) {
		var msg = {
				body: "𝑀𝑒 𝐴𝑝𝑘𝑒 𝐿𝑖𝑦𝑒 𝐺𝑎𝑛𝑎 𝐺𝑎 𝐾𝑒 𝐵ℎ𝑒𝑗𝑡𝑖 ℎ𝑢 \n 🤭 \n 🤍🦋",
				attachment: fs.createReadStream(__dirname + `/noprefix/loveyou.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😘", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }
