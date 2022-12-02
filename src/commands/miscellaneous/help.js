const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'List of commands you can use.',
  permissionsRequired: [],
  options: [
    {
      name: 'command-name',
      type: ApplicationCommandOptionType.String,
      description: 'Command you want to get information on.',
    },
  ],

  callback: async ({ client, interaction }) => {
    const commands = global.botCommands;
    const commandName = interaction.options.get('command-name')?.value;

    // Validate it's a specific command a user is looking up.
    if (commandName) {
      const command = commands.find(
        (cmd) => cmd.name === commandName.toLowerCase()
      );

      if (!command) {
        interaction.reply({
          content: 'That command was not found.',
          ephemeral: true,
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(`Command information: /${command.name}`)
        .setColor(0x33d4ff)
        .addFields(
          { name: 'Description', value: `\`\`\`${command.description}\`\`\`` },
          {
            name: 'Usage',
            value: `${
              command.options.length
                ? `\`\`\`/${command.name} ${command.options.map((option) => {
                    if (option.required === true) {
                      return `<${option.name}>`;
                    } else {
                      return `[${option.name}]`;
                    }
                  })}\`\`\``
                : `\`\`\`/${command.name}\`\`\``
            }`,
          }
        );

      interaction.reply({ embeds: [embed] });
      return;
    }

    // Send the full help menu if there's no specific command.
    else {
      const embed = new EmbedBuilder()
        .setTitle('Help menu')
        .setColor(0x33d4ff)
        .setDescription(
          'Type `/help [command-name]` to get more information on a command.'
        );

      const categories = [
        ...new Set(commands.map((command) => command.category)),
      ];

      for (const category of categories) {
        embed.addFields({
          name: category,
          value: `${commands.map(
            (command) => command.category === category && ` \`${command.name}\``
          )}`,
        });
      }

      interaction.reply({ embeds: [embed] });
    }
  },
};
