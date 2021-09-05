const {  Client, Message, VoiceChannel, TextChannel} = require("discord.js");
/**
 * 
 * @param {Client} client 
 * @param {Message | VoiceState} object 
 * @param {Object} member 
 */
module.exports.playAudio = async (client, object, member) => {
    /**
     * @type {VoiceChannel}
     */
    const voiceChannel = object.member.voice.channel || object.channel;

    try{
        const connection = await voiceChannel.join();
        await connection.play(member.audio);
        connection.on('finish', end => voiceChannel.leave());


    }catch(e){
        console.log('[#LOG]', `Ocorreu um erro:  ${e}`);
    }
}

async function say(channel, msg) {
    if (channel instanceof TextChannel) {
        channel.send(msg);
    } else {
        console.log(msg);
    }
}