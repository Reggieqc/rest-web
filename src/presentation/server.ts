import express from "express";
import path from "node:path";

export class Server {
  private app = express();

  async start() {
    // * Middlewares

    // * Public Folder
    this.app.use(express.static("public"));

    this.app.get("/{*splat}", (req, res) => {
      const indexPath = path.join(__dirname, "../../public/index.html");
      res.sendFile(indexPath);
    });

    // console.log("Server started");
    this.app.listen(8080, () => {
      console.log(`Server runnin on port ${8080}`);
    });
  }
}
