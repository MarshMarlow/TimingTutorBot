const fs = require("fs");
const Discord = require("discord.js");

const TURNS = {
    PARTY: 0,
    ENEMY: 1
}

var turn = false;
var turnCount = 0;

var party = {
    FP: 5,
    maxFP: 5,
    SE: 0.9,
    maxSE: 1,
    SP: 0,
    coins: 0,
    items: [],
    badges: []
}

var partners = [
    {name: "Goombella", HP:10, maxHP:10, atk:1, def:0, active: true, defending: false, status: []},
]

var Mario = {
    HP:10,
    maxHP:10,
    atk:1,
    def:0,
    defending:false,
    status: []
}

var field = [
    {name:"Goomba", HP:1, maxHP:2, atk:1, def: 0, sp:4, attacks: [], status: []},
    {name:"Goomba", HP:2, maxHP:2, atk:1, def: 0, sp:4, attacks: [], status: []},
]

var embed = new Discord.MessageEmbed()
            .setColor('#7e0ac2')
            .setAuthor('Pit of Infinite Trials!')

exports.save = function() {
    fs.writeFile('./data.json',JSON.stringify([party, partners, Mario, field], null, 2), async err => {
        if(err) {
            console.log(err);
            message.channel.send(":warning: An **error** has occured while saving data.");
        }
    });
}

exports.load = function() {
    fs.readFile('./data.json', async (err, rawdata) => {
        if(err) {
            console.log(err);
            message.channel.send(":warning: An **error** has occured while loading data.");
        } else {
            let data = JSON.parse(rawdata);
            party = data[0];
            partners = data[1];
            Mario = data[2];
            field = data[3];
        }
    });
}

exports.showStats = function() {
    embed.setTitle(`Turn ${turnCount} Stats:`)
    .setDescription(`Mario ${Mario.HP}/${Mario.maxHP} HP 
(pretend the partner stats are here) 
${party.FP}/${party.maxFP} FP | ${party.SE}/${party.maxSE} SE \n
- - - - - - - - - - \n
${getFieldString()}`)

    return embed;
}

// Helper Functions
function getFieldString() {
    let str = ``;
    let enemy;

    for(let i = 0;i < field.length;i++) {
        enemy = field[i];
        str += `${enemy.name} [${enemy.HP}/${enemy.maxHP}HP] \n`;
    }

    return str;
}
