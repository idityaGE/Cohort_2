import path from 'path';
import fs from 'fs'

// 5. Working with Streams
// Read Stream
const readStream = fs.createReadStream('files/output.txt');
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString()); // chunk is a buffer object (binary data) to convert to string: chunk.toString()
});
readStream.on('error', (err) => {
  console.error('Read stream error:', err);
});

// Watch for changes in the file and read the new data
fs.watch('files/output.txt', (eventType, filename) => {
  if (eventType === 'change') {
    const newReadStream = fs.createReadStream('files/output.txt');
    newReadStream.on('data', (chunk) => {
      console.log('New chunk received:', chunk.toString());
    });
    newReadStream.on('error', (err) => {
      console.error('New read stream error:', err);
    });
  }
});


// Write Stream
const writeStream = fs.createWriteStream('files/output.txt');
writeStream.write('Writing data to stream\n');
writeStream.write('More data\n');
writeStream.end();

// 6. Path Operations with fs
// const filePath = path.join(__dirname, 'example.txt');
// fs.access(filePath, fs.constants.F_OK, (err) => {
//   console.log(`${filePath} ${err ? 'does not exist' : 'exists'}`);
// });

// 7. Watch File/Directory Changes
// fs.watch('example.txt', (eventType, filename) => {
//   console.log(`File ${filename} had event: ${eventType}`);
// });

// 8. Recursive Directory Creation
fs.mkdir('parent/child/grandchild', { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating nested directories:', err);
    return;
  }
  console.log('Nested directories created');
});

// 9. Copy File
fs.copyFile('files/01.txt', 'newDirectory/destination.txt', (err) => {
  if (err) {
    console.error('Error copying file:', err);
    return;
  }
  console.log('File copied successfully');
});

// 10. Error Handling Example
try {
  // Synchronous operations for simple examples
  fs.writeFileSync('test.txt', 'Hello');
  fs.unlinkSync('test.txt'); // Delete file
} catch (error) {
  console.error('Error in file operations:', error);
}
