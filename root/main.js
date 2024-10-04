const fs = require('node:fs');
const path = require('node:path');
const {Client, GatewayIntentBits, Events, Collection} = require('discord.js');
const { TOKEN } = require('./config.json');
;

const bot = new Client({ intents: [
  GatewayIntentBits.Guilds
]
});

bot.commands = new Collection();


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			bot.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

bot.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = bot.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command found matching ${interaction.commandName}`);
    return;
  }

  try {
      await command.execute(interaction);
  } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
    } else {
        await interaction.reply({ conten: 'There was an error while executing this command!', ephemeral: true});
    }
  }
});

bot.once(Events.ClientReady, readybot => {
  console.log(`Logged in as ${readybot.user.tag}!`);
});


bot.login(TOKEN);