let { Client, Collection, Intents, MessageEmbed } = require('discord.js');
let fs = require('fs');
let client = new Client({ intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES ] });
client.commands = new Collection();

const { clientid, token } = require('./config.json');

client.commands = new Collection();
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const prefix = '-';

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(command.data.name);
    client.commands.set(command.data.name, command);
}

// 클라이언트 시작
client.once('ready', () => {
    console.log('꺠미봇 준비완료!');
    client.user.setActivity('꺠미야', { type: "LISTENING" })
});

client.on("messageCreate", async msg => {
    // 메시지 값 콘솔
    console.log(`[ ${msg.guild.name} ] "${msg.channel.name}" ${msg.member.user.username}#${msg.member.user.discriminator} : ${msg.content}`);
    
    if (msg.content == "꺠미야 안녕") {
      console.log('꺠미봇이 인사를 받았어요!!');
      msg.reply('안녕하세여!');
    } else if (msg.content == "꺠미야 뭐해") {
      console.log('꺠미봇이 질문을 받았어요!!');
      msg.reply('코드를 읽고 있어요!');
    } else if (msg.content == "꺠미야 냥냥") {
      console.log('냥냥..?');
      msg.reply('안녕하세요 키딩냥이에요 냥냥!.. 어 이거 아닌가?');
    }  else if (msg.content == "꺠미야 구알릭") {
      console.log('주인님?');
      msg.reply('구알릭 (Guarlic#4857) 님은 저의 개발자에요! 김개미봇도 만들었다 해요!!');
    } else if (msg.content == "꺠미야 넌 누구야?" || msg.content == "꺠미야 넌 누구야") {
      console.log('누가 꺠미봇이 누군질 물어봤어요!!');
      msg.reply('전 구알릭 (Guarlic#4857) 님이 만드신 챗봇 꺠미에요!');
    } else if (msg.content == "꺠미야 잘가") {
      console.log('빠이빠이 인사 ㅜㅜ');
      msg.reply('잘가요 ㅜㅜ');
    } else if (msg.content == "꺠미야 서버") {
      console.log('서버이름을 답해요!!');
      msg.reply(`이 서버의 이름은 \`${msg.guild.name}\` (이)에요!`);
    } else if (msg.content == "꺠미야 채널") {
      console.log('채널이름을 답해요!!');
      msg.reply(`이 채널의 이름은 \`${msg.channel.name}\` (이)에요!`);
    } else if (msg.content == "꺠미야 유저") {
      console.log('유저이름을 답해요!!');
      if (msg.author.discriminator == 4857) {
        console.log('앗! 구알릭님이에요!!');
        if (msg.member.displayName != "Guarlic3432")
          msg.reply(`앗 구알릭님!! 닉네임이 ${msg.member.displayName}(이)라서 못알아봤잖아요!`);
        else
          msg.reply('앗 구알릭님!!');
        
        msg.react('♥️');
      } else if (msg.author.username == "Guarlic3432" || msg.author.displayName == "Guarlic3432") {
        console.log('어..?');
        msg.reply('앗 구알릭님!!.. 이 아니네..?');
      } else
        msg.reply(`당신은 ${msg.author.username}! 맞죠?`);
    } else if (msg.content == "꺠미야") {
      console.log('누가 꺠미를 불러요!!');
      msg.reply('저 여깄어요!');
    } else if (msg.content.startsWith('꺠미야')) {
      console.log('?');
      msg.reply(`\`${msg.content.slice(4)}\`..?`);
    }    // 작성자가 봇이면 return
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    
    // command 추출
    const commandBody = msg.content.slice(prefix.length);
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandtext = args.shift().toLowerCase();
    
    console.log(`L37 ${args}`)
    
    const command = client.commands.get(commandtext);
    
    // 없으면 리턴
    if (!command) return;
    console.log(`${msg.member.user.username}#${msg.member.user.discriminator} Messaged \"${msg.content}\"`)
    
    await command.execute(client, msg);
});

client.login(token);
