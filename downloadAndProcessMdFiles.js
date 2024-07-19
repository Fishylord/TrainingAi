import { exec } from 'child_process';
import path from 'path';
import fsExtra from 'fs-extra';

const { rmSync, existsSync, readdirSync, statSync, readFileSync, writeFileSync } = fsExtra;

const repoUrl = 'https://github.com/SalesConnection/Sales-Connection-Support.git';
const localPath = './Sales-Connection-Support';

function downloadRepo() {
  if (existsSync(localPath)) {
    rmSync(localPath, { recursive: true, force: true });
  }
  exec(`git clone ${repoUrl} ${localPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error cloning repo: ${error}`);
      return;
    }
    console.log('Repository downloaded');
    processMdFiles();
  });
}

function processMdFiles() {
  const docsPath = path.join(localPath, 'docs');
  const mdFiles = getMdFiles(docsPath);

  let combinedContent = '';

  mdFiles.forEach((file, index) => {
    const content = readFileSync(file, 'utf8');
    const filteredContent = filterContent(content);
    combinedContent += filteredContent;
    if (index < mdFiles.length - 1) {
      combinedContent += ' ~ ';
    }
  });

  writeFileSync('combined.txt', combinedContent);
  console.log('Markdown files processed and combined into combined.txt.');
}

function getMdFiles(dir) {
  const files = readdirSync(dir);
  let mdFiles = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (statSync(filePath).isDirectory()) {
      mdFiles = mdFiles.concat(getMdFiles(filePath));
    } else if (path.extname(file) === '.md') {
      mdFiles.push(filePath);
    }
  });

  return mdFiles;
}

function filterContent(content) {
  return content.replace(/<p[^>]*>.*?<\/p>/g, '');
}

downloadRepo();
