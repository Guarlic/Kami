module.exports = {
  name: "핑",
  discription: "핑을 알려줌",
  execute(client, msg) {
    msg.reply('로딩중..').then(msg=>msg.delete({timeout:"1000"}));
    msg.reply(`🏓 퐁! 현재 핑은 ${Math.round(client.ws.ping)}ms 입니다!`);
  }
}
