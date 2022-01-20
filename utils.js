const planning = require('./current-planning.json');
const Discord = require('discord.js');

const sendAnimesForToday = (msg, day) => {
    planning[day].animes.forEach(anime => {
        const embed = new Discord.MessageEmbed()
            .setTitle(anime.title)
            .setThumbnail(anime.img);
        if (anime.description === '') {
            embed.setDescription(getEditorLogos(anime.editor) + '[Voir infos](' + anime.url + ')');
        } else {
            embed.setDescription('*' + anime.description + '*\n' + getEditorLogos(anime.editor) + '[Voir infos](' + anime.url + ')');
        }
        if (msg instanceof Discord.Client) {
            msg.channels.get('606778861757136897').send({embeds: [embed]});
        } else {
            msg.channel.send({embeds: [embed]});
        }
    });
}

const purge = (msg) => {
    if (msg instanceof Discord.Client) {
        msg.channels.get('606778861757136897').messages.fetch().then(messages => {
            msg.channels.get('606778861757136897').bulkDelete(messages);
        });
    } else {
        msg.channel.messages.fetch().then(messages => {
            msg.channel.bulkDelete(messages);
        });
    }
}

const getAnimesByday = (msg, day) => {
    planning[day].animes.forEach(anime => {
        if (anime.description === '') {
            msg.channel.send(anime.title + ' | *par **' + anime.editor + '***');
        } else {
            msg.channel.send(anime.title + ' | *' + anime.description + ' par **' + anime.editor + '***');
        }
    });
}

function getEditorLogos(editor) {
    let logos = '';
    if (editor.includes('CR')) {
        logos += '<:cr:899339001272602646> ';
    }

    if (editor.includes('ADN')) {
        logos += '<:adn:899338965759451146> ';
    }

    if (editor.includes('WKN')) {
        logos += '<:wkn:899339033417748501> ';
    }

    if (editor.includes('fansub')) {
        logos += '<:fansub:899339080989560873> ';
    }

    if (editor.includes('NF')) {
        logos += '<:nf:899350822364778536> ';
    }
    return logos;
}

const sendPlanningOfTheWeek = (msg) => {
    msg.channel.send('**Lundi**');
    getAnimesByday(msg, 1);
    msg.channel.send('**Mardi**');
    getAnimesByday(msg, 2);
    msg.channel.send('**Mercredi**');
    getAnimesByday(msg, 3);
    msg.channel.send('**Jeudi**');
    getAnimesByday(msg, 4);
    msg.channel.send('**Vendredi**');
    getAnimesByday(msg, 5);
    msg.channel.send('**Samedi**');
    getAnimesByday(msg, 6);
    msg.channel.send('**Dimanche**');
    getAnimesByday(msg, 0);
}

const listAllCommands = (msg) => {
    msg.reply('Voici toutes les commandes possibles avec le bot MochiMochi');
    msg.channel.send('**!init** : *Affiche le planning d\'aujourd\'hui et planifie chaque jour à minuit le planning du jour*');
    msg.channel.send('**!stop** : *Arrêt de la demande plannifiée e planning du jour*');
    msg.channel.send('**!today** : *Affiche le planning du jour*');
    msg.channel.send('**!week** : *Affiche le planning de la semaine*');
    msg.channel.send('**!purge** : *Supprime tous les précédents messages du salon courant*');
    msg.channel.send('**!lundi** : *Affiche le planning du lundi*');
    msg.channel.send('**!mardi** : *Affiche le planning du mardi*');
    msg.channel.send('**!mercredi** : *Affiche le planning du mercredi*');
    msg.channel.send('**!jeudi** : *Affiche le planning du jeudi*');
    msg.channel.send('**!vendredi** : *Affiche le planning du vendredi*');
    msg.channel.send('**!samedi** : *Affiche le planning du samedi*');
    msg.channel.send('**!dimanche** : *Affiche le planning du dimanche*');
}

module.exports = {
    Discord: Discord,
    planning: planning,
    sendAnimesForToday: sendAnimesForToday,
    purge: purge,
    getAnimesByday: getAnimesByday,
    sendPlanningOfTheWeek: sendPlanningOfTheWeek,
    listAllCommands: listAllCommands
}