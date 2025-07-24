const Url = require('../model/urlModel');
const shortid = require('shortid'); // Assuming you are using shortid for generating short codes
// const crypto = require('crypto');

async function urlController(message) {

    const url = message.content.split('create')[1];
    const shortCode = shortid.generate(); 
    // const shortCode = crypto.randomBytes(5).toString('hex');
    // const shortUrl = `http://localhost:3000/${shortCode}`;
    const shortUrl = `http://localhost:${process.env.PORT}/${shortCode}`;
    
    // generate a short code
    console.log(`\nGenerated short code: ${shortCode}\n`);

    if (!url || !url.trim()) {
        await message.reply('❌ Please provide a valid URL to create.');
        return false; // indicate failure
    }

    try {
        const newUrl = new Url({
            url: url.trim(),
            shortCode: shortCode,
            shortUrl: shortUrl,
            username: message.author.username,
            userId: message.author.id,
            createdAt: new Date()
        });

        await newUrl.save();

        return shortUrl; // indicate success
        
    } catch (error) {
        console.error('❌ Error saving URL:', error);
        await message.reply('🚫 There was an error saving your URL.');
        return false; // indicate failure
    }
}

module.exports = { urlController };
