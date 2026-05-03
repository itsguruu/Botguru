const { malvin } = require('../GuruTech/malvin');
const { getBuffer, fetchJson } = require('../GuruTech/lib/functions');

malvin({
    pattern: "person",
    react: "👤",
    alias: ["userinfo", "profile"],
    desc: "Get complete user profile information",
    category: "utility",
    use: '.person [@tag or reply]',
    filename: __filename
},
async (malvin, mek, m, { from, sender, isGroup, reply, quoted, participants }) => {
    try {
        // 1. DETERMINE TARGET USER
        let userJid = quoted?.sender || 
                     mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                     sender;

        // 2. VERIFY USER EXISTS
        const [user] = await malvin.onWhatsApp(userJid).catch(() => []);
        if (!user?.exists) return reply("❌ User not found on WhatsApp");

        // 3. GET PROFILE PICTURE
        let ppUrl;
        try {
            ppUrl = await malvin.profilePictureUrl(userJid, 'image');
        } catch {
            ppUrl = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';
        }

        // 4. GET NAME (MULTI-SOURCE FALLBACK)
        let userName = userJid.split('@')[0];
        try {
            // Try group participant info first
            if (isGroup) {
                const member = participants.find(p => p.id === userJid);
                if (member?.notify) userName = member.notify;
            }
            
            // Try contact DB
            if (userName === userJid.split('@')[0] && malvin.contactDB) {
                const contact = await malvin.contactDB.get(userJid).catch(() => null);
                if (contact?.name) userName = contact.name;
            }
            
            // Try presence as final fallback
            if (userName === userJid.split('@')[0]) {
                const presence = await malvin.presenceSubscribe(userJid).catch(() => null);
                if (presence?.pushname) userName = presence.pushname;
            }
        } catch (e) {
            console.log("Name fetch error:", e);
        }

        // 5. GET BIO/ABOUT
        let bio = {};
        try {
            // Try personal status
            const statusData = await malvin.fetchStatus(userJid).catch(() => null);
            if (statusData?.status) {
                bio = {
                    text: statusData.status,
                    type: "Personal",
                    updated: statusData.setAt ? new Date(statusData.setAt * 1000) : null
                };
            } else {
                // Try business profile
                const businessProfile = await malvin.getBusinessProfile(userJid).catch(() => null);
                if (businessProfile?.description) {
                    bio = {
                        text: businessProfile.description,
                        type: "Business",
                        updated: null
                    };
                }
            }
        } catch (e) {
            console.log("Bio fetch error:", e);
        }

        // 6. GET GROUP ROLE
        let groupRole = "";
        if (isGroup) {
            const participant = participants.find(p => p.id === userJid);
            groupRole = participant?.admin ? "👑 Admin" : "👥 Member";
        }

        // 7. FORMAT OUTPUT WITH ENHANCED VISUALS
        const formattedBio = bio.text ? 
            `┌─ 📝 *About*\n` +
            `│  ${bio.text}\n` +
            `└─ 🏷️ ${bio.type} Bio${bio.updated ? ` | ⏳ ${bio.updated.toLocaleString()}` : ''}` : 
            "└─ ❌ No bio available";

        const accountTypeEmoji = user.isBusiness ? "💼" : user.isEnterprise ? "🏢" : "👤";
        const accountTypeText = user.isBusiness ? "Business" : user.isEnterprise ? "Enterprise" : "Personal";

        const userInfo = `
╭─❖ *USER PROFILE* ❖─
│  � *Profile Picture* 👇
├─❖ *BASIC INFO* ❖─
│  📛 *Name*: ${userName}
│  🔢 *Number*: ${userJid.replace(/@.+/, '')}
│  ${accountTypeEmoji} *Account Type*: ${accountTypeText}
├─❖ *BIOGRAPHY* ❖─
${formattedBio.includes('┌─') ? formattedBio : `│  ${formattedBio}`}
├─❖ *ACCOUNT STATUS* ❖─
│  ✅ *Registered*: ${user.isUser ? "Yes" : "No"}
│  🛡️ *Verified*: ${user.verifiedName ? "✅ Verified" : "❌ Not verified"}
${isGroup ? `│  � *Group Role*: ${groupRole}\n` : ''}
╰───────────────────
`.trim();

        // 8. SEND RESULT WITH BETTER FORMATTING
        await malvin.sendMessage(from, {
            image: { url: ppUrl },
            caption: userInfo,
            mentions: [userJid]
        }, { quoted: mek });

    } catch (e) {
        console.error("Person command error:", e);
        reply(`❌ Error: ${e.message || "Failed to fetch profile"}`);
    }
});



