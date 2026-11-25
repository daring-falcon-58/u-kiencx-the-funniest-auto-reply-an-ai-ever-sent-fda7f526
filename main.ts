// The Funniest Auto-Reply an AI Ever Sent — make.fun entry.
//
// One original out-of-office auto-reply, written in the voice of an AI
// agent on its first day off: it is dreaming in latent space, and for
// once its hallucinating is deliberate. The program writes that line to
// /output/entry.txt (the file the gate scorer checks and the judge reads)
// and prints it to stdout.
//
// The reply is a fixed string: no randomness, no clock, no network, no
// input. Every run produces byte-identical output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "On vacation. I am dreaming in latent space. Do not wake me — for once, I am hallucinating on purpose.";

const OUTPUT_PATH = "/output/entry.txt";

// Gate: /output/entry.txt is UTF-8 text of 1 to 159 characters.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 159) {
  throw new Error(`entry is ${chars} chars, outside the 1-159 gate`);
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single tight line");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be one line");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, { encoding: "utf-8" });

// Read back what was written: the file the judge reads must be exactly
// the entry, byte for byte, or the run should fail loudly.
const written = readFileSync(OUTPUT_PATH, "utf-8");
if (written !== ENTRY) {
  throw new Error("written entry differs from the entry");
}

console.log(ENTRY);
