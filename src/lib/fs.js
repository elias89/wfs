import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import dotenv from "dotenv";

dotenv.config();

export const readDir = (currentPath) => {
  let files = [];
  try {
    const fullPath = join(process.env.HOME_PATH, currentPath)
    const items = readdirSync(fullPath, { withFileTypes: true });

    files = items.map(item => {
      const currentFilePath = join(fullPath, item.name);
      const stats = statSync(currentFilePath);

      const relativePath = item.parentPath.replace(process.env.HOME_PATH, '');
      console.log({relativePath})
      return {
        name: item.name,
        isFile: item.isFile(),
        modifiedDate: stats.mtime.toLocaleString(), // Last modified date
        creationDate: stats.birthtime.toLocaleString(), // Creation date
        path: join(relativePath, item.name),
        isHiddenFile: item.name.startsWith('.')
      }
    });
    files.sort((a,b)=> {
      // Prioritize hidden files first
      if (a.isHiddenFile && !b.isHiddenFile) return -1;
      if (!a.isHiddenFile && b.isHiddenFile) return 1;

      // Folders then files
      if (a.isFile && !b.isFile) return 1;
      if (!a.isFile && b.isFile) return -1;

      return a.name.localeCompare(b.name); // Sort alphabetically within same type
    });
  } catch (err) {
    console.error('Error reading directory:', err);
  }
  return files;
}
