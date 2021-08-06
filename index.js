const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS, 
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS
	],
	partials: [
		'MESSAGE',
		'CHANNEL',
		'GUILD_MEMBER',
		'USER'
	]
});

client.commands = new Collection();

dotenv.config();

const commandFolders = fs.readdirSync('./commands');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	
	for (file of commandFiles) {
		const cFile = require(`./commands/${folder}/${file}`);

		client.commands.set(cFile.name, cFile);
	}
}

for (const file of eventFiles) {
	const ev = require(`./events/${file}`);

	if (ev.once) {
		client.once(ev.name, (...args) => {ev.execute(...args, client)});
	}
	else {
		client.on(ev.name, (...args) => {ev.execute(...args, client)})
	}
}

client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
		const data = [
			{
				name: 'ping',
				description: 'Replies with Pong!',
			}, 
			{
				name: 'roulette',
				description: '1/6th chance of getting shot.',
			},
		];

		const commands = await client.application?.commands.set(data);
		// const command = await client.guilds.cache.get(message.channel.guildId)?.commands.create(data);
	}
});

client.login(process.env.TOKEN);