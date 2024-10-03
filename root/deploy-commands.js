const { REST, Routes } = require('discord.js');
const {ClientID, guildID, TOKEN} = require ('./config.json')
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const folderpath = path.join(__dirname, 'commands');
const commandfolders = fs.readdirSync(folderpath);

for (const folder of commandfolders) {
  const commandspath = path.join(folderpath, folder);
  const commandfiles = fs.readdirSync(commandspath).filter(file => file.endsWith('.js'));
  for (const file of commandfiles) {
    const filepath = path.join(commandspath, file);
    const command = require(filepath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
      
    } else {
      console.log(`[WARNING] The command at ${filepath} is missing a required "data" or "execute" property.`);
    }
  }
}

const rest = new REST().setToken(TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
    const data = await rest.put(
      Routes.applicationGuildCommands(ClientID, guildID),
      {body: commands},
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch(error) {
    console.error(error);
  }
})();

