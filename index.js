let { Client, Collection, Intents, MessageEmbed } = require('discord.js');
let fs = require('fs');
let client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });
client.commands = new Collection();

const { clientid, token } = require('./config.json');

let commandjson = fs.readFileSync('commands.json','utf-8');

let obj = JSON.parse(commandjson);
let cmdlist = obj.cmdlist;

let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

console.log('<감지된 추가 명령어>\n');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`  - 이름: ${command.name} / 설명: ${command.description}`);
    client.commands.set(command.name, command);
}

const default_prefix = "꺠미";
const default_prefix2 = "꺠미야 ";

function deleteFileCallback(error) {
    if (error)
        console.log(`오류; 탈퇴 실패\n${error.message}`);
    else
        console.log('탈퇴 성공');
}

// 클라이언트 시작
client.once('ready', () => {
    console.log('\n꺠미봇 준비완료!');
    client.user.setActivity('꺠미야', { type: "LISTENING" })
});

client.on("messageCreate", async msg => {
    if (msg.author.bot || !msg.content.startsWith(default_prefix)) return;
    // 메시지 값 콘솔
    console.log(`[ ${msg.guild.name} ] "${msg.channel.name}" ${msg.member.user.username}#${msg.member.user.discriminator} : ${msg.content}`);
    const id = msg.author.id;
    const name = msg.author.username;
    const filePath = `./data/${id}.json`;

    !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;

    const user = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const today = new Date();
    const date = '' + today.getFullYear() + today.getMonth() + today.getDate();
    const Gdate = '' + today.getFullYear() + today.getMonth() + today.getDate();

    const howMuch = 100;

    let saveUser = {};

    if (!user.id)
        user.blackstone = 0;

    const args = msg.content.slice(default_prefix2.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (msg.content == "꺠미야 돈줘") {
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
                    Gdate : user.Gdate,
                    gem : user.gem,
                    money : user.money + howMuch
                };
            }

          fs.writeFileSync(filePath, JSON.stringify(saveUser));
        }
        else
            msg.reply('등록되지 않은 유저에요! `꺠미야 등록` 을 입력해보세요!');
        return;
    }
    else if (msg.content == "꺠미야 등록") {
      const howMuch = 300;
      if (user.id) {
          msg.reply('이미 등록하셨어요!');
          saveUser = {
              id,
              name,
              date : user.date,
              Gdate : user.Gdate,
              gem : user.gem,
              blackstone : user.blackstone,
              money : user.money
          };
      }
      else {
          msg.reply(`등록을 축하드려요! 보상 ${howMuch}꺰 이에요!`);
          saveUser = {
              id,
              name,
              date : 0,
              Gdate : 0,
              gem : 0,
              blackstone : 0,
              money : howMuch
          };
      }
      fs.writeFileSync(filePath, JSON.stringify(saveUser));
      return;
    }
    else if (msg.content == "꺠미야 탈퇴") {
        if (user.id) {
            fs.unlink(filePath, deleteFileCallback);
            msg.reply('탈퇴 했어요 ㅜ.ㅜ 다음에 또 봐요');
        }
        else
            msg.reply('ㄴ..네? 등록하시지 않았어요;;');
        return;
    }
    else if (msg.content == "꺠미야 지갑") {
        if (user.id) {
            if (user.blackstone) {
                msg.reply(`현재 잔액은 ${user.money}꺰이에요!\n꺰보석은 ${user.gem}개 가지고 있어요!... 그리고 블랙스톤도 ${user.blackstone}개 가지고 있군..요?`);
                return;
            }
            msg.reply(`현재 잔액은 ${user.money}꺰이에요!\n꺰보석은 ${user.gem}개 가지고 있어요!`);
        }
        else
            msg.reply('등록되지 않은 유저에요! \`꺠미야 등록\` 을 입력해주세요!');
        return;
    }
    else if (msg.content == "꺠미야 상점") {
        if (user.id)
            msg.reply('꺰보석 - 100꺰');
        else
            msg.reply('등록되지 않은 유저에요! \`꺠미야 등록\` 을 입력해주세요!');
        return;
    }
    else if (msg.content.startsWith('꺠미야 구매-')) {
        if (user.id) {
            switch (msg.content) {
              case '꺠미야 구매-꺰보석':
                  if (user.money < 100) {
                      msg.reply('잔액이 부족합니다!');
                      saveUser = {
                          id,
                          name,
                          date : user.date,
                          Gdate : user.Gdate,
                          blackstone : user.blackstone,
                          money : user.money
                      };
                      return;
                  }
                  msg.reply('꺰보석이 성공적으로 구매되었습니다!');
                  saveUser = {
                      id,
                      name,
                      date : user.date,
                      Gdate : user.Gdate,
                      gem : user.gem + 1,
                      blackstone : user.blackstone,
                      money : user.money - howMuch
                  };
                break;
              case '꺠미야 구매-히든_블랙스톤':
                  if (user.money < 10000) {
                      msg.reply('돈을 챙겨 돌아와라.');
                      msg.react('😎');
                      saveUser = {
                          id,
                          name,
                          date : user.date,
                          Gdate : user.Gdate,
                          gem : user.gem,
                          blackstone : user.blackstone,
                          money : user.money
                      };
                      return;
                  }
                  msg.reply('물건은 여기있다..');
                  saveUser = {
                      id,
                      name,
                      date : 0,
                      Gdate : 0,
                      gem : user.gem + 100,
                      blackstone : user.blackstone + 1,
                      money : user.money - 10000
                  };
                  break;
            }
        }
        else
            msg.reply('등록되지 않은 유저에요! \`꺠미야 등록\` 을 입력해주세요!');
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        return;
    }
    else if (msg.content.startsWith('꺠미야 판매-')) {
        if (user.id) {
            switch (msg.content) {
              case '꺠미야 판매-꺰보석':
                  if (!user.gem) {
                      msg.reply('꺰보석이 부족합니다!');
                      saveUser = {
                          id,
                          name,
                          date : user.date,
                          Gdate : user.Gdate,
                          gem : user.gem,
                          blackstone : user.blackstone,
                          money : user.money
                      };
                      return;
                  }
                          
                  msg.reply('꺰보석이 성공적으로 판매되었습니다!');
                  saveUser = {
                      id,
                      name,
                      date : user.date,
                      Gdate : user.Gdate,
                      gem : user.gem - 1,
                      blackstone : user.blackstone,
                      money : user.money + howMuch
                  };
                  break;
              case '꺠미야 판매-히든_블랙스톤':
                  if (!user.blackstone) {
                      msg.reply('블랙스톤을 가지고 와라.');
                      msg.react('😎');
                      saveUser = {
                          id,
                          name,
                          date : user.date,
                          Gdate : user.Gdate,
                          gem : user.gem,
                          blackstone : user.blackstone,
                          money : user.money
                      };
                      return;
                  }
                  msg.reply('블랙스톤이 1개 파괴되었다..');
                  saveUser = {
                      id,
                      name,
                      date : user.date,
                      Gdate : user.Gdate,
                      gem : user.gem,
                      blackstone : user.blackstone - 1,
                      money : user.money
                  };
                  break;
            }
        }
        else
          msg.reply('등록되지 않은 유저에요! \`꺠미야 등록\` 을 입력해주세요!');
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        return;
    }
    else if (msg.content == "꺠미야 보석타임") {
        if (user.id) {
            if (Number(user.Gdate) <= date - 7) {
                const howMuch = 10;
                msg.reply('보석타임!! 삐슝빠슝뿌슝!!\n꺰보석 10개~!!!!');
                saveUser = {
                    id,
                    name,
                    date,
                    Gdate,
                    gem : user.gem + howMuch,
                    blackstone : user.blackstone,
                    money : user.money
                };
            }
            else {
                msg.reply(`아직 보석타임이 아니에요! 보석타임까진 ${7 - Number(user.Gdate) + Number(date)}일이 남았어요!`);
                saveUser = {
                    id,
                    name,
                    date : user.date,
                    Gdate : user.Gdate,
                    gem : user.gem,
                    blackstone : user.blackstone,
                    money : user.money
                };
            }
        }
        else
            msg.reply('등록되지 않은 유저에요! \`꺠미야 등록\` 을 입력해주세요!');
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        return;
    }

    try {
        if (msg.content.startsWith(default_prefix2))
            console.log(`${msg.content} 명령어가 감지되었습니다!`);
        client.commands.get(command).execute(client, msg, args);
        return;
    }
    catch (error) {
        for (var i = 0; i < cmdlist.length; i++) {
            if (msg.content == cmdlist[i].CmdName) {
                console.log(`${cmdlist[i].CmdName} 명령어가 인식되었습니다!`);
                msg.reply(cmdlist[i].output);
                if (cmdlist[i].react != null)
                    msg.react(cmdlist[i].react);
                return;
            }
        }
    }

    if (msg.content.startsWith(default_prefix) && msg.content.slice(default_prefix) != ' ' && msg.content != default_prefix) {
        if (msg.content.startsWith(default_prefix2)) {
            msg.reply(`\`${msg.content.slice(default_prefix2.length)}\`..?`);
            return;
        }
        msg.reply(`\`${msg.content.slice(default_prefix.length + 1)}\`..?`);
    }
});

client.login(token);
