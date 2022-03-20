module.exports = {
    name: "설명",
    description: "채널의 설명을 알려줌",
    execute(client, msg) {
        return msg.reply(`이 채널의 설명은 \`${msg.channel.topic}\` 입니다!`);
    }
}
