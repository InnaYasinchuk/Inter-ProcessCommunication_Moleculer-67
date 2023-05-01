import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const book = "The Wind in the Willows (introductory fragment).txt";

const readStream = fs.createReadStream(path.join(__dirname, '/files', book), { highWaterMark: 1024 });
const writeStream = fs.createWriteStream(path.join(__dirname, '/files', 'book_copy.txt'));


readStream.on('data', (chunk)=>{
    writeStream.write('\n---Introductory fragment, copying is prohibited!---\n');
    writeStream.write(chunk);
   
})

const log = (text) => {
 process.stdout.write(text)
  process.stdin.on("data", answer => {
   process.stdout.write(`You entered: ${answer}` + "\n", () => process.exit())
  })}
  log("Enter any text:");


  const ask = (question) => {
  return new Promise((resolve, reject) => {
    process.stdout.write(question);
    process.stdin.once('data', (data) => {
      const answer = data.toString().trim();
      if (/^(yes|no|y|n)$/i.test(answer)) {
        resolve(answer.toLowerCase());
      } else {
        reject(new Error('Invalid response format'));
      }})})};
(async () => {
  try {
    const scss = await ask('Do you want to use SCSS ? ');
    const eslint = await ask('Do you want to use Eslint ? ');
    process.stdout.write(`Your answers are accepted`);
    process.exit();
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
})();


