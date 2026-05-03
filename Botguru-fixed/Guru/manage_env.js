//---------------------------------------------------------------------------
//           MALVIN-XD 
//---------------------------------------------------------------------------
//  ⚠️ DO NOT MODIFY THIS FILE ⚠️  
//--------------------------------------------------------------;
const { setPrefix } = require('../GuruTech/lib/prefix');
//---------------------------------------------------------------------------
//           KHAN-MD  
//---------------------------------------------------------------------------
//  ⚠️ DO NOT MODIFY THIS FILE ⚠️  
//---------------------------------------------------------------------------
const { malvin, commands } = require('../GuruTech/malvin');
const config = require('../GuruTech/settings');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../GuruTech/lib/functions');
const { writeFileSync } = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const axios = require('axios');
const FormData = require('form-data');
const { setConfig, getConfig } = require("../GuruTech/lib/configdb");

// Placeholder for soft reload function (implement based on your bot's needs)
async function reloadConfig() {
  // Reinitialize command listeners, event handlers, or other components if needed
  // Example: Reload command parser with new prefix or reapply config changes
  console.log("Configuration reloaded without restart.");
}

// SET BOT IMAGE
malvin({
  pattern: "setbotimage",
  alias: ["botdp", "botpic", "botimage"],
  desc: "Set the bot's image URL",
  category: "owner",
  react: "✅",
  filename: __filename
}, async (malvin, mek, m, { args, isCreator, reply }) => {
  try {
    if (!isCreator) return reply("❗ Only the bot owner can use this command.");

    let imageUrl = args[0];

    // Upload image if replying to one
    if (!imageUrl && m.quoted) {
      const quotedMsg = m.quoted;
      const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
      if (!mimeType.startsWith("image")) return reply("❌ Please reply to an image.");

      const mediaBuffer = await quotedMsg.download();
      const extension = mimeType.includes("jpeg") ? ".jpg" : ".png";
      const tempFilePath = path.join(os.tmpdir(), `botimg_${Date.now()}${extension}`);
      fs.writeFileSync(tempFilePath, mediaBuffer);

      const form = new FormData();
      form.append("fileToUpload", fs.createReadStream(tempFilePath), `botimage${extension}`);
      form.append("reqtype", "fileupload");

      const response = await axios.post("https://catbox.moe/user/api.php", form, {
        headers: form.getHeaders()
      });

      fs.unlinkSync(tempFilePath);

      if (typeof response.data !== 'string' || !response.data.startsWith('https://')) {
        throw new Error(`Catbox upload failed: ${response.data}`);
      }

      imageUrl = response.data;
    }

    if (!imageUrl || !imageUrl.startsWith("http")) {
      return reply("❌ Provide a valid image URL or reply to an image.");
    }

    // Update config
    await setConfig("MENU_IMAGE_URL", imageUrl);
    config.MENU_IMAGE_URL = imageUrl;

    await reply(`✅ Bot image updated.\n\n*New URL:* ${imageUrl}`);
  } catch (err) {
    console.error(err);
    reply(`❌ Error: ${err.message || err}`);
  }
});

// SET BOT NAME
malvin({
  pattern: "setbotname",
  alias: ["botname"],
  desc: "Set the bot's name",
  category: "owner",
  react: "✅",
  filename: __filename
}, async (malvin, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply("❗ Only the bot owner can use this command.");
  const newName = args.join(" ").trim();
  if (!newName) return reply("❌ Provide a bot name.");

  // Update config
  await setConfig("BOT_NAME", newName);
  config.BOT_NAME = newName;

  await reply(`✅ Bot name updated to: *${newName}*`);
});

// SET OWNER NAME
malvin({
  pattern: "setownername",
  alias: ["ownername"],
  desc: "Set the owner's name",
  category: "owner",
  react: "✅",
  filename: __filename
}, async (malvin, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply("❗ Only the bot owner can use this command.");
  const name = args.join(" ").trim();
  if (!name) return reply("❌ Provide an owner name.");

  // Update config
  await setConfig("OWNER_NAME", name);
  config.OWNER_NAME = name;

  await reply(`✅ Owner name updated to: *${name}*`);
});

