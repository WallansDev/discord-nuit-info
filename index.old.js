const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client(
  {
   intents:
   [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
   ]
  }
  );

client.on("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  client.user.setPresence({status: 'dnd', activity: { name: 'YOUTUBE', type: 'PLAYING', url: 'www.youtube.com'}});
});

client.on("messageCreate", message => {
  console.log(message);
  if(message.content.startsWith("+ping")){
    message.reply("pong");
  }
});




client.login(token);