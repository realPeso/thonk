const NumberUtil = require('./NumberUtil.js');

class Logger {
  static log(message) {
    const date = new Date();
    const time = NumberUtil.pad(date.getHours(), 2) + ':' + NumberUtil.pad(date.getMinutes(), 2) + ':' + NumberUtil.pad(date.getSeconds(), 2);
    console.log(time.black.bgWhite + ' ' + message);
  }
}

module.exports = Logger;
