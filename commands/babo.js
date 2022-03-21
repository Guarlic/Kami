module.exports = {
    name: "난바보야",
    description: "님은 바보가 아니에유~",
    execute(client, msg) {
        msg.reply('**네! 맞아요! 잘 아시네요!!**').then(message => message.edit('***ㄴ.. 네? 바보 아니셔요;;!!!***'));
    }
}
