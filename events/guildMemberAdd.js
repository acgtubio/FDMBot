module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member, client) {
        await client.channels.cache.get('851710044793208832').send(`${member.user} has joined the family.`);
    },
};