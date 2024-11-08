import fs from 'fs';
import path from 'path';


// 1. Reading All Files in a Directory
const directoryPath = path.join(__dirname, 'myFolder');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to read directory:', err);
  }

  files.forEach(file => {
    const fullPath = path.join(directoryPath, file);
    console.log(fullPath);
  });
});

// 2. Reading a File with Full Path
const filePath = path.join(__dirname, 'myFolder', 'example.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.error('Error reading file:', err);
  }
  console.log('File content:', data);
});


// 3. Writing to a File in a Specific Directory
const newFilePath = path.join(__dirname, 'myFolder', 'newFile.txt');
const content = 'Hello, this is new content!';

fs.writeFile(newFilePath, content, (err) => {
  if (err) {
    return console.error('Error writing to file:', err);
  }
  console.log('File written successfully!');
});

// 4. Checking if a Path Exists and If It’s a File or Directory
const checkPath = path.join(__dirname, 'myFolder', 'example.txt');

fs.stat(checkPath, (err, stats) => {
  if (err) {
    return console.error('Path does not exist:', err);
  }

  if (stats.isFile()) {
    console.log(`${checkPath} is a file.`);
  } else if (stats.isDirectory()) {
    console.log(`${checkPath} is a directory.`);
  }
});


// 5. Creating a Directory Dynamically
const newDirPath = path.join(__dirname, 'myNewFolder');

fs.mkdir(newDirPath, { recursive: true }, (err) => {
  if (err) {
    return console.error('Error creating directory:', err);
  }
  console.log('Directory created successfully!');
});


// 6. Deleting a File in a Directory
const fileToDelete = path.join(__dirname, 'myFolder', 'fileToDelete.txt');

fs.unlink(fileToDelete, (err) => {
  if (err) {
    return console.error('Error deleting file:', err);
  }
  console.log('File deleted successfully!');
});

// 7. Renaming or Moving a File
const oldPath = path.join(__dirname, 'myFolder', 'oldName.txt');
const newPath = path.join(__dirname, 'myFolder', 'newName.txt');

fs.rename(oldPath, newPath, (err) => {
  if (err) {
    return console.error('Error renaming file:', err);
  }
  console.log('File renamed successfully!');
});

