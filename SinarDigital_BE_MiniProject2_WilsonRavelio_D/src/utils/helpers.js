const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  try {
    const fullPath = path.join(__dirname, "../../", filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

module.exports = {
  deleteFile,
  generateSlug,
};
