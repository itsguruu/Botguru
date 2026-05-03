const axios = require('axios');
const config = require('../GuruTech/settings')
const {malvin , commands} = require('../GuruTech/malvin')
const googleTTS = require('google-tts-api')

malvin({
    pattern: "tts",
    desc: "download songs",
    category: "download",
    react: "👧",
    filename: __filename
},
async(malvin, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Need some text.")
    const url = googleTTS.getAudioUrl(q, {
  lang: 'hi-IN',
  slow: false,
  host: 'https://translate.google.com',
})
await malvin.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek })
    }catch(a){
reply(`${a}`)
}
})
