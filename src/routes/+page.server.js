import { readDir } from '$lib/fs.js';
import { join } from 'path';
import dotenv from "dotenv";

dotenv.config();

export async function load({ params, url }) {
  const dir = url.searchParams.get('goto') || '';
  const files = readDir(dir);

  return {files}
}
