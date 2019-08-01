const patron = require('patron.js');
const items = require('../data/items.json');

class ItemTypeReader extends patron.TypeReader {
  constructor() {
    super({ type: 'item' });
  }

  async read(command, message, argument, args, input) {
    for (const key in items) {
      if (items.hasOwnProperty(key) === true) {
        const item = items[key];
        if (item.names.includes(input.toLowerCase())) {
          return patron.TypeReaderResult.fromSuccess(item);
        }
      }
    }

    return patron.TypeReaderResult.fromError(command, 'This item does not exist.');
  }
}

module.exports = new ItemTypeReader();
