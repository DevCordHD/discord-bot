const registerCommands = require('../../command-handler/registerCommands');

module.exports = async (client) => {
  await registerCommands(client);
};
