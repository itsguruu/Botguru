// MALVIN-XD SPAM FUN TOOLS
// Author: Mr Malvin 🧠
// GitHub: https://github.com/XdKing2/MALVIN-XD

const config = require('../GuruTech/settings');
const { malvin } = require('../GuruTech/malvin');

// 🌀 Helper: Delay
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

/*
━━━━━━━━━━━━━━━
🔁 .msg - Owner-only spam tool
━━━━━━━━━━━━━━━
*/
malvin({
    pattern: "msg",
    desc: "Send a custom message multiple times (Owner Only)",
    category: "owner",
    react: "🔁",
    use: ".msg <text>,<count>",
    filename: __filename
}, async (malvin, mek, m, { from, reply, isCreator, q }) => {
    if (!isCreator) return reply('🚫 *Owner only command!*');
    if (!q.includes(',')) return reply("❌ *Usage:* .msg Hello,5");

    const [text, countStr] = q.split(',');
    const count = parseInt(countStr.trim());

    if (!text || isNaN(count) || count < 1 || count > 100)
        return reply("⚠️ Limit is 1 to 100 messages.");

    for (let i = 0; i < count; i++) {
        await malvin.sendMessage(from, { text: text.trim() }, { quoted: null });
        await sleep(400);
    }
});

/*
━━━━━━━━━━━━━━━
❤️ .loveyou - Confess your love
━━━━━━━━━━━━━━━
*/
malvin({
    pattern: "loveyou",
    desc: "Confess love repeatedly 😍",
    category: "fun",
    react: "❤️",
    use: ".loveyou <name>,<count>",
    filename: __filename
}, async (malvin, mek, m, { from, reply, q }) => {
    if (!q.includes(',')) return reply("❌ *Usage:* .loveyou Jenny,3");

    const [name, countStr] = q.split(',');
    const count = parseInt(countStr.trim());

    if (!name || isNaN(count) || count < 1 || count > 100)
        return reply("⚠️ Count must be between 1 and 100.");

    for (let i = 0; i < count; i++) {
        await malvin.sendMessage(from, { text: `❤️ I love you, ${name.trim()}! ❤️` }, { quoted: null });
        await sleep(400);
    }
});

/*
━━━━━━━━━━━━━━━
🔔 .notify - Mention someone repeatedly
━━━━━━━━━━━━━━━
*/
malvin({
    pattern: "notify",
    desc: "Mention a user multiple times",
    category: "group",
    react: "🔔",
    use: ".notify @user,5",
    filename: __filename
}, async (malvin, mek, m, { from, reply, q }) => {
    if (!m.mentionedJid || !q.includes(',')) return reply("❌ *Usage:* .notify @user,5");

    const [_, countStr] = q.split(',');
    const count = parseInt(countStr.trim());
    const target = m.mentionedJid[0];

    if (!target || isNaN(count) || count < 1 || count > 20)
        return reply("⚠️ Max allowed: 20 times.");

    for (let i = 0; i < count; i++) {
        await malvin.sendMessage(from, {
            text: `🔔 Hey <@${target.split('@')[0]}>`,
            mentions: [target]
        }, { quoted: null });
        await sleep(400);
    }
});

/*
━━━━━━━━━━━━━━━
⏰ .remind - Repeated reminder message
━━━━━━━━━━━━━━━
*/
malvin({
    pattern: "remind",
    desc: "Set a fake reminder message",
    category: "fun",
    react: "⏰",
    use: ".remind Brush your teeth,3",
    filename: __filename
}, async (malvin, mek, m, { from, reply, q }) => {
    if (!q.includes(',')) return reply("❌ *Usage:* .remind Homework,3");

    const [msg, countStr] = q.split(',');
    const count = parseInt(countStr.trim());

    if (!msg || isNaN(count) || count < 1 || count > 50)
        return reply("⚠️ Reminder count must be between 1 and 50.");

    for (let i = 0; i < count; i++) {
        await malvin.sendMessage(from, { text: `⏰ Reminder: ${msg.trim()}` }, { quoted: null });
        await sleep(400);
    }
});

/*
━━━━━━━━━━━━━━━
🤣 .spamjoke - Sends joke repeatedly
━━━━━━━━━━━━━━━
*/
malvin({
    pattern: "spamjoke",
    desc: "Send a silly joke many times",
    category: "fun",
    react: "🤣",
    use: ".spamjoke 3",
    filename: __filename
}, async (malvin, mek, m, { from, reply, q }) => {
    const count = parseInt(q?.trim());
    const joke = "😂 Why don’t skeletons fight each other? They don’t have the guts!";

    if (isNaN(count) || count < 1 || count > 30)
        return reply("⚠️ Max 30 jokes at once.");

    for (let i = 0; i < count; i++) {
        await malvin.sendMessage(from, { text: joke }, { quoted: null });
        await sleep(500);
    }
});


/*
━━━━━━━━━━━━━━━
🙏 .pray4me - Pray for someone sweetly
━━━━━━━━━━━━━━━
*/
malvin({
    pattern: "pray4me",
    desc: "Send a sweet prayer repeatedly",
    category: "fun",
    react: "🙏",
    use: ".pray4me John,3",
    filename: __filename
}, async (malvin, mek, m, { from, reply, q }) => {
    if (!q.includes(',')) return reply("❌ *Usage:* .pray4me Jenny,3");

    const [name, countStr] = q.split(',');
    const count = parseInt(countStr.trim());

    if (!name || isNaN(count) || count < 1 || count > 30)
        return reply("⚠️ Limit is 1 to 30 prayers.");

    for (let i = 0; i < count; i++) {
        await malvin.sendMessage(from, { text: `🙏 May blessings follow you, ${name.trim()} 🌟` }, { quoted: null });
        await sleep(500);
    }
});

/*
━━━━━━━━━━━━━━━
👻 .ghostping - Mention someone invisibly
━━━━━━━━━━━━━━━
*/
malvin({
    pattern: "ghostping",
    desc: "Ping user silently (ghost-style)",
    category: "group",
    react: "👻",
    use: ".ghostping @user,5",
    filename: __filename
}, async (malvin, mek, m, { from, reply, q }) => {
    if (!m.mentionedJid || !q.includes(',')) return reply("❌ *Usage:* .ghostping @user,5");

    const [_, countStr] = q.split(',');
    const count = parseInt(countStr.trim());
    const target = m.mentionedJid[0];

    if (!target || isNaN(count) || count < 1 || count > 10)
        return reply("⚠️ Max 10 ghost pings allowed.");

    for (let i = 0; i < count; i++) {
        await malvin.sendMessage(from, {
            text: '⠀', // invisible character
            mentions: [target]
        }, { quoted: null });
        await sleep(400);
    }
});

/*
━━━━━━━━━━━━━━━
🔊 .shout - Uppercase spam
━━━━━━━━━━━━━━━
*/
malvin({
    pattern: "shout",
    desc: "Shout something in all caps",
    category: "fun",
    react: "🔊",
    use: ".shout I’m the best,3",
    filename: __filename
}, async (malvin, mek, m, { from, reply, q }) => {
    if (!q.includes(',')) return reply("❌ *Usage:* .shout I am cool,3");

    const [msg, countStr] = q.split(',');
    const count = parseInt(countStr.trim());

    if (!msg || isNaN(count) || count < 1 || count > 50)
        return reply("⚠️ Limit is 1 to 50 messages.");

    const upper = msg.trim().toUpperCase();

    for (let i = 0; i < count; i++) {
        await malvin.sendMessage(from, { text: `🔊 ${upper}` }, { quoted: null });
        await sleep(400);
    }
});
