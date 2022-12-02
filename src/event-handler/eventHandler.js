const path = require('path');
const fs = require('fs');

module.exports = async (client) => {
  const eventNames = fs.readdirSync(path.join(__dirname, '..', 'events'), {
    withFileTypes: true,
  });

  for (eventName of eventNames) {
    if (eventName.isFile()) {
      throw new Error(
        `⛔️ Files need to be in their own event folder. Please move/delete "${eventName.name}" from the events directory.`
      );
    } else {
      // Fetch events from each event folder
      const eventFiles = fs.readdirSync(
        path.join(__dirname, '..', 'events', eventName.name),
        { withFileTypes: true }
      );

      for (eventFile of eventFiles) {
        if (eventFile.isFile()) {
          const eventFunction = require(path.join(
            __dirname,
            '..',
            'events',
            eventName.name,
            eventFile.name
          ));

          // Run valid functions for each event
          client.on(eventName.name, async (...args) => {
            await eventFunction(client, ...args);
          });
        } else {
          throw new Error(
            `⛔️ Subfolders are not allowed in event names folders. Please move/delete the folder "${eventFile.name}" from "events/${eventFile.name}".`
          );
        }
      }
    }
  }
};
