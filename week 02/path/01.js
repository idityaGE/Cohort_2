import path from 'path';
import { fileURLToPath } from 'url';

/*
/project
  ├── main.js         // Main file where dynamic imports happen
  ├── modules
      ├── file1.js
      ├── file2.js
      └── file3.js
*/

// Directory path of the current file (ESM style)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Array of file names
const fileNames = ['file1.js', 'file2.js', 'file3.js'];

// Base directory where the modules are stored
const baseDir = path.join(__dirname, 'modules');

// Function to dynamically import all files in the array
async function importModules(fileNames) {
  const modules = [];

  for (const fileName of fileNames) {
    const filePath = path.join(baseDir, fileName); // Build the full path
    const module = await import(filePath);         // Dynamically import the module
    modules.push(module);                          // Store the imported module
  }

  return modules;
}

// Usage example
importModules(fileNames)
  .then(modules => {
    // `modules` is an array of the imported module contents
    modules.forEach((mod, index) => {
      console.log(`Module ${fileNames[index]}:`, mod);
    });
  })
  .catch(error => {
    console.error('Error importing modules:', error);
  });



