require('dotenv').config();

const { Client, Collection, Intents, CommandInteractionOptionResolver, Message, DiscordAPIError } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Discord token
const config = require('./config.json');
client.login(config.token);

//commands folder
client.commands = new Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}



//sets command prefix
const prefix = '!';



//Ready function to show bot is running.
client.on('ready', () => {
  console.log(`${client.user.username}`);
})


//main
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/); //registers mutiple spaced inputs
    const command = args.shift().toLowerCase(); //shifts input into lowercase

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args); //ping command for funzies
    }

   
    
});
