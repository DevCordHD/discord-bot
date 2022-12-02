module.exports = (options, existingOptions) => {
  for (let a = 0; a < options.length; ++a) {
    const option = options[a];
    const existing = existingOptions[a];

    if (
      option.name !== existing.name ||
      option.type !== existing.type ||
      option.description !== existing.description
    ) {
      return true;
    }
  }

  return false;
};
