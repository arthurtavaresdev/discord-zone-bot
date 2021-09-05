const path = require('path');

const members = [
    {
        "id": "233266768095870977",
        "name": "tuzao",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'Thuzao.mp3')
    },
    {
        "id": "352169790212669460",
        "name": "22k",
        "audio": path.resolve(__dirname,'..','assets', 'audios', '22k.mp3')
    },
    {
        "id": "233271179794710530",
        "name": "urisse",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'Urisse.mp3')
    },
    {
        "id": "267081042937118721",
        "name": "gago",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'Gago.mp3')
    },
    {
        "id": "254789073691082753",
        "name": "joni",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'Jonny.mp3')
    },
    {
        "id": "233795749916180490",
        "name": "leon",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'LEONmeuquerido.mp3')
    },
    {
        "id": "370694977757380608",
        "name": "luisa",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'luisa.mp3')
    },
    {
        "id": "793668516129144883",
        "name": "josi",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'Josy.mp3')
    },
    {
        "id": "233266831098380288",
        "name": "makense",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'Makense.mp3')
    },
    {
        "id": "505751378145050629",
        "name": "scopel",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'scopel.mp3')
    },
    {
        "id": "233303134804508672",
        "name": "shacal",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'meuquerido.mp3')
    },
    {
        "id": "335991054585167872",
        "name": "jm",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'JMmeuquerido.mp3')
    },
    {
        "id": "403860012532760576",
        "name": "edu",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'edu.mp3')
    },
    {
        "id": "836045291324702730",
        "name": "wazowski",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'wazowski.mp3')
    }
]

exports.getMemberByID = (id) => {
    const member = members.find((member) => member.id  === id);
    if(member){
        return member;
    }

    return {
        "name": "meuquerido",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'meuquerido.mp3')
    }
}

exports.getMemberByName = (name) => {
    const member = members.find((member) => member.name  === name);
    if(member){
        return member;
    }

    return {
        "name": "meuquerido",
        "audio": path.resolve(__dirname,'..','assets', 'audios', 'meuquerido.mp3')
    }
}


exports.members = members;