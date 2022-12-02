module.exports = {
  name: 'ping',
  description: 'Pong!!!',
  options: [],
  permissionsRequired: [],
  devOnly: true,
  // deleted: true,

  callback: async ({ client, interaction }) => {
    interaction.reply(`:ping_pong: Pong! Websocket: \`${client.ws.ping}ms\``);
  },
};
