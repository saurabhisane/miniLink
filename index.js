const { Client, Events, GatewayIntentBits } = require('discord.js');
const connectDB = require('./mongoConnect');
const { urlController } = require('./controllers/urlController');
const express = require('express');
const urlRoute = require('./routes/urlRoute');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
// Connect to MongoDB
connectDB();

// Initialize the Discord client with necessary intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


// Initialize Express app
const app = express();
app.use(express.json());

app.use('/', urlRoute);
// Start the Express server

app.listen(process.env.PORT, () => {
    console.log(`Express server is running on port ${process.env.PORT}`);
});


client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on(Events.GuildCreate, (guild) => {
    console.log(`Joined a new guild: ${guild.name} (ID: ${guild.id})`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('create')) {
        const shortUrl = await urlController(message);

        if (shortUrl) {
            message.reply(`${shortUrl} has been created successfully!`);
        }

    } else {
        console.log(`New message in ${message.guild?.name}: ${message.content}`);
        console.log(`${message.author.username} (${message.author.id})`);
        message.reply(
            `Thank you for your message!\nYou can also check out our support server: https://discord.gg/your-support-server`
        );
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.on(Events.GuildDelete, (guild) => {
    console.log(`Left a guild: ${guild.name} (ID: ${guild.id})`);
});




client.login(process.env.DISCORD_BOT_TOKEN); // Replace with your bot token

// Note: Replace the token with your actual bot token.
// Make sure to keep your token secure and do not share it publicly.
// This code listens for when the bot joins or leaves a guild and logs the event to the console.
// Ensure you have the necessary permissions to view guilds and handle events.  
