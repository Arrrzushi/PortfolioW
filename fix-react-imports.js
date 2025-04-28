// Script to remove standalone React imports that aren't needed in React 19
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to process a file
function processFile(filePath) {
  // Only process TypeScript/React files
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) {
    return;
  }
  
  console.log(`Processing: ${filePath}`);
  
  let content = readFileSync(filePath, 'utf8');
  
  // Pattern to match standalone React import
  const standalonePattern = /import React from ['"]react['"];?\n/;
  
  // Pattern to match React with destructuring
  const destructuringPattern = /import React, \{([^}]+)\} from ['"]react['"];?\n/;
  
  if (standalonePattern.test(content)) {
    // Replace standalone import with nothing
    content = content.replace(standalonePattern, '');
    writeFileSync(filePath, content, 'utf8');
    console.log(`  Fixed standalone React import in ${filePath}`);
  } else if (destructuringPattern.test(content)) {
    // Replace React, { hooks } with just { hooks }
    content = content.replace(
      destructuringPattern, 
      (match, destructured) => `import { ${destructured} } from 'react';\n`
    );
    writeFileSync(filePath, content, 'utf8');
    console.log(`  Fixed destructured React import in ${filePath}`);
  }
}

// Function to walk through directories
function walkDir(dir) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules' && file !== 'dist' && !file.startsWith('.')) {
      walkDir(filePath);
    } else if (stat.isFile()) {
      processFile(filePath);
    }
  });
}

// Start processing from src directory
walkDir(join(__dirname, 'src'));
console.log('Finished processing all files!'); 