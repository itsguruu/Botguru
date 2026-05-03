
const { malvin } = require('../GuruTech/malvin');

const config = require('../GuruTech/settings');

const { setPrefix } = require('../GuruTech/lib/prefix');

malvin({

  pattern: "setprefix",

  alias: ["prefix"],

  react: "🪄",

  desc: "Change the bot's command prefix.",

  category: "settings",

  filename: __filename,

}, async (malvin, mek, m, { args, isCreator, reply }) => {

  if (!isCreator) return reply("*📛 Only the owner can use this command!*");

  const newPrefix = args[0];

  if (!newPrefix) return reply("❌ Provide new prefix. Example: `.setprefix !`");

  setPrefix(newPrefix); // updates without reboot

  return reply(`✅ Prefix updated to *${newPrefix}* `);

});



  
