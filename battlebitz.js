require('dotenv').config();

const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.commands = new Collection();

client.login('OTU4MTA0MDI5ODA2ODU4Mjkw.YkId6Q.3rEebMI-nCtQyIXac-_W5gg-uKA');
const prefix = '!';


client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix,'duel') || message.author.bot) return;
    let person1 = message.author.username;
    let user = message.mentions.users.first();

    if (!user) return message.reply('Participant has not been selected, who would you like to duel?'); //checks to see if user selected anoter person to duel.
    if (user.id == message.author.id) return message.reply('Cant duel yourself silly.'); //checks to see if user dueled himself.
    if (user.bot == true) return message.reply('Cant duel the bot'); //checks to see if the retard tried to duel the bot.

    let dueler1 = message.author.id;
    let dueler2 = user.id;

    let challenged = user.toString();

    message.channel.send(`${challenged}, ${author1} has challenged you to a duel, Accept or Decline?`)
        if (message.channel.awaitMessages(response => response.content.toLowerCase() ==='yes' && message.author.id == dueler2 || response.content.toLowerCase() === 'no' && response.author.id == dueler2,))






})

    