module.exports = async ({ client, command, interaction }) => {
  if (command.permissionsRequired.length) {
    for (const permission of command.permissionsRequired) {
      if (!interaction.member.permissions.has(permission)) {
        return interaction.reply(`Not enough permissions.`);
      }
    }
  }
};
