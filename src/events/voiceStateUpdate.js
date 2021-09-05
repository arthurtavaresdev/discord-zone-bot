const {playAudio} = require("../util/playAudio");
const {getMemberByID} = require("../members");


const runCommand = async (client, oldMember, newMember) => {
	const voiceChannel = newMember.channel;
	const oldMemberChannel = oldMember.channel;
	if (voiceChannel && !oldMemberChannel) {
		const member = getMemberByID(newMember.member.id);
		try {
			await playAudio(client,newMember, member )
		} catch (e) {
			console.error(e);
		}
	}
};

module.exports = async (client, oldMember, newMember) => {
	await Promise.all([
		runCommand(client, oldMember, newMember),
	]);
};