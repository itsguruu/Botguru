const axios = require('axios');
const fetch = require('node-fetch');
const { sleep } = require('../GuruTech/lib/functions');
const { malvin } = require('../GuruTech/malvin');

// Joke Command
malvin({
    pattern: 'joke',
    desc: 'fetch a random joke 😂',
    react: '🤣',
    category: 'fun',
    use: '.joke',
    filename: __filename
}, async (malvin, mek, m, { from, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const { data } = await axios.get('https://official-joke-api.appspot.com/random_joke', { timeout: 15000 });
        if (!data?.setup || !data?.punchline) {
            await reply('❌ failed to fetch joke 😔');
            await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
            return;
        }

        const caption = `
╭━━〔*ʀᴀɴᴅᴏᴍ ᴊᴏᴋᴇ* 〕━━┈⊷
├ *sᴇᴛᴜᴘ*: ${data.setup} 🤡
├ *ᴘᴜɴᴄʜʟɪɴᴇ*: ${data.punchline} 😂
╰──────────────┈⊷
> *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(from, { text: caption, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ joke error:', error);
        const errorMsg = error.message.includes('timeout') ? '❌ request timed out ⏰' : '❌ failed to fetch joke 😞';
        await reply(errorMsg);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Flirt Command
malvin({
    pattern: 'flirt',
    alias: ['masom', 'line'],
    desc: 'fetch a random flirt line 💘',
    react: '💘',
    category: 'fun',
    use: '.flirt',
    filename: __filename
}, async (malvin, mek, m, { from, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/flirt?apikey=${shizokeys}`, { timeout: 15000 });
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const { result } = await res.json();
        if (!result) throw new Error('Invalid API response');

        const caption = `
╭───[ *ғʟɪʀᴛ ʟɪɴᴇ* ]───
├ *ʟɪɴᴇ*: ${result} 💘
╰──────────────┈⊷
>  *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(from, { text: caption, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ flirt error:', error);
        const errorMsg = error.message.includes('timeout') ? '❌ request timed out ⏰' : '❌ failed to fetch flirt line 😞';
        await reply(errorMsg);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Truth Command
malvin({
    pattern: 'truth',
    alias: ['truthquestion'],
    desc: 'fetch a random truth question ❓',
    react: '❓',
    category: 'fun',
    use: '.truth',
    filename: __filename
}, async (malvin, mek, m, { from, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/truth?apikey=${shizokeys}`, { timeout: 15000 });
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const { result } = await res.json();
        if (!result) throw new Error('Invalid API response');

        const caption = `
╭───[ *ᴛʀᴜᴛʜ ǫᴜᴇsᴛɪᴏɴ* ]───
├ *ǫᴜᴇsᴛɪᴏɴ*: ${result} ❓
╰──────────────┈⊷
>  *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(from, { text: caption, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ truth error:', error);
        const errorMsg = error.message.includes('timeout') ? '❌ request timed out ⏰' : '❌ failed to fetch truth question 😞';
        await reply(errorMsg);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Dare Command
malvin({
    pattern: 'dare',
    alias: ['truthordare'],
    desc: 'fetch a random dare 🎯',
    react: '🎯',
    category: 'fun',
    use: '.dare',
    filename: __filename
}, async (malvin, mek, m, { from, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=${shizokeys}`, { timeout: 15000 });
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const { result } = await res.json();
        if (!result) throw new Error('Invalid API response');

        const caption = `
╭───[ *ᴅᴀʀᴇ ᴄʜᴀʟʟᴇɴɢᴇ* ]───
├ *ᴅᴀʀᴇ*: ${result} 🎯
╰──────────────┈⊷
>  *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(from, { text: caption, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ dare error:', error);
        const errorMsg = error.message.includes('timeout') ? '❌ request timed out ⏰' : '❌ failed to fetch dare 😞';
        await reply(errorMsg);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Fact Command
malvin({
    pattern: 'fact',
    desc: 'fetch a random fun fact 🧠',
    react: '🧠',
    category: 'fun',
    use: '.fact',
    filename: __filename
}, async (malvin, mek, m, { from, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const { data } = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en', { timeout: 15000 });
        if (!data?.text) {
            await reply('❌ failed to fetch fun fact 😔');
            await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
            return;
        }

        const caption = `
