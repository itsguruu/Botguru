
const { malvin } = require('../GuruTech/malvin');
const config = require('../GuruTech/settings');


malvin({
    pattern: "getpp",
    alias: ["stealpp"],
    react: "🖼️",
    desc: "Sends the profile picture of a user by phone number (owner only)",
    category: "owner",
    use: ".getpp <phone number>",
    filename: __filename
},
async (malvin, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the user is the bot owner
        if (!isOwner) return reply("🛑 This command is only for the bot owner!");

        // Check if a phone number is provided
        if (!args[0]) return reply("🔥 Please provide a phone number (e.g., .getpp 1234567890)");

        // Format the phone number to JID
        let targetJid = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

        // Get the profile picture URL
        let ppUrl;
        try {
            ppUrl = await malvin.profilePictureUrl(targetJid, "image");
        } catch (e) {
            return reply("🖼️ This user has no profile picture or it cannot be accessed!");
        }

        // Get the user's name or number for the caption
        let userName = targetJid.split("@")[0]; // Default to phone number
        try {
            const contact = await malvin.getContact(targetJid);
            userName = contact.notify || contact.vname || userName;
        } catch {
            // Fallback to phone number if contact info is unavailable
        }

        // Send the profile picture
        await malvin.sendMessage(from, { 
            image: { url: ppUrl }, 
            caption: `📌 Profile picture of ${userName}` 
        });

        // Send a reaction to the command message
        await malvin.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        // Reply with a generic error message and log the error
        reply("🛑 An error occurred while fetching the profile picture! Please try again later.");
        l(e); // Log the error for debugging
    }
});
