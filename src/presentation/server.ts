import express, { Router } from "express";
import path from "node:path";

interface Options {
  port: number;
  public_path: string;
  routes: Router;
}

export class Server {
  constructor(private readonly options: Options) {
    this.options = options;
  }

  private app = express();

  async start() {
    // * Middlewares

    // * Public Folder
    this.app.use(express.static(this.options.public_path));

    // * Routes
    this.app.use(this.options.routes);

    // * SPA
    this.app.get("/{*splat}", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.options.public_path}/index.html`,
      );
      res.sendFile(indexPath);
    });

    // console.log("Server started");
    this.app.listen(this.options.port, () => {
      console.log(`Server runnin on port ${this.options.port}`);
    });
  }
}
