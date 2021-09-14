const {  Client, Message, VoiceChannel, TextChannel} = require("discord.js");
/**
 * 
 * @param {Client} client 
 * @param {Message | VoiceState} object 
 * @param {Object} member 
 */
module.exports.playAudio = async (client, object, audio, options = {}) => {
    /**
     * @type {VoiceChannel}
     */
    const voiceChannel = object.member.voice.channel || object.channel;

    try{
        const connection = await voiceChannel.join();
        connection.play(audio, options)
            .on('error', () => voiceChannel.leave())
            .on('failed', () => voiceChannel.leave());


    }catch(e){
        console.log('[#LOG]', `Ocorreu um erro:  ${e}`);
    }
}