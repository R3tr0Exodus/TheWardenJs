import { config } from 'dotenv';
import {Client, GatewayIntentBits} from 'discord.js';

config()

console.log(process.env.TOKEN)



const bot = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages
]
});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

const test = [
    {
        name: 'ping',
        description: 'Pong!',
    },
];

bot.login(process.env.TOKEN);