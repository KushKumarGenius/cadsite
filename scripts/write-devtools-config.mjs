import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), ".next", "cache");
const file = path.join(dir, "next-devtools-config.json");

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(
  file,
  JSON.stringify({ disableDevIndicator: true }, null, 2),
  "utf8",
);
