module.exports = {
  name: "채널",
  description: "채널 이름을 보여줌",
  execute(msg) {
    return msg.reply(`이 채널의 이름은 \`${msg.channel.name}\` 입니다!`);
  }
}
