import express, { Router } from "express";
import path from "node:path";

interface Options {
  port: number;
  public_path: string;
  routes: Router;
}

export class Server {
  public serverListener: any;
  constructor(private readonly options: Options) {
    this.options = options;
  }

  public readonly app = express();

  async start() {
    // * Middlewares
    this.app.use(express.json()); //Any request to the server goes through this middleware that parse the response to a Json
    this.app.use(express.urlencoded({ extended: true }));

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
    this.serverListener = this.app.listen(this.options.port, () => {
      console.log(`Server runnin on port ${this.options.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
