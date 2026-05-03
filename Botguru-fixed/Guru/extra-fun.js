const { malvin } = require("../GuruTech/malvin");
const config = require('../GuruTech/settings');

// Compatibility command
malvin({
  pattern: "compatibility",
  alias: ["friend", "fcheck"],
  desc: "Calculate the compatibility score between two users.",
  category: "fun",
  react: "💖",
  filename: __filename,
  use: "@tag1 @tag2",
}, async (malvin, mek, m, { args, reply }) => {
  try {
    if (!m.mentionedJid || m.mentionedJid.length < 2) {
      return reply("Please mention two users to calculate compatibility.\nUsage: `.compatibility @user1 @user2`");
    }

    let user1 = m.mentionedJid[0];
    let user2 = m.mentionedJid[1];
    const devJid = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;

    // Random compatibility score between 1 and 1000
    let compatibilityScore = Math.floor(Math.random() * 1000) + 1;

    // Special max score if one user is the dev
    if (user1 === devJid || user2 === devJid) {
      compatibilityScore = 1000;
    }

    await malvin.sendMessage(mek.chat, {
      text: `💖 Compatibility between @${user1.split('@')[0]} and @${user2.split('@')[0]}: ${compatibilityScore}/1000 💖`,
      mentions: [user1, user2],
    }, { quoted: mek });

  } catch (error) {
    console.error(error);
    reply(`❌ Error: ${error.message}`);
  }
});

// Aura command
malvin({
  pattern: "aura",
  desc: "Calculate aura score of a user.",
  category: "fun",
  react: "💀",
  filename: __filename,
  use: "@tag",
}, async (malvin, mek, m, { reply }) => {
  try {
    if (!m.mentionedJid || m.mentionedJid.length < 1) {
      return reply("Please mention a user to calculate their aura.\nUsage: `.aura @user`");
    }

    let user = m.mentionedJid[0];
    const devJid = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;

    // Random aura score between 1 and 1000
    let auraScore = Math.floor(Math.random() * 1000) + 1;

    if (user === devJid) {
      auraScore = 999999;
    }

    await malvin.sendMessage(mek.chat, {
      text: `💀 Aura of @${user.split('@')[0]}: ${auraScore}${user === devJid ? '+' : '/1000'} 🗿`,
      mentions: [user],
    }, { quoted: mek });

  } catch (error) {
    console.error(error);
    reply(`❌ Error: ${error.message}`);
  }
});

// Magic 8-ball command
malvin({
  pattern: "8ball",
  desc: "Magic 8-Ball gives answers",
  category: "fun",
  react: "🎱",
  filename: __filename
}, async (malvin, mek, m, { q, reply }) => {
  if (!q) return reply("Ask a yes/no question! Example: .8ball Will I be rich?");

  const responses = [
    "Yes!", "No.", "Maybe...", "Definitely!", "Not sure.",
    "Ask again later.", "I don't think so.", "Absolutely!",
    "No way!", "Looks promising!"
  ];

  const answer = responses[Math.floor(Math.random() * responses.length)];
  reply(`🎱 *Magic 8-Ball says:* ${answer}`);
});

// Compliment command
malvin({
  pattern: "compliment",
  desc: "Give a nice compliment",
  category: "fun",
  react: "😊",
  filename: __filename,
  use: "@tag (optional)"
}, async (malvin, mek, m, { reply }) => {
  const compliments = [
    "You're amazing just the way you are! 💖",
    "You light up every room you walk into! 🌟",
    "Your smile is contagious! 😊",
    "You're a genius in your own way! 🧠",
    "You bring happiness to everyone around you! 🥰",
    "You're like a human sunshine! ☀️",
    "Your kindness makes the world a better place! ❤️",
    "You're unique and irreplaceable! ✨",
    "You're a great listener and a wonderful friend! 🤗",
    "Your positive vibes are truly inspiring! 💫",
    "You're stronger than you think! 💪",
    "Your creativity is beyond amazing! 🎨",
    "You make life more fun and interesting! 🎉",
    "Your energy is uplifting to everyone around you! 🔥",
    "You're a true leader, even if you don’t realize it! 🏆",
    "Your words have the power to make people smile! 😊",
    "You're so talented, and the world needs your skills! 🎭",
    "You're a walking masterpiece of awesomeness! 🎨",
    "You're proof that kindness still exists in the world! 💕",
    "You make even the hardest days feel a little brighter! ☀️"
  ];

  const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
  const sender = `@${mek.sender.split("@")[0]}`;
  const mentionedUser = m.mentionedJid && m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
  const target = mentionedUser ? `@${mentionedUser.split("@")[0]}` : "";

  const message = mentionedUser
    ? `${sender} complimented ${target}:\n😊 *${randomCompliment}*`
    : `${sender}, you forgot to tag someone! But hey, here's a compliment for you:\n😊 *${randomCompliment}*`;

  await malvin.sendMessage(mek.chat, {
    text: message,
    mentions: [mek.sender, mentionedUser].filter(Boolean),
  }, { quoted: mek });
});

