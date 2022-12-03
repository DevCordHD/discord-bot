const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Pong!!!',
  options: [],
  permissionsRequired: [PermissionsBitField.Flags.Administrator],
  // devOnly: true,
  // deleted: true,

  callback: async ({ client, interaction }) => {
    interaction.reply(`:ping_pong: Pong! Websocket: \`${client.ws.ping}ms\``);
  },
};
