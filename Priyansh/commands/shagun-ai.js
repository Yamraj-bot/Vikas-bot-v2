const axios = require("axios");

const config = {
  name: "shagun",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Arun ツ",
  description: "[ 𝗦𝗵𝗮𝗴𝘂𝗻 𝗔𝙞 ]",
  commandCategory: "no prefix",
  usages: "𝘼𝙨𝙠 𝘼 𝙌𝙪𝙚𝙨𝙩𝙞𝙤𝙣 𝙁𝙧𝙤𝙢 𝗦𝗵𝗮𝗴𝘂𝗻 𝘼𝙄",
  cooldowns: 0
};

const handleEvent = async function ({ api, event, client, __GLOBAL }) {

  if (event.body.indexOf("Alexa") === 0 || event.body.indexOf("shagun") === 0 || event.body.indexOf("Janam") === 0 || event.body.indexOf("Shagun") === 0) {
    const { threadID, messageID } = event;
    const input = event.body;
    const message = input.split(" ");

    if (message.length < 2) {
      api.sendMessage("✨ 𝗛𝗲𝗹𝗹𝗼 𝗶 𝗮𝗺 𝗦𝗵𝗮𝗴𝘂𝗻🦋, 𝙏𝙮𝙥 ➤ 𝙎𝙝𝙖𝙜𝙪𝙣 𝙖𝙣𝙙 𝙖𝙨𝙠 𝙮𝙤𝙪𝙧 𝙦𝙪𝙚𝙩𝙞𝙤𝙣'𝙨", threadID);
    } else {
      try {
        api.sendMessage("🔎...", threadID);

        const text = message.slice(1).join(" "); // Join the remaining parts of the message
        const encodedText = encodeURIComponent(text);

        const ris = await axios.get(`https://api.dreaded.site/api/chatgpt?text=${encodedText}`);
        const resultai = ris.data.result.prompt;

        api.sendMessage(`${resultai}\n\n\n༺═─────────═༻\n\n༺═─────────═༻`, threadID);
      } catch (err) {
        console.error(err);
        api.sendMessage("❌ 𝑁𝑜 𝑟𝑒𝑠𝑝𝑜𝑛𝑠𝑒 𝑟𝑒𝑐𝑒𝑖𝑣𝑒𝑑 𝑓𝑟𝑜𝑚 𝑡ℎ𝑒➤𝑠𝑒𝑟𝑣𝑒𝑟 : " + err + "🥺", threadID);
      }
    }
  }
};

const run = function ({ api, event, client, __GLOBAL }) {
  // The run function is currently empty. You may add functionality here if needed.
};

module.exports = { config, handleEvent, run };
