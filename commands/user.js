module.exports = {
  name: "유저",
  description: "유저 이름을 알려줌",
  execute(client, msg) {
    if (msg.author.discriminator == 4857) {
      if (msg.member.displayName != "Guarlic3432")
          return [msg.reply(`앗 구알릭님!! 닉네임이 ${msg.member.displayName}(이)라서 못알아봤잖아요!`), msg.react('❤️')]
        else
          return [msg.reply('앗 구알릭님!!'), msg.react('❤️')]
    } else if (msg.author.username == "Guarlic3432" || msg.member.displayName == "Guarlic3432")
      return [msg.reply('앗 구알릭님!!.. 이 아니네?'), msg.react('⁉️')]
    else
      return msg.reply(`당신은 ${msg.author.username}! 맞죠?`);
  }
}