// Love test command
malvin({
  pattern: "lovetest",
  desc: "Check love compatibility between two users",
  category: "fun",
  react: "❤️",
  filename: __filename,
  use: "@tag1 @tag2"
}, async (malvin, mek, m, { args, reply }) => {
  if (args.length < 2) return reply("Tag two users! Example: .lovetest @user1 @user2");

  let user1 = args[0].replace("@", "") + "@s.whatsapp.net";
  let user2 = args[1].replace("@", "") + "@s.whatsapp.net";

  let lovePercent = Math.floor(Math.random() * 100) + 1; // 1-100

  const messages = [
    { range: [90, 100], text: "💖 *A match made in heaven!* True love exists!" },
    { range: [75, 89], text: "😍 *Strong connection!* This love is deep and meaningful." },
    { range: [50, 74], text: "😊 *Good compatibility!* You both can make it work." },
    { range: [30, 49], text: "🤔 *It’s complicated!* Needs effort, but possible!" },
    { range: [10, 29], text: "😅 *Not the best match!* Maybe try being just friends?" },
    { range: [1, 9], text: "💔 *Uh-oh!* This love is as real as a Bollywood breakup!" }
  ];

  let loveMessage = messages.find(m => lovePercent >= m.range[0] && lovePercent <= m.range[1]).text;

  const message = `💘 *Love Compatibility Test* 💘\n\n❤️ *@${user1.split("@")[0]}* + *@${user2.split("@")[0]}* = *${lovePercent}%*\n${loveMessage}`;

  await malvin.sendMessage(mek.chat, { text: message, mentions: [user1, user2] }, { quoted: mek });
});

// Emoji converter command
malvin({
  pattern: "emoji",
  desc: "Convert text into emoji form.",
  category: "fun",
  react: "🙂",
  filename: __filename,
  use: "<text>"
}, async (malvin, mek, m, { args, reply }) => {
  try {
    if (!args.length) return reply("Please provide some text to convert into emojis!");

    const emojiMapping = {
      "a": "🅰️", "b": "🅱️", "c": "🇨️", "d": "🇩️", "e": "🇪️", "f": "🇫️",
      "g": "🇬️", "h": "🇭️", "i": "🇮️", "j": "🇯️", "k": "🇰️", "l": "🇱️",
      "m": "🇲️", "n": "🇳️", "o": "🅾️", "p": "🇵️", "q": "🇶️", "r": "🇷️",
      "s": "🇸️", "t": "🇹️", "u": "🇺️", "v": "🇻️", "w": "🇼️", "x": "🇽️",
      "y": "🇾️", "z": "🇿️",
      "0": "0️⃣", "1": "1️⃣", "2": "2️⃣", "3": "3️⃣", "4": "4️⃣", "5": "5️⃣",
      "6": "6️⃣", "7": "7️⃣", "8": "8️⃣", "9": "9️⃣", " ": "␣"
    };

    const text = args.join(" ").toLowerCase();
    const emojiText = [...text].map(c => emojiMapping[c] || c).join("");

    await malvin.sendMessage(mek.chat, { text: emojiText }, { quoted: mek });

  } catch (error) {
    console.error(error);
    reply(`❌ Error: ${error.message}`);
  }
});
