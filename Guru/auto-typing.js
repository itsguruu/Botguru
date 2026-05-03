const fs = require('fs');
const path = require('path');
const config = require('../GuruTech/settings')
const {malvin , commands} = require('../GuruTech/malvin')


// Composing (Auto Typing)
malvin({
    on: "body"
},    
async (malvin, mek, m, { from, body, isOwner }) => {
    if (config.AUTO_TYPING === 'true') {
        await malvin.sendPresenceUpdate('composing', from); // send typing 
    }
});
