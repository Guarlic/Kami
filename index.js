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

// 클라이언트 시작
client.once('ready', () => {
    console.log('\n꺠미봇 준비완료!');
    client.user.setActivity('꺠미야', { type: "LISTENING" })
});

client.on("messageCreate", async msg => {
    if (msg.author.bot || !msg.content.startsWith(default_prefix)) return;
    // 메시지 값 콘솔
    console.log(`[ ${msg.guild.name} ] "${msg.channel.name}" ${msg.member.user.username}#${msg.member.user.discriminator} : ${msg.content}`);
    
    const args = msg.content.slice(default_prefix2.length).split(/ +/);
    const command = args.shift().toLowerCase();

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

    if (msg.content.startsWith(default_prefix) && msg.content.slice(default_prefix) != ' ') {
        if (msg.content.startsWith(default_prefix2)) {
            msg.reply(`\`${msg.content.slice(default_prefix2.length)}\`..?`);
            return;
        }
        msg.reply(`\`${msg.content.slice(default_prefix.length + 1)}\`..?`);
    }
});

client.login(token);
