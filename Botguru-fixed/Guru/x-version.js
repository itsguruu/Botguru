const axios = require('axios');
const config = require('../GuruTech/settings');
const { malvin } = require('../GuruTech/malvin');
const moment = require('moment-timezone');

malvin({
    pattern: 'version',
    react: '🚀',
    desc: 'check bot version & updates 📦',
    category: 'info',
    use: '.version',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const time = moment().tz('Africa/Harare').format('HH:mm:ss');
        const date = moment().tz('Africa/Harare').format('DD/MM/YYYY');
        const localPackage = require('../package.json');
        const currentVersion = localPackage.version;

        let latestVersion = 'Unknown';
        let status = '🔍 *Remote check disabled*';

        // Check if remote version checking is enabled (optional config toggle)
        if (config.CHECK_VERSION !== false) {
            const repoUrl = config.REPO || 'https://github.com/betingrich4/Mercedes';
            const repoPath = repoUrl.replace('https://github.com/', '');
            const rawUrl = `https://raw.githubusercontent.com/${repoPath}/master/package.json`;

            const { data: remotePackage } = await axios.get(rawUrl, { timeout: 15000 });
            latestVersion = remotePackage.version || 'Unknown';
            status = currentVersion === latestVersion
                ? '✅ *up-to-date*'
                : '⚠️ *update available*';
        }

        const caption = `
╭───[ *ʙᴏᴛ ᴠᴇʀsɪᴏɴ* ]───
├ *ᴄᴜʀʀᴇɴᴛ*: v${currentVersion} 📍
├ *ʟᴀᴛᴇsᴛ*: v${latestVersion} 🆕
├ *sᴛᴀᴛᴜs*: ${status}
├ *ᴄʜᴇᴄᴋᴇᴅ*: ${date} 🗓️
├ *ᴛɪᴍᴇ*: ${time} 🕒
├ *ʙᴏᴛ*: ${config.BOT_NAME || 'ᴍᴀʟᴠɪɴ-xᴅ'} 🤖
├ *ᴅᴇᴠᴇʟᴏᴘᴇʀ*: ${config.DEV_NAME || 'Marisel'} 
├ *ʀᴇᴘᴏ*: ${config.REPO || 'https://github.com/betingrich4/Mercedes'} 📦
╰──────────────┈⊷
> *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(from, {
            image: { url: config.ALIVE_IMG || 'https://url.bwmxmd.online/Adams.xm472dqv.jpeg' },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363299029326322@newsletter',
                    newsletterName: config.BOT_NAME ? `${config.BOT_NAME} Bot` : '𝖒𝖆𝖗𝖎𝖘𝖊𝖑',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ version check error:', error);

        const localVersion = require('../package.json').version;
        const caption = `
╭───[ *ᴠᴇʀsɪᴏɴ ᴇʀʀᴏʀ* ]───
├ *ʟᴏᴄᴀʟ ᴠᴇʀsɪᴏɴ*: v${localVersion} 📍
├ *ᴇʀʀᴏʀ*: ${error.message || 'unknown error'} ❌
├ *ʀᴇᴘᴏ*: ${config.REPO || 'not configured'} 📦
╰──────────────┈⊷
> *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await reply(caption);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});