import { DefaultService } from "./generated";

async function main() {
  const res = await DefaultService.getUsers("1");
  console.log(res);
}

main().catch(console.error);


// command: npx esbuild index.ts --bundle --platform=node --outfile=index.js
// command: node index.js