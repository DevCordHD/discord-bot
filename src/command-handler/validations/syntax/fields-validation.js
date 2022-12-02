module.exports = ({ filePath, commandObject }) => {
  if (!commandObject.name) {
    throw new Error(`⛔️ Command name is required at "${filePath}".`);
  }

  if (!commandObject.description) {
    throw new Error(`⛔️ Command description is required at "${filePath}".`);
  }

  if (!commandObject.options) {
    commandObject.options = [];
  }

  if (!commandObject.callback) {
    throw new Error(
      `⛔️ Command callback function is required at "${filePath}".`
    );
  }
};
