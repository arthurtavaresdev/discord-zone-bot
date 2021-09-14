const {playAudio} = require("../util/playAudio");
const ytdl = require('ytdl-core-discord');
const { Util } = require("discord.js");
const ytsr = require('ytsr');


module.exports = {
	async run(client, message, args) {
		const url = args.slice(0).join('');
		const video = await this.getVideo(message, url);

		const song = {
			id: video.videoDetails.videoId || '',
			title: Util.escapeMarkdown(video.videoDetails.title) || '',
			url: video.videoDetails.video_url || ''
		}
	
		
		await playAudio(
			client, 
			message, await ytdl(song.url, {
				filter: "audioonly",
			}), 
			{ type: 'opus' } 
		);
		message.channel.send(`🎶 Agora tocando ** ${song.title} **`);
	},

	async getVideo(message, url){
		let video;
		try {
		  video = await ytdl.getBasicInfo(url,  {filter: 'audioonly'})
		} catch (e) {
		  try {
			const results = await ytsr(url, { limit: 1 });
			const videos = results.items
	
			if (!videos.length) return await message.channel.message("❌ Não encontrei nenhum resultado sobre este vídeo.");
			video = await ytdl.getBasicInfo(videos[0].url.split("?v=")[1])
		  } catch (e) {
	        console.log('[#LOG]', `Ocorreu um erro:  ${e}`);
			return message.channel.message("❌ Ocorreu um erro desconhecido.");
		  }
		}

		return video;
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
			name: 'play',
			description: 'Reproduz um audio de uma musica do youtube.',
			usage: '!play <url|nome da musica>',
		};
	},
};
