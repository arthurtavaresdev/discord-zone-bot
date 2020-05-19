require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core-discord");
const prefix = "!";
const meme = require("./randomFile");
const downloder = require("./downloadMeme");

client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

let helpMessage = `
Comandos gerais:
  !meme = Te responde com um meme aleatorio
  !adicionar = Ao enviar uma imagem mais este comando, adiciona uma imagem ao banco de memes.
  !clear = Limpar o chat

Audios de Memes:
  !moises
  !mentira
  !tabom
  !vocair
  !aiai
  !marilene
  !eusoulouco
  !burro
  !irineu
  !numsei
  !pele
  !faliceu
  !demencia
  !querocafe
  !paodebatata
  !senhora
  !muitoforte
 
Audios Meu querido:
  !22k
  !sergio
  !urisse
  !makense
  !josi
  !luisa 
  !gago
  !tuzao
  !joni
`;

client.on("message", (msg) => {
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const userCommand = args.shift().toLowerCase();

  const audiosCommands = {
    /** Tocando memes de altissima qualidade. */
    moises: () => playAudio('https://www.youtube.com/watch?v=6GfqT-HKsY8'),
    mentira: () => playAudio('https://www.youtube.com/watch?v=ViesudGoHKM'),
    tabom: () => playAudio('https://www.youtube.com/watch?v=hs91TFUdqdU'),
    vocair: () => playAudio('https://www.youtube.com/watch?v=z-6u1-3DRh8'),
    aiai: () => playAudio('https://www.youtube.com/watch?v=yCJV6VrOxBA'),
    marilene: () => playAudio('https://www.youtube.com/watch?v=z7-ZYXpJ_EU'),
    eusoulouco: () => playAudio('https://www.youtube.com/watch?v=TpAu95MjO0I'),
    burro: () => playAudio('https://www.youtube.com/watch?v=lOxSDaTfujU'),
    irineu: () => playAudio('https://www.youtube.com/watch?v=Odu55a5QtTE'),
    numsei: () => playAudio('https://www.youtube.com/watch?v=IHa5f4MWu1I'),
    pele: () => playAudio('https://www.youtube.com/watch?v=-vut5q_Z3Rc'),
    faliceu: () => playAudio('https://www.youtube.com/watch?v=8GIdYXBqu1s'),
    demencia: () => playAudio('https://www.youtube.com/watch?v=-kDO0rvwyiE'),
    querocafe: () => playAudio('https://www.youtube.com/watch?v=VxRpkfcXEpA'),
    paodebatata: () => playAudio('https://www.youtube.com/watch?v=sGci6pVA4D8'),
    senhora: () => playAudio('https://www.youtube.com/watch?v=sNOw2WVIYow'),
    muitoforte: () => playAudio('https://www.youtube.com/watch?v=KfjAQ9glCxE'),

    /** Audios para membros */
    '22k': () => msg.channel.send('Infelizmente este audio está indisponivel ! (Manda o Marcelo upar essa merda)'),
    sergio: () => msg.channel.send('Infelizmente este audio está indisponivel ! (Manda o Marcelo upar essa merda)'),
    urisse: () => msg.channel.send('Infelizmente este audio está indisponivel ! (Manda o Marcelo upar essa merda)'),
    makense: () => msg.channel.send('Infelizmente este audio está indisponivel ! (Manda o Marcelo upar essa merda)'),
    josi: () => msg.channel.send('Infelizmente este audio está indisponivel ! (Manda o Marcelo upar essa merda)'),
    luisa: () => msg.channel.send('Infelizmente este audio está indisponivel ! (Manda o Marcelo upar essa merda)'),
    gago: () => msg.channel.send('Infelizmente este audio está indisponivel ! (Manda o Marcelo upar essa merda)'),
    tuzao: () => msg.channel.send('Infelizmente este audio está indisponivel ! (Manda o Marcelo upar essa merda)'),
    joni: () => msg.channel.send('Infelizmente este audio está indisponivel ! (Manda o Marcelo upar essa merda)'),

  }


  const commands = {
    /** Comandos gerais */
    ajuda: () => msg.reply(helpMessage),
    help: () => msg.reply(helpMessage),
    meme: async () => {
      const file = await meme.randomFile();
      msg.reply("Um meme bolado pra tu consagrado", {
        files: [file],
      });
    },
    sair: () => {
      if (msg.member.voiceChannel) msg.member.voiceChannel.leave();
    },
    adicionar: async () => {
      try {
        let meme = msg.attachments.first();

        if (!meme) {
          msg.reply("Você precisa anexar uma imagem junto ao comando.");
          return;
        }

        if (!/\.(gif|jpe?g|tiff|png|webp|bmp)$/i.test(filename)) {
          msg.reply("É para enviar uma IMAGEM um animal");
          return;
        }

        await downloder.default(meme.url, meme.filename);
        msg.reply("Memes adicionados com sucesso");
      } catch (e) {
        msg.reply("Ocorreu um erro ao enviar a imagem");
        console.error(e);
      }
    },
    clear: () => {
      if (msg.member.hasPermission("MANAGE_MESSAGES")) {
        msg.channel.fetchMessages().then(
          function (list) {
            msg.channel.bulkDelete(list);
          },
          function (err) {
            msg.channel.send("Erro ao limpar ao chat.");
          }
        );
      }
    },
  };


  async function playAudio(link) {
    try {

      if (msg.member.voiceChannel) {
        commands.sair()
      }
      await msg.member.voiceChannel.join();
      msg.member.voiceChannel.connection.playOpusStream(
        await ytdl(link)
      ).on('end', () => {
        commands.sair()
      });
    } catch {
      msg.channel.send("Ocorreu um erro ao reproduzir o audio do vídeo");
    }
  }

  try {
    let command = commands[userCommand] ? commands[userCommand] : audiosCommands[userCommand];
    if (command) {
      command();
    }
  } catch (e) {
    msg.channel.sender("Ocorreu algum erro, contate o criador do bot");
    console.error(e);
  }
});
