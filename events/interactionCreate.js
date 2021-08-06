module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        if (!interaction.client.commands.has(interaction.commandName)) return;

        try {
            await interaction.client.commands.get(interaction.commandName).execute(interaction);
        } catch (error) {
            console.log(error);
        }
    },
};