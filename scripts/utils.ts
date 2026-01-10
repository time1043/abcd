import fs, { readdir } from "fs/promises";
import { join } from "path";

export async function readJson(filePath: string) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`file not exists: ${filePath}`);
    return null;
  }
}

async function readDirs(dir: string) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => join(dir, e.name));
}

export async function getQtPaths(baseDir: string) {
  const qtPaths: string[] = [];

  for (const subject of await readDirs(baseDir)) {
    for (const times of await readDirs(subject)) {
      for (const qt of await readDirs(times)) {
        qtPaths.push(qt);
      }
    }
  }

  // console.log(qtPaths);
  return qtPaths;
}
