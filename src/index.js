require('dotenv').config();
const { Client } = require('discord.js');

const eventHandler = require('./event-handler/eventHandler');

const client = new Client({
  intents: 131071,
});

(async () => {
  await eventHandler(client);
})();

client.login(process.env.TOKEN);
