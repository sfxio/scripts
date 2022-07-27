const fs = require('fs-extra');
const { resolve } = require('path');
const rootDir = resolve(__dirname, '..');

const targetDir = resolve(rootDir, '..');
const buildDir = resolve(rootDir, 'dist');

const targetFile = fs.readFileSync(resolve(buildDir, 'index.umd.js'), 'utf-8');
const file = resolve(targetDir, 'booking.js');
if (fs.existsSync(file)) {
  fs.removeSync(file);
}

fs.writeFileSync(file, targetFile);
console.log('done.');
