import { writeFileSync, mkdirSync } from "node:fs";

const sampleRate = 44100;
const seconds = 3;
const numSamples = sampleRate * seconds;
const dataSize = numSamples * 2; // 16-bit mono
const buffer = Buffer.alloc(44 + dataSize);

buffer.write("RIFF", 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(1, 22); // mono
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28);
buffer.writeUInt16LE(2, 32);
buffer.writeUInt16LE(16, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(dataSize, 40);

// very soft sine tone so the toggle is audible but gentle
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const amp = Math.sin(2 * Math.PI * 220 * t) * 0.06 * 32767;
  buffer.writeInt16LE(Math.round(amp), 44 + i * 2);
}

mkdirSync("public/audio", { recursive: true });
writeFileSync("public/audio/bgm-placeholder.wav", buffer);
console.log("wrote placeholder audio");
