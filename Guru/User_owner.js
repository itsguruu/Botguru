/*
🔧 Project      : MALVIN-XD
👑 Creator      : Malvin King (Mr. Lord Malvin)
📦 Repository   : https://github.com/XdKing2/MALVIN-XD
📞 Support      : https://wa.me/263714757857
*/

const { malvin } = require('../GuruTech/malvin');
const config = require('../GuruTech/settings');

malvin({
  pattern: "owner",
  react: "📞",
  desc: "Send bot owner's contact",
  category: "main",
  filename: __filename
}, async (malvin, mek, m, { from, reply }) => {
  try {
    const ownerName = config.OWNER_NAME || "Itsguru";
    const ownerNumber = config.OWNER_NUMBER || "254116284050";

    // Build vCard contact
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${ownerName}`,
      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}`,
      "END:VCARD"
    ].join('\n');

    // Send vCard contact
    await malvin.sendMessage(from, {
      contacts: {
        displayName: ownerName,
        contacts: [{ vcard }]
      }
    });

    // Send image + caption
    await malvin.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/op2ca2.jpg' },
      caption: `
╭── ❍ powered by Guru
│ ✦ 𝙽𝚊𝚖𝚎   : *${ownerName}*
│ ✦ 𝙽𝚞𝚖𝚋𝚎𝚛 : *${ownerNumber}*
│ ✦ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 : *${config.version || 'Unknown'}*
╰───────────────
> powered by guru🇰🇪!`,
      contextInfo: {
        mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363299029326322@newsletter',
          newsletterName: 'Itsguru',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in .owner command:", error);
    reply(`⚠️ An error occurred: ${error.message}`);
  }
});
