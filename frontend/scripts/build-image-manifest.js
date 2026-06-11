#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const sharp = require('sharp');
const { CLIENT_RENEG_LIMIT } = require('tls');

// Configuration
const projectRoot = path.join(__dirname, '..');
const publicImages = path.join(projectRoot, 'public', 'images');
// Logical manifest keys mapped to actual on-disk folder names and limits
const folders = {
  gallery: { dir: 'gallery', max: 24 },
  events: { dir: 'events', max: 9 },
  lunch: { dir: 'teamlunch', max: 9 },
  conferences: { dir: 'conferences', max: 9 },
  workshops: { dir: 'workshops', max: 9 },
  bts: { dir: 'behindTheScenes', max: 9 },
};
const sizes = [400, 800, 1200];

function isImageFile(p) {
  return /\.(jpe?g|png|webp|avif)$/i.test(p);
}

async function ensureGeneratedVariants(srcPath, folder, nameNoExt) {
  const genDir = path.join(publicImages, folder, 'generated');
  await fs.ensureDir(genDir);
  const entries = [];
  for (const w of sizes) {
    const outName = `${nameNoExt}-${w}.webp`;
    const outPath = path.join(genDir, outName);
    // skip if exists
    if (!(await fs.pathExists(outPath))) {
      await sharp(srcPath)
  .rotate()
  .resize({ width: w })
  .webp({ quality: 72 })
  .toFile(outPath);
    }
    entries.push(`/images/${folder}/generated/${outName} ${w}w`);
  }
  return entries;
}

async function build() {
  const manifest = {};

  for (const folder of Object.keys(folders)) {
    
    const cfg = folders[folder];
    const folderOnDisk = cfg.dir || folder;
    
    const folderPath = path.join(publicImages, folderOnDisk);
    const pattern = path.join(folderPath, '*.*');
    const files = (await fs.readdir(folderPath))
  .map(f => path.join(folderPath, f))
  .filter(f => fs.statSync(f).isFile())
  .filter(isImageFile);
    const images = [];
    console.log("folderPath =", folderPath);
console.log("pattern =", pattern);
console.log("exists =", await fs.pathExists(folderPath));
console.log("raw glob =", glob.sync(pattern));
    for (const file of files) {
      try {
        console.log("check")
        const stat = await sharp(file).metadata();
        const name = path.basename(file);
        const nameNoExt = path.basename(file, path.extname(file));
        const srcset = await ensureGeneratedVariants(file, folderOnDisk, nameNoExt);
        // prefer largest generated as main url
        const mainUrl = `/images/${folderOnDisk}/generated/${nameNoExt}-${sizes[sizes.length - 1]}.webp`;
        images.push({ name, url: mainUrl, srcset, aspect: stat.width && stat.height ? stat.width / stat.height : undefined });
      } catch (err) {
        console.warn('failed processing', file, err.message || err);
      }
    }

    // sort by name for deterministic order
    images.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    // pad with picsum placeholders if needed
    const need = Math.max(0, cfg.max - images.length);
    for (let i = 0; i < need; i++) {
      // create picsum srcset entries matching sizes
      const seed = `${folder}-placeholder-${i}`;
      const srcset = sizes.map(w => `https://picsum.photos/seed/${seed}/${w}/${Math.round(w * 0.75)} ${w}w`);
      const mainUrl = `https://picsum.photos/seed/${seed}/${sizes[sizes.length - 1]}/${Math.round(sizes[sizes.length - 1] * 0.75)}`;
      images.push({ name: `picsum-${seed}`, url: mainUrl, srcset, aspect: 4/3 });
    }

    // if there are more than max, truncate
    manifest[folder] = images.slice(0, cfg.max);
  }

  const outPath = path.join(publicImages, 'manifest.json');
  await fs.writeJson(outPath, manifest, { spaces: 2 });
  console.log('Wrote manifest to', outPath);
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
