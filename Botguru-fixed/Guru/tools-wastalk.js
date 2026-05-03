const axios = require('axios');
const { malvin } = require('../GuruTech/malvin');

// WhatsApp Channel Stalker
malvin({
  pattern: 'wastalk',
  alias: ['chanstalk', 'wstalk'],
  react: '📢',
  desc: 'Get WhatsApp channel information',
  category: 'other',
  use: '.wastalk <channel-url>',
  filename: __filename
}, async (malvin, mek, msg, { from, reply, args }) => {
  try {
    if (!args[0]) return reply('❌ Provide WhatsApp channel URL');
    
    const url = encodeURIComponent(args[0]);
    const { data } = await axios.get(`https://api.nexoracle.com/stalking/whatsapp-channel?apikey=e276311658d835109c&url=${url}`);
    
    if (!data.result || data.status !== 200) {
      return reply('❌ Invalid channel or API error');
    }

    const { title, followers, description, image, link, newsletterJid } = data.result;
    const imageRes = await axios.get(image, { responseType: 'arraybuffer' });

    await malvin.sendMessage(from, {
      image: Buffer.from(imageRes.data),
      caption: `*📢 WhatsApp Channel Info*\n\n` +
               `*🔖 Title:* ${title}\n` +
               `*👥 Followers:* ${followers}\n` +
               `*📄 Description:* ${description || 'No description'}\n\n` +
               `*🔗 Link:* ${link}\n` +
               
               `ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ`
    }, { quoted: mek });

  } catch (error) {
    console.error('Channel Stalk Error:', error);
    reply('❌ Failed to fetch channel info');
  }
});
