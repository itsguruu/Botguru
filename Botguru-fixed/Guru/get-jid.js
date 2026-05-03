const { malvin } = require('../GuruTech/malvin');

malvin({
    pattern: "jid",
    alias: ["id", "chatid", "gjid"],
    desc: "Get full JID of current chat/user (Creator Only)",
    react: "🆔",
    category: "owner",
    filename: __filename,
}, async (malvin, mek, m, {
    from, isGroup, isCreator, reply, sender
}) => {
    try {
        if (!isCreator) return reply("❌ *Access Denied:* Only the bot owner can use this command.");

        const jid = isGroup
            ? from.endsWith("@g.us") ? from : `${from}@g.us`
            : sender.endsWith("@s.whatsapp.net") ? sender : `${sender}@s.whatsapp.net`;

        const label = isGroup ? "👥 *Group JID:*" : "👤 *User JID:*";

        return reply(`${label}\n\`\`\`${jid}\`\`\``);

    } catch (err) {
        console.error("JID Command Error:", err);
        return reply(`⚠️ *Error:* ${err.message}`);
    }
});
