import Ajv from "ajv";
import fs from "fs";
import path from "path";

const ajv = new Ajv();
const schema = JSON.parse(fs.readFileSync("schemas/token-schema.json", "utf-8"));
const dataFiles = fs.readdirSync("tokens").filter(file => file.endsWith(".json"));

dataFiles.forEach(file => {
  const data = JSON.parse(fs.readFileSync(path.join("tokens", file), "utf-8"));
  const validate = ajv.compile(schema);
  if (validate(data)) {
    console.log(`${file} is valid.`);
  } else {
    console.error(`${file} is invalid:`, validate.errors);
  }
});