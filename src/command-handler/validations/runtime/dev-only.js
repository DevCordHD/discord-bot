const { devs } = require('../../../../config.json');

module.exports = async ({ client, command, interaction }) => {
  if (command.devOnly === true) {
    if (devs.includes(interaction.user.id)) {
      return true;
    } else {
      interaction.reply({
        content: 'Only the bot developers can run this command.',
        ephemeral: true,
      });
      return false;
    }
  } else {
    return true;
  }
};
