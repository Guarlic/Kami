module.exports = {
  name: "꺼져",
  discription: "꺼지라고..?",
  execute(client, msg) {
    msg.reply('**너나 꺼져**').then(msg=>msg.delete({timeout:"4000"}));
    msg.reply('***ㄴ.. 네? 뭐라구요?***');
  }
}
