let fs = require('fs');

module.exports = {
    name: "등록",
    description: "새로 등록하기",
    execute(client, msg) {
        const id = msg.author.id;
        const name = msg.author.username;
        const filepath = `../data/${id}.json`;

        fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;

        const user = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const today = new Date();
        const date = '' + todoay.getFullYear() + today.getMonth() + today.getDate();

        const howMuch = 300;
      
        if (user.id)
            msg.reply('이미 등록된 유저에요!');
        else {
            msg.reply(`새로 시작한걸 축하드려요!\n보상 300꺰을 드릴게요!`);
            saveUser = {
                id,
                name,
                date,
                money : howMuch
            };
          fs.writeFileSync(filepath, JSON.stringify(saveUser));
        }
    }
}
