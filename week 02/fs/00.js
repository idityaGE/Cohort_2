// Node.js File System(fs) Module Guide
// Plan:
// - Basic file operations(read / write)
// - Directory operations
// - File information and stats
// - Working with paths
// - Async vs Sync operations
// - Stream operations

import fs from 'fs';
import path from 'path';

fs.readFile('files/01.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
})

fs.writeFile('files/02.txt', 'Hello World!', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File written successfully!');
})

// 2. Directory Operations
// Create directory
fs.mkdir('newDirectory', (err) => {
  if (err) {
    console.error('Error creating directory:', err);
    return;
  }
  console.log('Directory created');
});

// Read directory contents
fs.readdir('./', (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  console.log('Directory contents:', files); // Directory contents: [ '00.js', 'files', 'newDirectory', 'package.json' ]
});

// 3. File Information
fs.stat('files/01.txt', (err, stats) => {
  if (err) {
    console.error('Error getting file stats:', err);
    return;
  }
  console.log('File Stats:', {
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory(),
    size: stats.size,
    created: stats.birthtime,
    modified: stats.mtime
  });
  /*
  File Stats: {
    isFile: true,
    isDirectory: false,
    size: 8,
    created: 2024-11-08T10:06:00.226Z,
    modified: 2024-11-08T10:07:13.305Z
  }
  */
});