// WELCOME
malvin({
  pattern: "welcome",
  alias: ["setwelcome"],
  react: "✅",
  desc: "Enable or disable welcome messages for new members",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.WELCOME = "true";
    await setConfig("WELCOME", "true");
    return reply("✅ Welcome messages are now enabled.");
  } else if (status === "off") {
    config.WELCOME = "false";
    await setConfig("WELCOME", "false");
    return reply("❌ Welcome messages are now disabled.");
  } else {
    return reply(`Example: .welcome on`);
  }
});

// GOODBYE
malvin({
  pattern: "goodbye",
  alias: ["setgoodbye"],
  react: "✅",
  desc: "Enable or disable goodbye messages for leaving members",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.GOODBYE = "true";
    await setConfig("GOODBYE", "true");
    return reply("✅ Goodbye messages are now enabled.");
  } else if (status === "off") {
    config.GOODBYE = "false";
    await setConfig("GOODBYE", "false");
    return reply("❌ Goodbye messages are now disabled.");
  } else {
    return reply(`Example: .goodbye on`);
  }
});

// MODE
malvin({
  pattern: "mode",
  alias: ["setmode", "mod"],
  react: "✅",
  desc: "Set bot mode to private or public.",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 Only the owner can use this command!*");

  const currentMode = await getConfig("MODE") || "public";

  if (!args[0]) {
    return reply(`📌 Current mode: *${currentMode}*\n\nUsage: .mode private OR .mode public`);
  }

  const modeArg = args[0].toLowerCase();

  if (["private", "public"].includes(modeArg)) {
    await setConfig("MODE", modeArg);
    config.MODE = modeArg;
    await reply(`✅ Bot mode is now set to *${modeArg.toUpperCase()}*.`);
    await reloadConfig(); // Soft reload for command listeners if needed
  } else {
    return reply("❌ Invalid mode. Please use `.mode private` or `.mode public`.");
  }
});

// ANTI-CALL
malvin({
  pattern: "anti-call",
  react: "🫟",
  alias: ["anticall"],
  desc: "Enable or disable anti-call feature",
  category: "owner",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.ANTI_CALL = "true";
    await setConfig("ANTI_CALL", "true");
    return reply("*✅ αɴтι-¢αℓℓ нαѕ вєєɴ єɴαвℓє∂*");
  } else if (status === "off") {
    config.ANTI_CALL = "false";
    await setConfig("ANTI_CALL", "false");
    return reply("*❌ αɴтι-¢αℓℓ нαѕ вєєɴ ∂ιѕαвℓє∂*");
  } else {
    return reply(`*🏷️ єχαмρℓє: αɴтι-¢αℓℓ σɴ/σff*`);
  }
});

// AUTO-TYPING
malvin({
  pattern: "autotyping",
  alias: ["auto-typing", "typing"],
  react: "🫟",
  desc: "Enable or disable auto-typing feature.",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (!["on", "off"].includes(status)) {
    return reply("*🫟 ᴇxᴀᴍᴘʟᴇ:  .ᴀᴜᴛᴏᴛʏᴘɪɴɢ ᴏɴ*");
  }

  config.AUTO_TYPING = status === "on" ? "true" : "false";
  await setConfig("AUTO_TYPING", status === "on" ? "true" : "false");
  return reply(`Auto typing has been turned ${status}.`);
});

// ALWAYS ONLINE
malvin({
  pattern: "alwaysonline",
  alias: ["online", "always-online"],
  react: "🫟",
  desc: "Enable or disable always online feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.ALWAYS_ONLINE = "true";
    await setConfig("ALWAYS_ONLINE", "true");
    return reply("Always online feature is now enabled.");
  } else if (status === "off") {
    config.ALWAYS_ONLINE = "false";
    await setConfig("ALWAYS_ONLINE", "false");
    return reply("Always online feature is now disabled.");
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .alwaysonline on*`);
  }
});

// AUTO RECORDING
malvin({
  pattern: "autorecoding",
  alias: ["recoding", "auto-recoding"],
  react: "🫟",
  desc: "Enable or disable auto-recording feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.AUTO_RECORDING = "true";
    await setConfig("AUTO_RECORDING", "true");
    return reply("Auto recording is now enabled.");
  } else if (status === "off") {
    config.AUTO_RECORDING = "false";
    await setConfig("AUTO_RECORDING", "false");
    return reply("Auto recording is now disabled.");
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .autorecoding on*`);
  }
});

