const { Events, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        let client = interaction.client;

        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            console.log(`Command ${interaction.commandName} not found!`);
            return;
        }

        try {
            await command.execute(client, interaction);
        } catch (error) {
            await interaction.reply({ content: 'There was an error while executing this command!\nPlease contact [support](https://discord.gg/EKJYrXnZWm) for any assistance.', ephemeral: true });
            console.error(`Error while executing command ${interaction.commandName}`);
            console.error(error);
        }
    }
}