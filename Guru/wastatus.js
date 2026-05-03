const { malvin } = require("../GuruTech/malvin");
const { downloadContentFromMessage, getContentType } = require("@whiskeysockets/baileys");

malvin({
  pattern: "post",
  alias: ["poststatus", "status", "story", "repost", "reshare"],
  react: "📝",
  desc: "Post replied media to bot's WhatsApp status",
  category: "owner",
  filename: __filename
}, async (malvin, mek, m, { isOwner, reply }) => {
  try {
    if (!isOwner) return reply("🚫 *Owner-only command.*");

    const quoted = m.quoted || m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.message) {
      return reply("⚠️ *Please reply to an image, video, or audio message to post to status.*");
    }

    const msg = quoted.message || quoted;
    const type = getContentType(msg);
    const mediaMsg = msg[type];

    if (!["imageMessage", "videoMessage", "audioMessage"].includes(type)) {
      return reply("❌ *Unsupported media. Reply to image, video, or audio only.*");
    }

    // Download content
    const stream = await downloadContentFromMessage(mediaMsg, type.replace("Message", "").toLowerCase());
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    // Caption fallback
    const caption = mediaMsg?.caption || '';

    // Compose message
    const content =
      type === "imageMessage"
        ? { image: buffer, caption }
        : type === "videoMessage"
        ? { video: buffer, caption }
        : { audio: buffer, mimetype: "audio/mp4", ptt: mediaMsg?.ptt || false };

    // Send to status
    await malvin.sendMessage("status@broadcast", content);
    reply("✅ *Status posted successfully!*");

  } catch (e) {
    console.error("❌ Error in .post command:", e);
    reply(`❗ Error posting status:\n${e.message}`);
  }
});
