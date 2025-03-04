const axios = require("axios");
const fs = require("fs");
const { exec } = require("child_process");

module.exports.config = {
  name: "tiktok",
  credits: "PRINCE MALHOTRA",
  hasPermission: 0,
  description: "TikTok से वीडियो डाउनलोड करें",
  usages: "[कीवर्ड/लिंक]",
  commandCategory: "media",
  cooldowns: 5
};

module.exports.run = async ({ event, args, api }) => {
  try {
    if (args.length === 0) {
      return api.sendMessage("कृपया कोई कीवर्ड या TikTok वीडियो लिंक दें!", event.threadID, event.messageID);
    }

    let query = args.join(" ");
    let searchURL = `https://prince-sir-all-in-one-api.vercel.app/api/search/tiktoksearch?q=${encodeURIComponent(query)}`;

    let searchResponse = await axios.get(searchURL);
    if (!searchResponse.data.result || searchResponse.data.result.length === 0) {
      return api.sendMessage("कोई वीडियो नहीं मिला!", event.threadID, event.messageID);
    }

    let videoData = searchResponse.data.result[0]; // पहला वीडियो चुनें
    let videoURL = videoData.play; // बिना वॉटरमार्क वाला लिंक
    let videoTitle = videoData.title || "TikTok Video";

    let filePath = `./tiktok_${event.senderID}.mp4`;
    let writer = fs.createWriteStream(filePath);

    let videoStream = await axios({
      url: videoURL,
      method: "GET",
      responseType: "stream"
    });

    videoStream.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage({
        body: `🎥 ${videoTitle}`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
    });

  } catch (error) {
    console.error(error);
    api.sendMessage("⚠️ वीडियो डाउनलोड करने में समस्या हुई!", event.threadID, event.messageID);
  }
};
