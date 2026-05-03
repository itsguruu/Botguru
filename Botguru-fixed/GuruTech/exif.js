const { tmpdir } = require('os');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const execAsync = promisify(exec);

/**
 * Writes EXIF metadata (packname, author) into a WebP sticker.
 * Used by sendFile and sendMedia in index.js.
 */
const writeExif = async (media, metadata = {}) => {
  const { packname = 'Botguru', author = 'Guru', categories = [] } = metadata;
  const tmpFile = path.join(tmpdir(), `sticker_${Date.now()}.webp`);
  const outFile = path.join(tmpdir(), `sticker_exif_${Date.now()}.webp`);

  try {
    // Write media buffer to temp file
    fs.writeFileSync(tmpFile, media.data);

    // Build EXIF JSON for sticker metadata
    const exifJson = JSON.stringify({
      'sticker-pack-id': `com.botguru.${Date.now()}`,
      'sticker-pack-name': packname,
      'sticker-pack-publisher': author,
      'emojis': categories.length > 0 ? categories : ['🤖'],
    });

    // Use node-webpmux to inject EXIF
    const { Image } = require('node-webpmux');
    const img = new Image();
    await img.load(tmpFile);
    
    const exifBuf = Buffer.from(exifJson, 'utf8');
    // Build proper EXIF chunk: EXIF header + JSON
    const exifHeader = Buffer.alloc(6);
    exifHeader.write('Exif\0\0');
    const exifData = Buffer.concat([exifHeader, exifBuf]);
    
    img.exif = exifData;
    await img.save(outFile);

    // Cleanup input tmp
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    return outFile;
  } catch (err) {
    // Fallback: return original file without exif
    if (fs.existsSync(tmpFile)) {
      return tmpFile;
    }
    throw err;
  }
};

module.exports = { writeExif };
