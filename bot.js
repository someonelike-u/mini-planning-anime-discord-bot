const utils = require('./utils.js');
const client = new utils.Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const schedule = require('cron').CronJob;

const BOT_TOKEN = process.env.BOT_TOKEN || require('./data.json').BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID || require('./data.json').CHANNEL_ID;
let scheduler;

client.login(BOT_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(() => {
    console.log('Stay awake !')
  }, 600000); // every 10 minutes
  console.log('[INFO] Bot started !');
  if (!scheduler) {
    console.log('[INFO] Planification activée !');
    scheduler = new schedule('0 0 1-31 0-11 0-6', () => {
      utils.purge(client);
      client.channels.cache.get(CHANNEL_ID).send('Aujourd\'hui, on est **' + utils.planning[new Date().getDay()].day + '** :');
      utils.sendAnimesForToday(client, new Date().getDay());
    }, () => {
      /* This function is executed when the job stops */
    },
      true, /* Start the job right now */
      'Europe/Paris' /* Time zone of this job. */
    );
  }
});

client.on('messageCreate', msg => {
  if (msg.content === '!init') {
    if (scheduler) {
      msg.reply('La planification est déjà activée !');
    } else {
      msg.reply('Planification activée : le planning du jour sera affiché tous les jours vers minuit !')
      msg.channel.send('Aujourd\'hui on est **' + utils.planning[new Date().getDay()].day + '** :');
      utils.sendAnimesForToday(msg, new Date().getDay());

      scheduler = new schedule('0 0 1-31 0-11 0-6', () => {
        utils.purge(msg);
        msg.channel.send('Aujourd\'hui, on est **' + utils.planning[new Date().getDay()].day + '** :');
        utils.sendAnimesForToday(msg, new Date().getDay());
      }, () => {
        /* This function is executed when the job stops */
      },
        true, /* Start the job right now */
        'Europe/Paris' /* Time zone of this job. */
      );
    }
  } else if (msg.content === '!stop') {
    if (scheduler) {
      scheduler.stop();
      scheduler = null;
      msg.reply('Planification désactivée !');
    } else {
      msg.reply('Planification déjà désactivée ou non active !');
    }
  } else if (msg.content === '!today') {
    msg.reply('Aujourd\'hui on est **' + utils.planning[new Date().getDay()].day + '** :');
    utils.sendAnimesForToday(msg, new Date().getDay());
  } else if (msg.content === '!dimanche') {
    msg.reply('**Dimanche** il y a :');
    utils.sendAnimesForToday(msg, 0);
  } else if (msg.content === '!lundi') {
    msg.reply('**Lundi** il y a :');
    utils.sendAnimesForToday(msg, 1);
  } else if (msg.content === '!mardi') {
    msg.reply('**Mardi** il y a :');
    utils.sendAnimesForToday(msg, 2);
  } else if (msg.content === '!mercredi') {
    msg.reply('**Mercredi** il y a :');
    utils.sendAnimesForToday(msg, 3);
  } else if (msg.content === '!jeudi') {
    msg.reply('**Jeudi** il y a :');
    utils.sendAnimesForToday(msg, 4);
  } else if (msg.content === '!vendredi') {
    msg.reply('**Vendredi** il y a :');
    utils.sendAnimesForToday(msg, 5);
  } else if (msg.content === '!samedi') {
    msg.reply('**Samedi** il y a :');
    utils.sendAnimesForToday(msg, 6);
  } else if (msg.content === '!week') {
    msg.reply('Voici le planning de chaque semaine :');
    utils.sendPlanningOfTheWeek(msg);
  } else if (msg.content === '!help') {
    utils.listAllCommands(msg);
  } else if (msg.content === '!purge') {
    utils.purge(msg);
    msg.reply('Tous les messages ont été effacés !').then(toDelete => toDelete.delete(5000));
  }
});
