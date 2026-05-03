const { malvin } = require('../GuruTech/malvin');
const yts = require('yt-search');
const config = require('../GuruTech/settings');

malvin({
    pattern: 'yts',
    alias: ['ytsearch'],
    use: '.yts <query>',
    react: '🔎',
    desc: 'search youtube videos 📹',
    category: 'download',
    filename: __filename
}, async (malvin, mek, m, { from, args, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        // Check if YouTube search is enabled (optional config toggle)
        if (config.YTS_ENABLED === false) {
            await reply('❌ youtube search is disabled 🚫');
            await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
            return;
        }

        const query = args.join(' ');
        if (!query) {
            await reply('❌ please provide a search query 😔\nexample: .yts malvinxd');
            await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
            return;
        }

        const results = await yts(query);
        if (!results?.all?.length) {
            await reply('❌ no videos found for *${query}* 😔');
            await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
            return;
        }

        const videos = results.all.slice(0, 5); // Limit to 5 results for brevity
        const videoList = videos
            .map((video, index) => `
├ *${index + 1}.* ${video.title} 📹
├ *ᴜʀʟ*: ${video.url}
├ *ᴅᴜʀᴀᴛɪᴏɴ*: ${video.duration || 'N/A'} ⏱️
├ *ᴄʜᴀɴɴᴇʟ*: ${video.author?.name || 'Unknown'} 👤`)
            .join('\n\n');

        const caption = `
╭───[ *ʏᴏᴜᴛᴜʙᴇ sᴇᴀʀᴄʜ* ]───
├ *ᴛᴇʀᴍ*: ${query} 🔎
├ *ʀᴇsᴜʟᴛs*: ${videos.length} 🎥
${videoList}
│
╰──────────────┈⊷
> *powered by malvin* ♡`;

        await malvin.sendMessage(from, {
            image: { url: config.ALIVE_IMG || 'https://files.catbox.moe/01f9y1.jpg' },
            caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });

        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ yts error:', error);
        const errorMsg = error.message.includes('timeout')
            ? '❌ request timed out ⏰'
            : '❌ failed to search youtube 😞';
        await reply(errorMsg);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});