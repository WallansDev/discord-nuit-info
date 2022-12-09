const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { SlashCommandBuilder } = require("@discordjs/builders");
const client = new Client({
   intents: 
   [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});


const data = new SlashCommandBuilder()
.setName('backgroundcolor')
.setDescription('Changer le couleur du background du site')


.addStringOption((option) => option.setName('color')
.setDescription('Couleurs disponible')
.setRequired(true)
.addChoices(
  { name: 'red', value: 'red' },
  { name: 'green', value: 'green' },
  { name: 'blue', value: 'blue' },
  { name: 'jaune', value: 'yellow' },
  { name: 'noir', value: 'black' },
  { name: 'blanc', value: 'white' },
  { name: 'violet', value: 'purple' },
  { name: 'gris', value: 'grey' },
  { name: 'rose', value: 'pink' },
  { name: 'marron', value: 'marron' },
  ));

client.on("ready", () => {

    client.application.commands.create(data);
    // client.application.commands.create(cmd2);

  console.log(`Ready! Logged in as ${client.user.tag}`);
  client.user.setActivity("Netflix", { type: "WATCHING", name: "itt" });
});


client.on("interactionCreate", interaction => 
{
  if(interaction.isCommand())
  {
    if(interaction.commandName === "backgroundcolor") 
    {
      // interaction.reply("Changement du background de votre site");
      choix = interaction.reply({ content: `Vous avez choisi ${interaction.options.get('color').value}` });
      console.log(`${interaction.options.get('color').value}`);
      EditbackgroundColor(`${interaction.options.get('color').value}`);
    }
  }
});

function EditbackgroundColor(val)
{
  const fs = require('fs');
  fileList = "./data.json";

  const str = fs.readFile(fileList, function(err, data) {
    if(err) throw err;
    data = data.toString();

    const obj = JSON.parse(data);
    
    // console.log(obj.count);
    // expected output: 42
    console.log(obj.bgColor);
    console.log(`${val}`);
    data = data.replace(obj.bgColor, `${val}`);

    fs.writeFile(fileList, data, function(err) {
        err || console.log('data.json:', data);
    });
});
}

client.login(token);