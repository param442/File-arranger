const fs = require("fs").promises;
const path = require("path");

async function readFilesInDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const extWithDot = path.extname(file);
      const ext = extWithDot.slice(1);
      const folderPath = path.join(directoryPath, ext);

      try {
        await fs.mkdir(folderPath);
      } catch (mkdirError) {
        if (mkdirError.code !== "EEXIST") {
          console.error(`Error creating folder ${folderPath}:`, mkdirError);
          continue;
        }
      }

      const src = path.join(directoryPath, file);
      const dest = path.join(folderPath, file);

      try {
        await fs.rename(src, dest);
        console.log(`Moved ${file} to ${folderPath}`);
      } catch (renameError) {
        console.error(`Error moving ${file} to ${folderPath}:`, renameError);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

// Example: Read files from the current directory
readFilesInDirectory("D:\\sonia");
