let { Client, Collection, Intents, MessageEmbed } = require('discord.js');
let fs = require('fs');
let readline = require('readline');
let client = new Client({ intents: [Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES ] });
client.commands = new Collection();

const { clientid, token } = require('./config.json');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let commandjson = fs.readFileSync('commands.json','utf-8');

let obj = JSON.parse(commandjson);
let cmdlist = obj.cmdlist;

let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(command.name);
    client.commands.set(command.name, command);
}

const default_prefix = "꺠미야 ";

// 클라이언트 시작
client.once('ready', () => {
    console.log('꺠미봇 준비완료!');
    client.user.setActivity('꺠미야', { type: "LISTENING" })
});

client.on("messageCreate", async msg => {
    if (msg.author.bot) return;
    // 메시지 값 콘솔
    console.log(`[ ${msg.guild.name} ] "${msg.channel.name}" ${msg.member.user.username}#${msg.member.user.discriminator} : ${msg.content}`);
    
    const args = msg.content.slice(default_prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try {
      client.commands.get(command).execute(msg, args);
    }
    catch (error) {
      for (var i = 0; i < cmdlist.length; i++) {
        if (msg.content == cmdlist[i].CmdName) {
          console.log(`${cmdlist[i].CmdName} 명령어가 인식되었습니다!`);
          msg.reply(cmdlist[i].output);
          if (cmdlist[i].react != null)
            msg.react(cmdlist[i].react);
        }
      }
    }
});

client.login(token);