// AUTO STATUS REACT
malvin({
  pattern: "autostatusreact",
  alias: ["status-react", "statusreact", "sreact"],
  react: "🫟",
  desc: "Enable or disable auto-reacting to statuses",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.AUTO_STATUS_REACT = "true";
    await setConfig("AUTO_STATUS_REACT", "true");
    return reply("Autoreact of statuses is now enabled.");
  } else if (status === "off") {
    config.AUTO_STATUS_REACT = "false";
    await setConfig("AUTO_STATUS_REACT", "false");
    return reply("Autoreact of statuses is now disabled.");
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .autostatusreact on*`);
  }
});

// AUTO STATUS VIEW
malvin({
  pattern: "autostatusview",
  alias: ["status-view", "sview", "statusview"],
  desc: "Enable or disable auto-viewing of statuses",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.AUTO_STATUS_SEEN = "true";
    await setConfig("AUTO_STATUS_SEEN", "true");
    return reply("Autoview of statuses is now enabled.");
  } else if (status === "off") {
    config.AUTO_STATUS_SEEN = "false";
    await setConfig("AUTO_STATUS_SEEN", "false");
    return reply("Autoview of statuses is now disabled.");
  } else {
    return reply(`Example: .autostatusview on`);
  }
});

// READ MESSAGE
malvin({
  pattern: "read-message",
  alias: ["autoread"],
  desc: "Enable or disable read message feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.READ_MESSAGE = "true";
    await setConfig("READ_MESSAGE", "true");
    return reply("Read message feature is now enabled.");
  } else if (status === "off") {
    config.READ_MESSAGE = "false";
    await setConfig("READ_MESSAGE", "false");
    return reply("Read message feature is now disabled.");
  } else {
    return reply(`_example:  .read-message on_`);
  }
});

// ANTI-BAD
malvin({
  pattern: "antibad",
  alias: ["anti-bad", "antibadword"],
  react: "🫟",
  desc: "Enable or disable anti-bad word feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.ANTI_BAD_WORD = "true";
    await setConfig("ANTI_BAD_WORD", "true");
    return reply("*Anti bad word is now enabled.*");
  } else if (status === "off") {
    config.ANTI_BAD_WORD = "false";
    await setConfig("ANTI_BAD_WORD", "false");
    return reply("*Anti bad word feature is now disabled*");
  } else {
    return reply(`_example:  .antibad on_`);
  }
});

// AUTO-STICKER
malvin({
  pattern: "autosticker",
  alias: ["auto-sticker"],
  react: "🫟",
  desc: "Enable or disable auto-sticker feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.AUTO_STICKER = "true";
    await setConfig("AUTO_STICKER", "true");
    return reply("Auto-sticker feature is now enabled.");
  } else if (status === "off") {
    config.AUTO_STICKER = "false";
    await setConfig("AUTO_STICKER", "false");
    return reply("Auto-sticker feature is now disabled.");
  } else {
    return reply(`_example:  .autosticker on_`);
  }
});

// AUTO-REPLY
malvin({
  pattern: "autoreply",
  alias: ["auto-reply"],
  react: "🫟",
  desc: "Enable or disable auto-reply feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.AUTO_REPLY = "true";
    await setConfig("AUTO_REPLY", "true");
    return reply("*Auto-reply is now enabled.*");
  } else if (status === "off") {
    config.AUTO_REPLY = "false";
    await setConfig("AUTO_REPLY", "false");
    return reply("Auto-reply feature is now disabled.");
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ᴀᴜᴛᴏʀᴇᴘʟʏ ᴏɴ*`);
  }
});

