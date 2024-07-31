import path from 'path';
import fsExtra from 'fs-extra';
import { Octokit } from "@octokit/rest";
import { config } from "dotenv";
const { rmSync, existsSync, writeFileSync } = fsExtra;
config();
const repoOwner = 'SalesConnection';
const repoName = 'Sales-Connection-Support';
const localPath = './Sales-Connection-Support';

// Replace 'YOUR_GITHUB_TOKEN' with your actual Personal Access Token
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function downloadMdFiles() {
  if (existsSync(localPath)) {
    rmSync(localPath, { recursive: true, force: true });
  }
  
  try {
    const { data: tree } = await octokit.git.getTree({
      owner: repoOwner,
      repo: repoName,
      tree_sha: 'main',
      recursive: 'true'
    });

    const mdFiles = tree.tree.filter(file => file.path.startsWith('docs/') && file.path.endsWith('.md'));

    let combinedContent = '';

    for (const file of mdFiles) {
      const { data } = await octokit.git.getBlob({
        owner: repoOwner,
        repo: repoName,
        file_sha: file.sha
      });

      const content = Buffer.from(data.content, 'base64').toString();
      const filteredContent = filterContent(content);
      combinedContent += filteredContent + ' ~ ';

      const filePath = path.join(localPath, file.path);
      await fsExtra.outputFile(filePath, content);
    }

    // Remove the last ' ~ '
    combinedContent = combinedContent.slice(0, -3);

    writeFileSync('combined.txt', combinedContent);
    console.log('Markdown files downloaded and combined into combined.txt.');
  } catch (error) {
    console.error('Error downloading or processing files:', error);
  }
}

function filterContent(content) {
  return content.replace(/<p[^>]*>.*?<\/p>/g, '');
}

downloadMdFiles();