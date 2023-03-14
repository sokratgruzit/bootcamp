const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class FileService {
  saveImage(file, folderPath) {
    try {
      const extensionName = path.extname(file.name);
      const allowedExtension = [".png", ".jpg", ".jpeg", ".ico", ".svg"];

      if (!allowedExtension.includes(extensionName)) {
        throw Error("Invalid Image Extension");
      }

      const fileName = uuid.v4() + ".png";
      const filePath = path.resolve("server/uploads" + folderPath, fileName);
      file.mv(filePath);
      return {
        name: fileName,
        path: folderPath + fileName,
      };
    } catch (e) {
      throw e;
    }
  }

  removeImage(filePath) {
    fs.exists("public" + filePath, function (exists) {
      if (exists) {
        fs.unlink("public" + filePath, function (err) {
          if (err) return console.log(err);
        });
      }
    });
  }
}

module.exports = new FileService();
