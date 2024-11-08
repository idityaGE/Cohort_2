import { join, resolve, normalize, parse, format, delimiter, sep } from 'path';

// Joining Paths
const joinedPath = join('folder1', 'folder2', 'file.txt');
console.log(joinedPath); // Output: "folder1/folder2/file.txt"

// Resolving Paths
const resolvedPath = resolve('folder1', 'folder2', 'file.txt');
console.log(resolvedPath); // Output: "/path/to/folder1/folder2/file.txt"

// Normalizing Paths
const normalizedPath = normalize('/folder1//folder2/./file.txt');
console.log(normalizedPath); // Output: "/folder1/folder2/file.txt"

const fileName = path.basename('/users/john/documents/file.txt');
console.log(fileName); // Output: 'file.txt'

const dirName = path.dirname('/users/john/documents/file.txt');
console.log(dirName); // Output: '/users/john/documents'


// Parsing and Formatting Paths
const parsedPath = parse('/folder1/folder2/file.txt');
console.log(parsedPath);
/*
Output:
{
  root: '/',
  dir: '/folder1/folder2',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/

const formattedPath = format(parsedPath);
console.log(formattedPath); // Output: "/folder1/folder2/file.txt"

// Path Delimiter and Separator
console.log(delimiter); // Output: ":"
console.log(sep); // Output: "/"