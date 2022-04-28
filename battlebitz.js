require('dotenv').config();

const { Client, Collection, Intents, CommandInteractionOptionResolver, Message, DiscordAPIError } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Discord token
const config = require('./config.json');
client.login(config.token);

//commands folder
client.commands = new Collection();
const fs = require("fs");
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}



//sets command prefix
const prefix ='!';



//Ready function to show bot is running.
client.on('ready', () => {
  console.log(`${client.user.username}`);
})


let coins = require('./coins.json');
client.on('messageCreate', message =>{
    if(message.content === `${prefix}name`){
        message.channel.send(`Username: ${message.author.username}`);
        message.channel.send(`Id: ${message.author.id}`);
    }

    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinAmt = Math.floor(Math.random() * 1) + 1;
    let baseAmt = Math.floor(Math.random() * 1) + 1;
    console.log(`${coinAmt} ; ${baseAmt}`);


    if(coinAmt === baseAmt){
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
        fs.writeFile('./coins.json', JSON.stringify(coins),(err) => {
            if(err) console.log(err)
        })
    }
})












//main
/*client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot);

    const args = message.content.slice(prefix.length).split(/ +/); //registers mutiple spaced inputs
    const command = args.shift().toLowerCase(); //shifts input into lowercase

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args); //ping command for funzies
    }
    let rollz = Math.floor(Math.random() * 10) + 1;
    if(command === 'roll'){
        message.channel.send(String(rollz));
    }

    if(message.content ==='name'){
        message.channel.send(`Username: ${message.author.username}`)
        message.channel.send(`Id: ${message.author.id}`)
    } 
    
});

/*const filter = m =>m.author.id === message.author.id;
    message.reply("Please selected player to duel! You have 10 seconds.").then(r =>r.delete(10000));
    message.channel.awaitMessages(filter,{
        max:1, 
        time: 10000
    }).then(collected => {
            if(collected.first().content==="cancel"){
                return message.reply("Request Canceled!");
            }
    let username = collected.first().content;
    }).catch(err => {
        console.log(err)
    })*/
