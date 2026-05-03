const config = require("../GuruTech/settings");
const { malvin } = require('../GuruTech/malvin');
const moment = require('moment-timezone');
const os = require('os');
const { runtime } = require('../GuruTech/lib/functions');

const botStartTime = Date.now();
const ALIVE_IMG = config.ALIVE_IMAGE || 'https://url.bwmxmd.online/Adams.0dhfcjpi.jpeg';
const NEWSLETTER_JID = config.NEWSLETTER_JID || '120363299029326322@newsletter';
const AUDIO_URL = config.AUDIO_URL || 'https://files.catbox.moe/pjlpd7.mp3';

// Tiny caps mapping for lowercase letters
const tinyCapsMap = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
  j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'q', r: 'ʀ',
  s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
};

// Function to convert string to tiny caps
const toTinyCaps = (str) => {
  return str
    .split('')
    .map((char) => tinyCapsMap[char.toLowerCase()] || char)
    .join('');
};

malvin({
  pattern: 'alive',
  alias: ['uptime', 'runtime', 'test'],
  desc: 'Check if the bot is active.',
  category: 'info',
  react: '🚀',
  filename: __filename,
}, async (malvin, mek, m, { reply, from, pushname }) => {
  try {
    const uptime = runtime(process.uptime());
    const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);

    const caption = `
*┏─〔${pushname}〕─⊷*
*┇ ᴜᴘᴛɪᴍᴇ: ${uptime}*
*┇ ʙᴏᴛ ɴᴀᴍᴇ: ${config.BOT_NAME}*
*┇ ᴏᴡɴᴇʀ: ${config.OWNER_NAME}*
*┗──────────────⊷*
> ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ
`.trim();

    const buttons = [
      {
        buttonId: "action",
        buttonText: { displayText: "ᴍᴇɴᴜ ᴏᴘᴛɪᴏɴꜱ" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "ᴄʟɪᴄᴋ ʜᴇʀᴇ",
            sections: [
              {
                title: "ᴍᴇʀᴄᴇᴅᴇs",
                highlight_label: "",
                rows: [
                  {
                    title: "ᴍᴇɴᴜ",
                    description: "ᴏᴘᴇɴ ᴀʟʟ ᴄᴏᴍᴍᴀɴᴅꜱ",
                    id: `${config.PREFIX}menu`,
                  },
                  {
                    title: "ᴏᴡɴᴇʀ",
                    description: "ᴄᴏɴᴛᴀᴄᴛ ʙᴏᴛ ᴏᴡɴᴇʀ",
                    id: `${config.PREFIX}owner`,
                  },
                  {
                    title: "ᴘɪɴɢ",
                    description: "ᴛᴇꜱᴛ ʙᴏᴛ ꜱᴘᴇᴇᴅ",
                    id: `${config.PREFIX}ping`,
                  },
                  {
                    title: "ꜱʏꜱᴛᴇᴍ",
                    description: "ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ",
                    id: `${config.PREFIX}system`,
                  },
                  {
                    title: "ʀᴇᴘᴏ",
                    description: "ɢɪᴛʜᴜʙ ʀᴇᴘᴏꜱɪᴛᴏʀʏ",
                    id: `${config.PREFIX}repo`,
                  },
                ],
              },
            ],
          }),
        },
      },
    ];

    await malvin.sendMessage(from, {
      buttons,
      headerType: 1,
      viewOnce: true,
      image: { url: ALIVE_IMG },
      caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: toTinyCaps('𝖒𝖆𝖗𝖎𝖘𝖊𝖑'),
          serverMessageId: 143,
        },
      },
    }, { quoted: mek });

    // Send audio if configured
    if (AUDIO_URL) {
      await malvin.sendMessage(from, {
        audio: { url: AUDIO_URL },
        mimetype: 'audio/mp4',
        ptt: true,
      }, { quoted: mek });
    }

  } catch (error) {
    console.error('❌ Error in alive command:', error.message);
    await malvin.sendMessage(from, { react: { text: "❌", key: mek.key } });
    const errorMessage = toTinyCaps(`
      An error occurred while processing the alive command.
      Error Details: ${error.message}
      Please report this issue or try again later.
    `).trim();
    return reply(errorMessage);
  }
});
