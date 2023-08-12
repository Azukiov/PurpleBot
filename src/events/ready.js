const { Events, EmbedBuilder, WebhookClient } = require('discord.js');
const { wait, log, dt } = require('../utils/functions.js');
const fs = require('fs');
const moment = require('moment');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        try {
            await wait(2000)
            log(`Logged in as ${client.user.tag}!`);

            // check if logs folder exists and create it if it doesn't
            if (!fs.existsSync('./logs')) {
                fs.mkdirSync('./logs');
            }
            const date = moment().format('YYYY-MM-DD_HH-mm-ss')
            const logFile = fs.createWriteStream(`./logs/${date}.log`);
            logFile.write(`${dt} Logged in as ${client.user.tag}!`);


        } catch (error) {
            console.error(`Error while logging in as ${client.user.tag}`);
            console.error(error);
        }
    }
}