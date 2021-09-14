const {playAudio} = require("../util/playAudio");
const {getMemberByID} = require("../members");


const runCommand = async (client, oldMember, newMember) => {
	const voiceChannel = newMember.channel;
	const oldMemberChannel = oldMember.channel;

	if(newMember.member.user.bot || oldMember.member.user.bot){
		return;
	}

	if (voiceChannel && !oldMemberChannel) {
		const member = getMemberByID(newMember.member.id);
		try {
			await playAudio(client,newMember, member.audio )
		} catch (e) {
			console.log('[#LOG]', `Ocorreu um erro:  ${e}`);
		}
	}
};

module.exports = async (client, oldMember, newMember) => {
	await Promise.all([
		runCommand(client, oldMember, newMember),
	]);
};