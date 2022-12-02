const getCommands = require('./getCommands');
const areOptionsDifferent = require('./areOptionsDifferent');

module.exports = async (client, name, description, options, guildId) => {
  const commands = await getCommands(client, guildId);

  const existingCommand = commands.cache.find((cmd) => cmd.name === name);
  if (existingCommand) {
    const { description: existingDescription, options: existingOptions } =
      existingCommand;

    if (
      description !== existingDescription ||
      options.length !== existingOptions.length ||
      areOptionsDifferent(options, existingOptions)
    ) {
      console.log(`🔁 Updating the command "${name}".`);

      await commands.edit(existingCommand.id, {
        description,
        options,
      });
    }
    return;
  }

  await commands.create({
    name,
    description,
    options,
  });
};
