module.exports = {
    name: "꺼져",
    description: "꺼지라고..?",
    execute(client, msg) {
        msg.reply('**너나 꺼져**').then(message => message.edit('***ㄴ.. 네? 뭐라구요?***'));
    }
}
