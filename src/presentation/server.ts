import express from "express";

export class Server {
  private app = express();

  async start() {
    // * Middlewares

    // * Public Folder
    this.app.use(express.static("public"));

    // console.log("Server started");
    this.app.listen(8080, () => {
      console.log(`Server runnin on port ${8080}`);
    });
  }
}
