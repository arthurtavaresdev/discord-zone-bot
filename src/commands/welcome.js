const {playAudio} = require("../util/playAudio");
const {getMemberByID} = require("../members");
module.exports = {
	async run(client, message) {
		const member = getMemberByID(message.mentions.members.first().id);
		await playAudio(client, message, member);
	},
	async validate(client, message, [state]) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.channel.send("❌ Você não está em um canal de voz, por favor entre em um primeiro!");

		const permissions = voiceChannel.permissionsFor(message.guild.me);
		if (!permissions.has("CONNECT")) return  message.channel.send("❌ Eu não tenho permissão para conectar ao canal de voz!");
		if (!permissions.has("SPEAK")) return  message.channel.send("❌ Não tenho permissão para falar no canal de voz!");
	},
	get command() {
		return {
			name: 'Bem vindo',
			description: 'Reproduz um audio dandos boas vindas.',
			usage: '!welcome <member>',
		};
	},
};
