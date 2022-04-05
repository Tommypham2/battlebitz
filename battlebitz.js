require('dotenv').config();

const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.commands = new Collection();

const config = require('./config.json');
client.login(config.token);

const prefix = '!';

console.log('running');


client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix,'duel') || message.author.bot) return;
    let person1 = message.author.username;
    let user = message.mentions.users.first();

    /*if (!user) return message.reply('Participant has not been selected, who would you like to duel?'); //checks to see if user selected anoter person to duel.
    if (user.id == message.author.id) return message.reply('Cant duel yourself silly.'); //checks to see if user dueled himself.
    if (user.bot == true) return message.reply('Cant duel the bot'); //checks to see if the retard tried to duel the bot.*/

    let dueler1 = message.author.id;
    //let dueler2 = ;

    let challenged = user;

    let filter = m => m.author.id === message.author.id
    message.channel.send(`${challenged}, ${dueler1} has challenged you to a duel, yes or no?`).then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(message => {
            message = message.first()
            if (message.channel.awaitMessages(response => response.content.toLowerCase() ==='yes'&& response.author.id == dueler2)) {
              message.channel.send('Battle and Bitz duel has begun!');
            } else if (message.channel.awaitMessages (response => response.content.toLowerCase() === 'no'&& response.author.id == dueler2)) {
              message.channel.send(`Pussy Ass Bitch`);
            } else {
              message.channel.send(`Invalid response, select: yes or no.`);
            }
          })
        .catch(collected => {
            message.channel.send('Request Timed Out');
        })
    })



})

    
