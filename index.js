require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const { playAudio } = require("./utils/audio");
const util = require('util');

const prefix = "!";

const meme = require("./utils/randomFile");
const downloader = require("./utils/downloaderImage");
let queue = new Map();

client.login(process.env.TOKEN);

const memberLinks = {
  meuquerido: "https://www.youtube.com/watch?v=ShWb9wIWp7c",
  "22k": "https://youtu.be/xpfsUqVEyHM",
  leon: "https://youtu.be/0BfJvyHBOII",
  urisse: "https://www.youtube.com/watch?v=H2iAL0Rbq6g",
  makense: "https://www.youtube.com/watch?v=9wcg57VnkNI",
  josi: "https://www.youtube.com/watch?v=NFjzhT3qAA0",
  luisa: "https://www.youtube.com/watch?v=lzzM1k0bt7U",
  gago: "https://youtu.be/zDDT2JvglSk",
  tuzao: "https://www.youtube.com/watch?v=yOEa1YK-SDg",
  joni: "https://www.youtube.com/watch?v=JXqXSfppOTY",
  scopel: "https://youtu.be/15lba7DIvkQ",
  shacal: "https://youtu.be/l_pBaFk73rg",
  jm: "https://youtu.be/4WuU7XXOADM",
  edu: "https://www.youtube.com/watch?v=hlr8cCsAr7g",
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}`);
});

const members = {
  "233266768095870977": "tuzao",
  "352169790212669460": "22k",
  233271179794710530: "urisse",
  "267081042937118721": "gago",
  "254789073691082753": "joni",
  "233795749916180490": "leon",
  "370694977757380608": "luisa",
  "204328361164537856": "josi",
  "233266831098380288": "makense",
  "505751378145050629": "scopel",
  "233303134804508672": "shacal",
  "335991054585167872": "jm",
  "403860012532760576": "edu",
};


client.on("voiceStateUpdate",  (oldMember, newMember) => {
  const voiceChannel = newMember.channel;
  const oldMemberChannel = oldMember.channel;
  if (voiceChannel && !oldMemberChannel) {
    const memberId = newMember.member.id;
    try {
      let member = members[memberId];
      if (member) {
       playAudio(client, newMember, memberLinks[member], queue);
      } else if (!newMember.member.user.bot) {
       playAudio(client,newMember,memberLinks["meuquerido"], queue);
      }
    } catch (e) {
      console.error(e);
    }
  }
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
  !mula
  !paraocarro

Audios Meu querido:
  !meuquerido
  !22k
  !leon
  !urisse
  !makense
  !josi
  !luisa 
  !gago
  !tuzao
  !joni
  !scopel
  !jm
  !shacal
`;

client.on("message",  (msg) => {
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const userCommand = args.shift().toLowerCase();

  const audiosCommands = {
    /** Tocando memes de altissima qualidade. */
    play:  () =>  playAudio(client, msg, args, queue),
    teste: () => playAudio(client, msg, "https://www.youtube.com/watch?v=9wcg57VnkNI", queue),
    moises:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=6GfqT-HKsY8", queue),
    mentira:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=ViesudGoHKM", queue),
    tabom:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=hs91TFUdqdU", queue),
    vocair:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=ihJp_tWnvQc", queue),
    aiai:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=yCJV6VrOxBA", queue),
    marilene:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=z7-ZYXpJ_EU", queue),
    eusoulouco:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=TpAu95MjO0I", queue),
    burro:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=lOxSDaTfujU", queue),
    irineu:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=Odu55a5QtTE", queue),
    numsei:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=IHa5f4MWu1I", queue),
    pele:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=-vut5q_Z3Rc", queue),
    faliceu:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=8GIdYXBqu1s", queue),
    demencia:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=-kDO0rvwyiE", queue),
    querocafe:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=VxRpkfcXEpA", queue),
    paodebatata:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=sGci6pVA4D8", queue),
    senhora:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=sNOw2WVIYow", queue),
    muitoforte:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=KfjAQ9glCxE", queue),
    mula:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=ZOOwJHneaqs", queue),
    paraocarro:  () =>
      playAudio(
        client, msg, "https://www.youtube.com/watch?v=buVRBF9HGH8", queue),
  };

  const commands = {
    /** Comandos gerais */
    queue: () => {
      console.log(queue);
      const serverQueue = queue.get(msg.guild.id)
      if (!serverQueue || serverQueue.songs.length == 0) return msg.channel.send("❌ Não há nada tocando agora!")
      if (serverQueue.songs.length == 1) return msg.channel.send("❌ A Fila está vazia!")
      return msg.channel.send([
        "__**Fila para a reprodução:**__",
        serverQueue.songs.slice(1).map(song => `- ${song.title}`).join("\n"),
        `**Tocando alguma:** ${serverQueue.songs[0].title}`
      ].join("\n\n"));
    },
    ajuda: () => msg.reply(helpMessage),
    help: () => msg.reply(helpMessage),
    meme:  () => {
      const file = meme.randomFile();
      msg.reply("Um meme bolado pra tu consagrado", {
        files: [file],
      });
    },
    sair: () => {
      msg.member.voice.channel.leave()
      queue = new Map();
    },
    adicionar:  () => {
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

       downloader.default(meme.url, meme.filename);
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

  try {
    let command = commands[userCommand];
    if (!command) {
      command = audiosCommands[userCommand];
    }

    if (!command && Object.values(members).includes(userCommand)) {
     playAudio(client, msg, memberLinks[userCommand], queue);
    }

    if (command) {
     command();
    }

  } catch (e) {
    msg.channel.send("Ocorreu algum erro, contate o criador do bot");
    console.error(e);
  }
});
