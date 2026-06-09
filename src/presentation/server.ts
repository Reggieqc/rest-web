import express from "express";
import path from "node:path";

interface Options {
  PORT: number;
  PUBLIC_PATH: string;
}

export class Server {
  constructor(private readonly options: Options) {
    this.options = options;
  }

  private app = express();

  async start() {
    // * Middlewares

    // * Public Folder
    this.app.use(express.static(this.options.PUBLIC_PATH));

    this.app.get("/{*splat}", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.options.PUBLIC_PATH}/index.html`,
      );
      res.sendFile(indexPath);
    });

    // console.log("Server started");
    this.app.listen(this.options.PORT, () => {
      console.log(`Server runnin on port ${this.options.PORT}`);
    });
  }
}