╭───[ *ʀᴀɴᴅᴏᴍ ғᴀᴄᴛ* ]───
├ *ғᴀᴄᴛ*: ${data.text} 🧠
╰──────────────┈⊷
>  *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(from, { text: caption, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ fact error:', error);
        const errorMsg = error.message.includes('timeout') ? '❌ request timed out ⏰' : '❌ failed to fetch fun fact 😞';
        await reply(errorMsg);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Pickup Line Command
malvin({
    pattern: 'pickupline',
    alias: ['pickup'],
    desc: 'fetch a random pickup line 💬',
    react: '💬',
    category: 'fun',
    use: '.pickupline',
    filename: __filename
}, async (malvin, mek, m, { from, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const res = await fetch('https://api.popcat.xyz/pickuplines', { timeout: 15000 });
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const { pickupline } = await res.json();
        if (!pickupline) throw new Error('Invalid API response');

        const caption = `
╭───[ *ᴘɪᴄᴋᴜᴘ ʟɪɴᴇ* ]───
├ *ʟɪɴᴇ*: ${pickupline} 💬
╰──────────────┈⊷
>  *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(from, { text: caption, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ pickupline error:', error);
        const errorMsg = error.message.includes('timeout') ? '❌ request timed out ⏰' : '❌ failed to fetch pickup line 😞';
        await reply(errorMsg);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Character Command
malvin({
    pattern: 'character',
    alias: ['char'],
    desc: 'check user character 🔥',
    react: '🔥',
    category: 'fun',
    use: '.character @user',
    filename: __filename
}, async (malvin, mek, m, { from, isGroup, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await reply('❌ this command works only in groups 😔');
            await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
            return;
        }

        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) {
            await reply('❌ please mention a user 😔');
            await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
            return;
        }

        const userChar = [
            'Sigma', 'Generous', 'Grumpy', 'Overconfident', 'Obedient', 'Good',
            'Simp', 'Kind', 'Patient', 'Pervert', 'Cool', 'Helpful', 'Brilliant',
            'Sexy', 'Hot', 'Gorgeous', 'Cute'
        ];
        const userCharacterSelection = userChar[Math.floor(Math.random() * userChar.length)];

        const caption = `
╭───[ *ᴜsᴇʀ ᴄʜᴀʀᴀᴄᴛᴇʀ* ]───
├ *ᴜsᴇʀ*: @${mentionedUser.split('@')[0]} 👤
├ *ᴄʜᴀʀᴀᴄᴛᴇʀ*: ${userCharacterSelection} 🔥
╰──────────────┈⊷
>  *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(from, {
            text: caption,
            contextInfo: { mentionedJid: [m.sender, mentionedUser] }
        }, { quoted: mek });
        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ character error:', error);
        await reply('❌ error checking character 😞');
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Repeat Command
malvin({
    pattern: 'repeat',
    alias: ['rp', 'rpm'],
    desc: 'repeat a message multiple times 🔄',
    react: '🔄',
    category: 'fun',
    use: '.repeat <count>,<message>',
    filename: __filename
}, async (malvin, mek, m, { args, reply }) => {
    try {
        await malvin.sendMessage(m.from, { react: { text: '⏳', key: m.key } });

        if (!args[0]) {
            await reply('❌ usage: .repeat <count>,<message>\nexample: .repeat 5,hello');
            await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
            return;
        }

        const [countStr, ...messageParts] = args.join(' ').split(',');
        const count = parseInt(countStr.trim());
        const message = messageParts.join(',').trim();

        if (isNaN(count) || count <= 0 || count > 300) {
            await reply('❌ count must be between 1 and 300 😔');
            await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
            return;
        }

        if (!message) {
            await reply('❌ please provide a message 😔');
            await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
            return;
        }

        const repeatedMessage = Array(count).fill(message).join('\n');
        const caption = `
╭───[ *ʀᴇᴘᴇᴀᴛ ᴍᴇssᴀɢᴇ* ]───
├ *ᴄᴏᴜɴᴛ*: ${count} 🔄
├ *ᴍᴇssᴀɢᴇ*: ${repeatedMessage}
╰──────────────┈⊷
>  *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(m.from, { text: caption, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
        await malvin.sendMessage(m.from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ repeat error:', error);
        await reply('❌ error repeating message 😞');
        await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
    }
});

// Send Command
malvin({
    pattern: 'send',
    desc: 'send a message multiple times 🔄',
    react: '📤',
    category: 'fun',
    use: '.send <count>,<message>',
    filename: __filename
}, async (malvin, mek, m, { args, reply, senderNumber }) => {
    try {
        await malvin.sendMessage(m.from, { react: { text: '⏳', key: m.key } });

        const botOwner = malvin.user.id.split(':')[0];
        if (senderNumber !== botOwner) {
            await reply('❌ owner-only command 🚫');
            await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
            return;
        }

        if (!args[0]) {
            await reply('❌ usage: .send <count>,<message>\nexample: .send 5,hello');
            await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
            return;
        }

        const [countStr, ...messageParts] = args.join(' ').split(',');
        const count = parseInt(countStr.trim());
        const message = messageParts.join(',').trim();

        if (isNaN(count) || count <= 0 || count > 100) {
            await reply('❌ count must be between 1 and 100 😔');
            await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
            return;
        }

        if (!message) {
            await reply('❌ please provide a message 😔');
            await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
            return;
        }

        await reply(`📤 sending "${message}" ${count} times...`);
        for (let i = 0; i < count; i++) {
            await malvin.sendMessage(m.from, { text: message, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
            await sleep(1000);
        }

        const caption = `
╭───[ *sᴇɴᴅ ᴍᴇssᴀɢᴇ* ]───
├ *ᴄᴏᴜɴᴛ*: ${count} 📤
├ *sᴛᴀᴛᴜs*: sent successfully ✅
╰──────────────┈⊷
>  *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(m.from, { text: caption, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
        await malvin.sendMessage(m.from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ send error:', error);
        await reply('❌ error sending messages 😞');
        await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
    }
});

// Readmore Command
malvin({
    pattern: 'readmore',
    alias: ['rm', 'rmore', 'readm'],
    desc: 'create a read more message 📝',
    react: '📝',
    category: 'convert',
    use: '.readmore <text>',
    filename: __filename
}, async (malvin, mek, m, { args, reply }) => {
    try {
        await malvin.sendMessage(m.from, { react: { text: '⏳', key: m.key } });

        const inputText = args.join(' ') || 'No text provided';
        const readMore = String.fromCharCode(8206).repeat(4000);
        const message = `${inputText}${readMore} *Continue Reading...*`;

        const caption = `
╭───[ *ʀᴇᴀᴅ ᴍᴏʀᴇ* ]───
├ *ᴛᴇxᴛ*: ${message} 📝
╰──────────────┈⊷
>  *ᴍᴀᴅᴇ ʙʏ ᴍᴀʀɪsᴇʟ*`;

        await malvin.sendMessage(m.from, { text: caption, contextInfo: { mentionedJid: [m.sender] } }, { quoted: mek });
        await malvin.sendMessage(m.from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ readmore error:', error);
        await reply(`❌ error creating read more: ${error.message || 'unknown error'} 😞`);
        await malvin.sendMessage(m.from, { react: { text: '❌', key: m.key } });
    }
});