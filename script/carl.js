module.exports.config = {
    name: 'carl',
    version: '1.0.0',
    role: 0,
    description: "Engage in conversation with an AI bot",
    usage: "carl [prompt]",
    credits: 'Developer',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const input = args.join(" ");

    if (!input) {
        api.sendMessage("Wala akong pera uutang ka nanaman!!", event.threadID, event.messageID);
        return;
    }
    try {  
        const content = encodeURIComponent(input);
        const response = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ph&message=${content}&filter=false`);
        const responseData = response.data;
        if (responseData.error) {
            api.sendMessage("An error occurred. Please try again later.", event.threadID, event.messageID);
        } else {
            api.sendMessage(responseData.success, event.threadID, event.messageID);
        }
    } catch (error) {
        api.sendMessage("An error occurred while fetching the data.", event.threadID, event.messageID);
    }
};
