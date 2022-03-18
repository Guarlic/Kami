module.exports = {
  name: "서버",
  description: "서버 이름을 보여줌",
  execute(msg) {
    return msg.reply(`이 서버의 이름은 \`${msg.guild.name}\` 입니다!`);
  }
}
