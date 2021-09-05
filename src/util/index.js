module.exports = {
	getYear: () => {
		current_date = new Date();
		return current_date.getYear();
	},
	isCommand: message =>
		message.content.startsWith(process.env.COMMAND_PREFIX),
}