// AUTO-REACT
malvin({
  pattern: "autoreact",
  alias: ["auto-react"],
  react: "🫟",
  desc: "Enable or disable the autoreact feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.AUTO_REACT = "true";
    await setConfig("AUTO_REACT", "true");
    await reply("Autoreact feature is now enabled.");
  } else if (status === "off") {
    config.AUTO_REACT = "false";
    await setConfig("AUTO_REACT", "false");
    await reply("Autoreact feature is now disabled.");
  } else {
    await reply(`*🔥 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏʀᴇᴀᴄᴛ ᴏɴ*`);
  }
});

// AUTO STATUS REPLY
malvin({
  pattern: "autostatusreply",
  react: "🫟",
  alias: ["statusreply", "status-reply"],
  desc: "Enable or disable status-reply feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.AUTO_STATUS_REPLY = "true";
    await setConfig("AUTO_STATUS_REPLY", "true");
    return reply("Status-reply feature is now enabled.");
  } else if (status === "off") {
    config.AUTO_STATUS_REPLY = "false";
    await setConfig("AUTO_STATUS_REPLY", "false");
    return reply("Status-reply feature is now disabled.");
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .sᴛᴀᴛᴜsʀᴇᴘʟʏ ᴏɴ*`);
  }
});

// ANTI-BOT
malvin({
  pattern: "antibot",
  react: "🫟",
  alias: ["anti-bot"],
  desc: "Enable or disable anti-bot feature in groups",
  category: "group",
  react: "🚫",
  filename: __filename
}, async (malvin, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply('This command can only be used in a group.');
    if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
    if (!isAdmins) return reply('You must be an admin to use this command.');

    if (args[0] === "on") {
      config.ANTI_BOT = "true";
      await setConfig("ANTI_BOT", "true");
      await reply("ANTI_BOT feature is now enabled in this group.");
    } else if (args[0] === "off") {
      config.ANTI_BOT = "false";
      await setConfig("ANTI_BOT", "false");
      await reply("ANTI_BOT feature is now disabled in this group.");
    } else {
      await reply(`*Invalid input! Use either 'on' or 'off'. Example: .antibot on*`);
    }
  } catch (error) {
    return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${error.message}`);
  }
});

