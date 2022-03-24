let fs = require('fs');

module.exports = {
    name: "월급",
    description: "100 꺰 지급",
    execute(client, msg) {
        const id = msg.author.id;
        const name = msg.author.username;
        const filePath = `../data/${id}.json`;
        
        fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;
        
        const user = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const today = new Date();
        const date = '' + todoay.getFullYear() + today.getMonth() + today.getDate();

        const howMuch = 100;

        let saveUser = {};
        if (user.id) {
            if (user.date == date) {
              msg.reply('오늘의 꺰은 이미 수령했어요!');
              saveUser = user;
          }
          else {
              msg.reply(`${howMuch}꺰을 수령했어요!! 내일 또 봐요~!`);
              saveUser = {
                  id,
                  name,
                  date,
                  money : user.money + howMuch
              };
          }

          fs.writeFileSync(filepath, JSON.stringify(saveUser));
        }
        else
            msg.reply('등록되지 않았어요! `꺠미야 등록` 을 입력해보세요!');
      }
}

