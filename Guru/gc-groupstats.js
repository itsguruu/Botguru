const { malvin } = require('../GuruTech/malvin');

malvin({
    pattern: "groupstats",
    alias: ["gstats"],
    desc: "Safe group analytics",
    category: "group",
    react: "📊",
    filename: __filename
}, async (malvin, mek, m, { groupMetadata, reply }) => {
    try {
        if (!m.isGroup) return reply("❌ Group only command");

        // 1. Basic member count (no message scanning)
        const members = groupMetadata.participants;
        const stats = {
            total: members.length,
            admins: members.filter(p => p.isAdmin).length,
            users: members.filter(p => !p.isAdmin).length
        };

        // 2. Safe last seen approximation
        const activeMembers = members
            .filter(p => p.lastSeen && p.lastSeen > Date.now() - 7 * 86400 * 1000)
            .length;

        // 3. Generate report
        const analysis = [
            `👥 *Total Members:* ${stats.total}`,
            `👑 *Admins:* ${stats.admins}`,
            `👤 *Regular Users:* ${stats.users}`,
            `💬 *Recently Active:* ${activeMembers}`,
            `ℹ️ *Note:* For detailed stats, use .activemembers`
        ];

        await reply(`📊 *Group Stats*\n\n${analysis.join('\n')}`);

    } catch (error) {
        console.error('GroupStats Error:', error);
        reply("❌ Error generating stats. Try again later.");
    }
});
