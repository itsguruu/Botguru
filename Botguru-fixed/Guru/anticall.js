const fs = require('fs');
const path = require('path');
const config = require('../GuruTech/settings');
const { malvin } = require('../GuruTech/malvin');

const settingsPath = path.join(__dirname, '../settings.js');

malvin({
  pattern: 'anticall',
  desc: 'Toggle auto call reject on or off',
  use: '.anticall',
  category: 'privacy',
  filename: __filename
}, async (malvin, mek, m, { reply, isOwner }) => {
  if (!isOwner) return reply('❌ Owner only command.');

  try {
    // Toggle value
    config.ANTI_CALL = config.ANTI_CALL === 'true' ? 'false' : 'true';

    // Update settings.js
    let settingsText = fs.readFileSync(settingsPath, 'utf-8');
    settingsText = settingsText.replace(/ANTI_CALL\s*:\s*["'](true|false)["']/,
      `ANTI_CALL: "${config.ANTI_CALL}"`);
    fs.writeFileSync(settingsPath, settingsText);

    const status = config.ANTI_CALL === 'true' ? '✅ Enabled' : '❌ Disabled';
    reply(`*📞 Anti-Call mode is now:* ${status}`);
  } catch (err) {
    console.error(err);
    reply('❌ Failed to toggle anti-call setting.');
  }
});
