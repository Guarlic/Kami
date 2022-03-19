module.exports = {
    name: "ㅋㅋㄹㅃㅃ",
    description: "ㅋㅋㄹㅃㅃ~",
    execute(client, msg) {
        if (msg.author.discriminator == 4857)
            return [msg.reply('아 그거 그럿게 하는거 아닌ㄷ.. 아앗! 주인님 죄송해요!!'), msg.react('😅')]
        else
            return msg.reply('아 그거 그럿게 하는거 아닌데 ㅋㅋㄹㅃㅃ');
    }
}
