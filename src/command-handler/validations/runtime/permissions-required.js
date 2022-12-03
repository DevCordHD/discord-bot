module.exports = async ({ client, command, interaction }) => {
  if (command.permissionsRequired.length) {
    for (const permission of command.permissionsRequired) {
      if (!interaction.member.permissions.has(permission)) {
        interaction.reply({
          content: 'Not enough permissions.',
          ephemeral: true,
        });
        return false;
      }
    }
  }

  return true;
};
