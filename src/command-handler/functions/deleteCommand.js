const getCommands = require('./getCommands');

module.exports = async (client, commandName, guildId) => {
  const commands = await getCommands(client, guildId);

  const existingCommand = commands.cache.find(
    (cmd) => cmd.name === commandName
  );
  if (!existingCommand) {
    return;
  }

  await existingCommand.delete();
};
