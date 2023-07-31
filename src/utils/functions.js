const moment = require('moment');

const color = "#9968d3";

const wait = require('node:timers/promises').setTimeout;
const log = l => console.log(`[${moment().format('DD/MM HH:mm:ss')}] => ${l}`);

module.exports = { wait, log, color }