module.exports.permissionRequired = 0

const ytdl = require("ytdl-core"); 
const ytpl = require("ytpl"); 
const ytsr = require("ytsr"); 
const { Util, TextChannel, Client, Message, VoiceChannel, VoiceConnection } = require("discord.js");
const { isUrl } = require('./isUrl');

/**
 * 
 * @param {Client} client 
 * @param {Message | VoiceState} object 
 * @param {Array | String} args 
 * @param {Map} queue 
 */
module.exports.playAudio = async (client, object, args, queue) => {
  /**
   * @type {VoiceChannel}
   */
  const voiceChannel = object.member.voice.channel || object.channel;

  if (!voiceChannel) return await say(object.channel, "❌ Você não está em um canal de voz, por favor entre em um primeiro!");

  const permissions = voiceChannel.permissionsFor(object.guild.me);
  if (!permissions.has("CONNECT")) return await say(object.channel, "❌ Eu não tenho permissão para conectar ao canal de voz!");
  if (!permissions.has("SPEAK")) return await say(object.channel, "❌ Não tenho permissão para falar no canal de voz!");

  if (!args.length) return await say(object.channel, "❌ Você precisa pesquisar um vídeo ou me fornecer um URL!");

  const url = Array.isArray(args) ? args.join(" ") : args;

  if (url.includes("list=")) {
    const playlist = await ytpl(url.split("list=")[1])
    const videos = playlist.items;

    await say(object.channel, `✅ Playlist **${playlist.title}** (${videos.length}) foi adicionado à fila!`);
    for (const video of videos) await queueSong(video, object, voiceChannel, queue)
  } else {
    let video;
    try {
      video = await ytdl.getBasicInfo(url)
    } catch(e) {
      try {
        const results = await ytsr(url, {limit: 1});
        const videos = results.items

        if (!videos.length) return await say(object.channel, "❌ Não encontrei nenhum resultado sobre este vídeo.");
        video = await ytdl.getBasicInfo(videos[0].url.split("?v=")[1])
      } catch(e) {
        console.error(e)
        return say(object.channel, "❌ Ocorreu um erro desconhecido.");
      }
    }
    
    await say(object.channel, `✅ O Som **${video.videoDetails.title}** foi adicionado a fila!`);
    return await queueSong(video, object, voiceChannel, queue)
  }
}

async function queueSong(video, object, voiceChannel, queue) {
  const serverQueue = queue.get(object.guild.id);
  
  const song = {
    id: video.videoDetails.videoId,
    title: Util.escapeMarkdown(video.videoDetails.title),
    url: video.videoDetails.video_url
  }

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: object.channel || null,
      voiceChannel,
      connection: null,
      songs: [song],
      volume: 50,
      playing: true
    }

    try {
      voiceChannel
      const connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      queue.set(object.guild.id, queueConstruct)
      playSong(object.guild, queue, queueConstruct.songs[0])
    } catch(e) {
      console.error(e)
      await say(object.channel, '❌ Ocorreu um erro desconhecido ao tentar entrar no canal de voz!');
      return queue.delete(object.guild.id)
    }
  } else serverQueue.songs.push(song);

  return;
}

function playSong(guild, queue, song) {

  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  /**
   * @type {VoiceConnection}
   */
  const connection = serverQueue.connection;
 
  say(serverQueue.textChannel, `🎶 Agora tocando ** ${song.title} **`);
  connection.play(ytdl(song.id, { filter: 'audioonly' }), { bitrate: 'auto' })
    .on("speaking", speaking => {
      if (!speaking) {
        serverQueue.songs.shift();
        playSong(guild, queue, serverQueue.songs[0])
      }
    })
    .on("error", console.error)
    .setVolumeLogarithmic(serverQueue.volume / 250)
    
}

async function say(channel, msg){
    if(channel instanceof TextChannel){
        channel.send(msg);
    } else {
        console.log(msg);
    }
}