/*
Project Name : MALVIN XD
Creator      : Malvin King
Repo         : https://github.com/XdKing2/MALVIN-XD
Support      : wa.me/263714757857
*/

const config = require('../GuruTech/settings');
const { malvin } = require('../GuruTech/malvin');
const { runtime } = require('../GuruTech/lib/functions');

const more = String.fromCharCode(8206);
const readMore = more.repeat(100); // Compact expandable section

malvin({
    pattern: "support",
    alias: ["follow", "links"],
    desc: "Display support and follow links for MALVIN XD",
    category: "main",
    react: "📡",
    filename: __filename
}, 
async (malvin, mek, m, {
    from, reply, pushname
}) => {
    try {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const uptimeFormatted = runtime(process.uptime());

        const message = `
✨ *ᴄᴏɴɴᴇᴄᴛ ᴡɪᴛʜ ᴍᴀʀɪsᴇʟ* ${readMore}
🎥 *ʏᴏᴜᴛᴜʙᴇ ᴄʜᴀɴɴᴇʟ*  
🔗 https://youtube.com/@wemacomic

📞 *ᴄᴏɴᴛᴀᴄᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀ*  
🔗 wa.me/254790375710?text=Hi%20Marisel,%20I%20need%20support!
> *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*  
  

        `.trim();

        await malvin.sendMessage(from, {
            image: { url: 'https://i.ibb.co/cSz0G58r/malvin-xd.jpg' },
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363299029326322@newsletter',
                    newsletterName: '𝖒𝖆𝖗𝖎𝖘𝖊𝖑',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Support Cmd Error:", e);
        reply(`⚠️ Error: ${e.message}`);
    }
});