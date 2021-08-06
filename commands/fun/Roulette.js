const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'roulette',
    description: 'pew pew',
    async execute(interaction) {
        await interaction.reply(`${interaction.user} is hesitating but is pulling the trigger...`);
        await wait(5000);
        const dec = Math.random();

        if (dec < 0.16) {
            await interaction.followUp(`${interaction.user} died. Un-fucking-lucky.`);
            await interaction.user.send('https://discord.gg/EqMV6TgA');
            const member = interaction.member;
            member.kick();
        }
        else {
            await interaction.followUp(`${interaction.user} opens his/her eyes and is relieved to see the bright sun shining through the sky.`);
        }
        // await interaction.editReply(`${interaction.user} died. Un-fucking-lucky.`);
        // await interaction.client.channels.cache.get('851710044793208832').send(`${interaction.user} died.`);
    },
};