module.exports = async (client, guildId) => {
  let commands;

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  await commands.fetch();
  return commands;
};
