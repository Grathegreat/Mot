const axios = require('axios');

module.exports = {
    description: "nglspam",
    role: "user",
    credits: "Mot",
    cooldown: 8,
    execute(api, event, args, commands) {
        if (args.length !== 2) {
            api.sendMessage("Please provide username & number of message.", event.threadID);
            return;
        }
        
        const username = args[0];
        const count = args[1];
        
        const sendingSpam = `Sending "${count}" messages. Please wait...`;
        api.sendMessage(sendingSpam, event.threadID);

        const apiUrl = `http://158.101.198.227:8266/?username=${encodeURIComponent(username)}&count=${encodeURIComponent(count)}`;

        axios.get(apiUrl)
            .then(response => {
                const data = response.data.result;
                const { sentCount, notSendCount } = data;

                let message;
                if (sentCount === count) {
                    message = `Successfully sent all ${count} messages.`;
                } else if (sentCount > 0) {
                    message = `Successfully sent ${sentCount} messages. Failed to send ${notSendCount} messages.`;
                } else {
                    message = 'Failed to send any messages.';
                }

                // Add a delay before sending the actual response message
                setTimeout(() => {
                    api.sendMessage(message, event.threadID);
                }, 1000);
            })
            .catch(error => {
                console.error('Error:', error);
                api.sendMessage("Sorry, an error occurred while processing your request.", event.threadID);
            });
    }
};
Chat

New Conversation

🤓 Explain a complex thing

Explain Artificial Intelligence so that I can explain it to my six-year-old child.


🧠 Get suggestions and create new ideas

Please give me the best 10 travel ideas around the world


💭 Translate, summarize, fix grammar and more…

Translate "I love you into" French


GPT-3.5
Hello, how can I help you today?

coin image
10
Upgrade



GPT-3.5
Ask me anything...


Make a Review & Earn Credit ❤
Chat
Ask
Search
Write
Image
ChatPDF
Vision
Full Page
Invite & Earn


