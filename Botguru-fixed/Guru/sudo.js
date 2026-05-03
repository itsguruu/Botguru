const fs = require('fs');
const path = require('path');
const { malvin } = require('../GuruTech/malvin');

const ownerFile = path.resolve(__dirname, '../lib/sudo.json');

// Ensure sudo.json exists
const ensureOwnerFile = () => {
    if (!fs.existsSync(ownerFile)) {
        fs.writeFileSync(ownerFile, JSON.stringify([], null, 2));
    }
};

// Helper to read owner list
const readOwnerList = () => JSON.parse(fs.readFileSync(ownerFile, 'utf-8'));

// Helper to write owner list
const writeOwnerList = (list) => fs.writeFileSync(ownerFile, JSON.stringify([...new Set(list)], null, 2));

// Add temporary owner
malvin({
    pattern: 'setsudo',
    alias: ['addsudo', 'addowner', 'sudo'],
    react: '🎭',
    desc: 'add temporary owner 🤴',
    category: 'owner',
    use: '.setsudo <number|tag|reply>',
    filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
    try {
        if (!isCreator) {
            return reply('❌ owner-only command 🚫');
        }

        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const target = m.mentionedJid?.[0] ||
                      m.quoted?.sender ||
                      (args[0]?.replace(/[^0-9]/g, '') + '@s.whatsapp.net');

        if (!target) {
            return reply('❌ please provide a number, tag, or reply to a user 😔');
        }

        ensureOwnerFile();
        const owners = readOwnerList();

        if (owners.includes(target)) {
            return reply('❌ user already a temporary owner 🎭');
        }

        owners.push(target);
        writeOwnerList(owners);

        const caption = `
╭───[ *ᴀᴅᴅ ᴏᴡɴᴇʀ* ]───
├ *ᴜsᴇʀ*: ${target.replace('@s.whatsapp.net', '')} 🤴
├ *sᴛᴀᴛᴜs*: added as temporary owner 🎭
╰──────────────┈⊷
> *╰──────────────┈⊷`;

        await malvin.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/op2ca2.jpg' },
            caption,
            contextInfo: { mentionedJid: [m.sender, target] }
        }, { quoted: mek });

        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error('❌ setsudo error:', err);
        await reply(`❌ error adding owner: ${err.message || 'unknown error'} 😞`);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Remove temporary owner
malvin({
    pattern: 'delsudo',
    alias: ['delowner', 'deletesudo'],
    react: '🗑️',
    desc: 'remove temporary owner 🤴',
    category: 'owner',
    use: '.delsudo <number|tag|reply>',
    filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
    try {
        if (!isCreator) {
            return reply('❌ owner-only command 🚫');
        }

        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const target = m.mentionedJid?.[0] ||
                      m.quoted?.sender ||
                      (args[0]?.replace(/[^0-9]/g, '') + '@s.whatsapp.net');

        if (!target) {
            return reply('❌ please provide a number, tag, or reply to a user 😔');
        }

        ensureOwnerFile();
        const owners = readOwnerList();

        if (!owners.includes(target)) {
            return reply('❌ user not a temporary owner 🤷');
        }

        const updated = owners.filter(x => x !== target);
        writeOwnerList(updated);

        const caption = `
╭───[ *ʀᴇᴍᴏᴠᴇ ᴏᴡɴᴇʀ* ]───
├ *ᴜsᴇʀ*: ${target.replace('@s.whatsapp.net', '')} 🗑️
├ *sᴛᴀᴛᴜs*: removed from temporary owners ✅
╰──────────────┈⊷
> *ᴍᴀᴅᴇ ʙʏ Itsguru🇰🇪*`;

        await malvin.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/op2ca2.jpg' },
            caption,
            contextInfo: { mentionedJid: [m.sender, target] }
        }, { quoted: mek });

        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error('❌ delsudo error:', err);
        await reply(`❌ error removing owner: ${err.message || 'unknown error'} 😞`);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// List temporary owners
malvin({
    pattern: 'listsudo',
    alias: ['listowner'],
    react: '📋',
    desc: 'list temporary owners 📜',
    category: 'owner',
    use: '.listsudo',
    filename: __filename
}, async (malvin, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator) {
            return reply('❌ owner-only command 🚫');
        }

        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        ensureOwnerFile();
        const owners = readOwnerList();

        if (owners.length === 0) {
            return reply('✅ no temporary owners found 😊');
        }

        const ownerList = owners
            .map((owner, i) => `├ *${i + 1}.* ${owner.replace('@s.whatsapp.net', '')}`)
            .join('\n');

        const caption = `
╭───[ *sᴜᴅᴏ ʟɪsᴛ* ]───
├ *ᴛᴏᴛᴀʟ*: ${owners.length} owners 🤴
${ownerList}
╰──────────────┈⊷
> *ᴍᴀᴅᴇ ʙʏ Itsguru🇰🇪*`;

        await malvin.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/op2ca2.jpg' },
            caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });

        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error('❌ listsudo error:', err);
        await reply(`❌ error listing owners: ${err.message || 'unknown error'} 😞`);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});