// ANTI-LINK
malvin({
  pattern: "antilink",
  react: "🫟",
  alias: ["anti-link"],
  desc: "Enable or disable anti-link feature in groups",
  category: "group",
  react: "🚫",
  filename: __filename
}, async (malvin, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply('This command can only be used in a group.');
    if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
    if (!isAdmins) return reply('You must be an admin to use this command.');

    if (args[0] === "on") {
      config.ANTI_LINK = "true";
      await setConfig("ANTI_LINK", "true");
      await reply("Anti-link feature is now enabled in this group.");
    } else if (args[0] === "off") {
      config.ANTI_LINK = "false";
      await setConfig("ANTI_LINK", "false");
      await reply("Anti-link feature is now disabled in this group.");
    } else {
      await reply(`*Invalid input! Use either 'on' or 'off'. Example: .antilink on*`);
    }
  } catch (error) {
    return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${error.message}`);
  }
});

// MENTION REPLY
malvin({
  pattern: "mention-reply",
  alias: ["mentionreply", "mee"],
  desc: "Enable or disable mention reply feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.MENTION_REPLY = "true";
    await setConfig("MENTION_REPLY", "true");
    return reply("Mention Reply feature is now enabled.");
  } else if (status === "off") {
    config.MENTION_REPLY = "false";
    await setConfig("MENTION_REPLY", "false");
    return reply("Mention Reply feature is now disabled.");
  } else {
    return reply(`_example:  .mee on_`);
  }
});

// ADMIN EVENTS
malvin({
  pattern: "admin-events",
  alias: ["adminevents", "adminaction"],
  desc: "Enable or disable admin event notifications",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.ADMIN_ACTION = "true";
    await setConfig("ADMIN_ACTION", "true");
    return reply("✅ Admin event notifications are now enabled.");
  } else if (status === "off") {
    config.ADMIN_ACTION = "false";
    await setConfig("ADMIN_ACTION", "false");
    return reply("❌ Admin event notifications are now disabled.");
  } else {
    return reply(`Example: .admin-events on`);
  }
});

// OWNER REACT
malvin({
  pattern: "ownerreact",
  alias: ["owner-react", "selfreact", "self-react"],
  react: "👑",
  desc: "Enable or disable the owner react feature",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.OWNER_REACT = "true";
    await setConfig("OWNER_REACT", "true");
    await reply("Owner react feature is now enabled.");
  } else if (status === "off") {
    config.OWNER_REACT = "false";
    await setConfig("OWNER_REACT", "false");
    await reply("Owner react feature is now disabled.");
  } else {
    await reply(`*🔥 ᴇxᴀᴍᴘʟᴇ: .ᴏᴡɴᴇʀʀᴇᴀᴄᴛ ᴏɴ*`);
  }
});

// DELETE LINKS
malvin({
  pattern: "deletelink",
  alias: ["delete-links"],
  desc: "Enable or disable DELETE_LINKS in groups",
  category: "group",
  react: "❌",
  filename: __filename
}, async (malvin, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  try {
    if (!isGroup) return reply('This command can only be used in a group.');
    if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
    if (!isAdmins) return reply('You must be an admin to use this command.');

    if (args[0] === "on") {
      config.DELETE_LINKS = "true";
      await setConfig("DELETE_LINKS", "true");
      reply("✅ DELETE_LINKS is now enabled.");
    } else if (args[0] === "off") {
      config.DELETE_LINKS = "false";
      await setConfig("DELETE_LINKS", "false");
      reply("❌ DELETE_LINKS is now disabled.");
    } else {
      reply("Usage: *.deletelink on/off*");
    }
  } catch (e) {
    reply(`Error: ${e.message}`);
  }
});

// CUSTOM REACT
malvin({
  pattern: "customreact",
  alias: ["creact", "reactc"],
  react: "😎",
  desc: "Enable or disable custom reactions",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const status = args[0]?.toLowerCase();
  if (status === "on") {
    config.CUSTOM_REACT = "true";
    await setConfig("CUSTOM_REACT", "true");
    return reply("✅ Custom reactions are now enabled.");
  } else if (status === "off") {
    config.CUSTOM_REACT = "false";
    await setConfig("CUSTOM_REACT", "false");
    return reply("❌ Custom reactions are now disabled.");
  } else {
    return reply(`Example: .customreact on`);
  }
});

// SET CUSTOM REACTION EMOJIS
malvin({
  pattern: "setreacts",
  alias: ["customemojis", "emojis", "cemojis"],
  desc: "Set custom reaction emojis for the bot",
  category: "owner",
  react: "🌈",
  filename: __filename
}, async (malvin, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply("❗ Only the bot owner can use this command.");

  const emojiList = args.join(" ").trim();
  if (!emojiList) return reply("❌ Please provide a comma-separated list of emojis.\n\nExample:\n.setreactemoji 💖,💗,💘,💕");

  // Update config
  await setConfig("CUSTOM_REACT_EMOJIS", emojiList);
  config.CUSTOM_REACT_EMOJIS = emojiList;

  await reply(`✅ Custom reaction emojis updated to:\n${emojiList}`);
});

// SET PREFIX
malvin({
  pattern: "setprefix",
  alias: ["prefix"],
  react: "🪄",
  desc: "Change the bot's command prefix.",
  category: "settings",
  filename: __filename
}, async (malvin, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

  const newPrefix = args[0];
  if (!newPrefix) return reply("*❌ ᴘʀᴏᴠɪᴅᴇ ɴᴇᴡ ᴘʀᴇғɪx. ᴇxᴀᴍᴘʟᴇ: .sᴇᴛᴘʀᴇғɪx !*");

  setPrefix(newPrefix);
  config.PREFIX = newPrefix;
  await setConfig("PREFIX", newPrefix);
  await reloadConfig(); // Soft reload for command listeners

  return reply(`*✅ ᴘʀᴇғɪx ᴜᴘᴅᴀᴛᴇᴅ ᴛᴏ: ${newPrefix}*`);
});

// Malvin Kings Code