const path = require('path');
const fs = require('fs');

const { guildId } = require('../../config.json');
const deleteCommand = require('./functions/deleteCommand');
const createCommand = require('./functions/createCommand');

module.exports = async (client) => {
  const commandsArr = [];

  const categories = fs.readdirSync(path.join(__dirname, '..', 'commands'), {
    withFileTypes: true,
  });

  for (category of categories) {
    if (category.isFile()) {
      throw new Error(
        `⛔️ Files need to be in their own category folder. Please move/delete "${category.name}" from the commands directory.`
      );
    } else {
      // Fetch commands from each category folder
      const commandFiles = fs.readdirSync(
        path.join(__dirname, '..', 'commands', category.name),
        { withFileTypes: true }
      );

      for (command of commandFiles) {
        if (command.isFile()) {
          // Run syntax validations if it is a valid file
          const validationFiles = fs.readdirSync(
            path.join(__dirname, 'validations', 'syntax')
          );

          const commandFilePath = path.join(
            __dirname,
            '..',
            'commands',
            category.name,
            command.name
          );

          const commandObject = require(commandFilePath);

          // Run each syntax validation for the command
          for (validationFile of validationFiles) {
            const validate = require(path.join(
              __dirname,
              'validations',
              'syntax',
              validationFile
            ));
            validate({ filePath: commandFilePath, commandObject });
          }

          // Delete command and ignore if { delete: true }
          if (commandObject.deleted === true) {
            await deleteCommand(client, commandObject.name, guildId);
            continue;
          }

          // Push { command } to [commandsArr]
          commandsArr.push({
            ...commandObject,
            category:
              category.name.charAt(0).toUpperCase() + category.name.slice(1),
            path: commandFilePath,
          });

          // Register the slash command
          await createCommand(
            client,
            commandObject.name,
            commandObject.description,
            commandObject.options,
            guildId
          );
        } else {
          throw new Error(
            `⛔️ Subfolders are not allowed in commands category folders. Please move/delete the folder "${command.name}" from "commands/${category.name}".`
          );
        }
      }
    }
  }

  console.log(`✅ Loaded ${commandsArr.length} commands.`);
  global.botCommands = commandsArr;
  return commandsArr;
};
