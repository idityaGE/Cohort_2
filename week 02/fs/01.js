// modern syntax
import fs from 'fs';

// 4. Using Promises (Modern Approach)
const fsPromises = fs.promises

async function fileOperations() {
  try {
    // Read file
    const content = await fsPromises.readFile('files/01.txt', 'utf8');
    console.log('File content:', content);

    // Write file
    await fsPromises.writeFile('files/new.txt', 'Content written with promises');
    console.log('File written successfully');

    // Append to file
    await fsPromises.appendFile('files/new.txt', '\nAppended content');
    console.log('Content appended successfully');

  } catch (error) {
    console.error('Error:', error);
  }
}
fileOperations();

const readfile = async () => {
  try {
    const res = await fs.promises.readFile('files/01.txt', 'utf8');
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}
readfile();

const writefile = async (data) => {
  try {
    await fs.promises.writeFile('files/02.txt', data);
    console.log('File written successfully!');
  } catch (error) {
    console.error(error);
  }
}
writefile('Hello World! lorem ipsum');
