const { Events, EmbedBuilder, WebhookClient } = require('discord.js');
const webhook = new WebhookClient({ url: process.env.webhook_ready });
const { wait, log } = require('../utils/functions.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        try {
            await wait(2000)
            log(`Logged in as ${client.user.tag}!`);

        } catch (error) {
            console.error(`Error while logging in as ${client.user.tag}`);
            console.error(error);
        }
    }
}