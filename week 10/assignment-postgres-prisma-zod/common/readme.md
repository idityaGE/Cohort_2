### This is just a simple input validation package using zod and tupescript which is used to validate the input data in both frontend and backend.

> Warning about typescript 

> don't push `.ts` file to npm, only push the `.js` file to npm

> to declare the type of the package, make changes in `tsconfig.json` file --> `"declaration": true` and run `tsc` command to generate the `.d.ts` file


## Installation
```bash
npm install @idityage/input-validation
```

### How to push to npm
```bash
npm login
npm publish --access public
```

### How to update the package
- Update the version in the package.json file
- Run the following commands
```bash
npm version patch
npm publish --access public
```