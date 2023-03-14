const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class FileService {
  create(file, folder) {
    try {
      const extensionName = path.extname(file.name);
      const allowedExtension = [".png", ".jpg", ".jpeg", ".ico", ".svg"];

      if (!allowedExtension.includes(extensionName)) {
        throw Error("Invalid Image Extension");
      }
      const fileName = uuid.v4() + extensionName;
      const filePath = path.resolve("server/uploads" + folder, fileName);
      // if folder not exist, create
      if (!fs.existsSync("server/uploads" + folder)) {
        fs.mkdirSync("server/uploads" + folder, { recursive: true });
      }
      file.mv(filePath);
      const url = "/image" + folder + "/" + fileName;
      return {
        path: url,
        name: fileName,
        alt: "",
      };
    } catch (e) {
      throw e;
    }
  }

  destroy(url) {
    const filePath = path.resolve("server/uploads" + url);
    fs.exists(filePath, function (exists) {
      if (exists) {
        fs.unlink(filePath, function (err) {
          if (err) return console.log(err);
        });
      }
    });
  }
}

module.exports = new FileService();
