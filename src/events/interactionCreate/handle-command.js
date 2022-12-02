const path = require('path');
const fs = require('fs');

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = global.botCommands?.find(
    (command) => command.name === interaction.commandName
  );

  if (command) {
    // Runtime validations
    const validations = fs.readdirSync(
      path.join(
        __dirname,
        '..',
        '..',
        'command-handler',
        'validations',
        'runtime'
      )
    );

    for (validation of validations) {
      const validationFunction = require(path.join(
        __dirname,
        '..',
        '..',
        'command-handler',
        'validations',
        'runtime',
        validation
      ));

      if (
        (await validationFunction({ client, command, interaction })) === false
      ) {
        return;
      }
    }

    // Execute command
    const commandCallback = require(command.path).callback;
    await commandCallback({ client, interaction });
  }
};
