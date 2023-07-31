const { Client, Partials, Collection, WebhookClient, Events } = require('discord.js');
const client = new Client({
    intents: 3276799,
    shards: 'auto',
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});


const fs = require('node:fs');
const path = require('node:path');
const { readdirSync } = require('node:fs');
const moment = require('moment');
require('dotenv').config();
require('./src/utils/db.js')


const { log } = require('./src/utils/functions.js');


client.commands = new Collection();
const commands = []
const foldersPath = path.join(__dirname, 'src/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
            log(`Loaded slash command ${command.data.name}`);
        } else {
            log(`Slash command ${file} is missing data or execute function!`);
        }
    }
}


const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


client.on(Events.ClientReady, async (client) => {
    try {
        log(`Started pushing ${commands.length} slash commands.`);

        const data = await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        log(`Successfully pushed ${commands.length} slash commands.`);
    } catch (error) {
        log(error);
    }
})



readdirSync('./src/events').forEach(async file => {
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
        log(`Loaded event ${event.name}`);
    } else {
        client.on(event.name, (...args) => event.execute(...args));
        log(`Loaded event ${event.name}`);
    }
});



client.login(process.env.TOKEN);