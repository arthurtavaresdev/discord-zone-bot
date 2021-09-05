const Discord = require('discord.js');
const fs = require('fs').promises;

const client = new Discord.Client();
require('dotenv').config();

client.commands = new Map();

const init = async () => {
	const cmdFiles = await fs.readdir('src/commands/');
	console.log(
		'[#LOG]',
		`Carregando o total de ${cmdFiles.length - 1} comandos.`
	);
	cmdFiles.shift();
	cmdFiles.forEach(f => {
		try {
			// eslint-disable-next-line
			const props = require(`./commands/${f}`);
			if (f.split('.').slice(-1)[0] !== 'js') return;
			if (props.init) {
				props.init(client);
			}
			client.commands.set(props.command.name, props);
		} catch (e) {
			console.log(`[#ERROR] Impossivel executar comando ${f}: ${e}`);
		}
	});

	const evtFiles = await fs.readdir('src/events/');
	console.log('[#LOG]', `Carregando o total de ${evtFiles.length} eventos.`);
	evtFiles.forEach(f => {
		const eventName = f.split('.')[0];
		// eslint-disable-next-line
		const event = require(`./events/${f}`);

		client.on(eventName, event.bind(null, client));
	});

	client.on('error', err => console.error('[#ERROR]', err));

	await client.login(process.env.TOKEN);
};

init().then().catch(console.error);

module.exports = client.commands;
