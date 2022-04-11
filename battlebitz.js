require('dotenv').config();

const { Client, Collection, Intents, CommandInteractionOptionResolver, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.commands = new Collection();

const config = require('./config.json');
client.login(config.token);

const prefix = '!';

//Ready function to show bot is running.
client.on('ready', () => {
  console.log(`${client.user.username}`);
})



client.on('messageCreate', message => {
  let dueler = message.author.id;
  let user = message.mentions.users.first();
  let challenged = user.toString();
  const filter = m => m.author.id ===  message.author.id;

  if ((message.content.startsWith (prefix + 'duel' ))){
        message.channel.send(`${challenged}, ${dueler} has challenged you to a duel. Do you accept the challenge, yes or no?`)
        .then(() => {
            message.channel.awaitMessages( response => response.content == 'yes' || response.content == 'no', {
                max: 1,
                time: 60000,
                errors: ['time'],
            })
            .then((collected) => {
                if (collected.first().content == 'yes') {
                    message.channel.send(`${challenged} has accepted the duel!`);
                }
                else if(collected.first().content == 'no') {
                    message.channel.send(`You must not get any bitches, sorry.`);
                }
            })
            .catch(() => {
                message.channel.send(`Duel request timed out`);
            });
        }); 
    }
    })