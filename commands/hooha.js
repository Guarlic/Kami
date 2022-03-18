module.exports = {
  name: "후하",
  discription: "후후 하",
  execute(client, msg) {
    const temp = Math.floor(Math.random() * 2 + 1);
    switch (temp) {
      case 1:
        return msg.reply('후 하 후 후 하');
      case 2:
        return msg.reply('후후 하하 후 후후후 하하하하 히힣 헤헿 핳');
    }
  }
}
