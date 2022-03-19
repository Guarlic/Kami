module.exports = {
    name: "어쩔티비",
    description: "저쩔티비~",
    execute(client, msg) {
        if (msg.author.discriminator == 4857)
            return [msg.reply('응~ 저쩔티ㅂ.. 아앗! 주인님 죄송해요!!'), msg.react('😅')]
        else
            return msg.reply('응~ 저쩔티뷔~');
    }
}
