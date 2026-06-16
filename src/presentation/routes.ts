import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

//Only define routes
export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    // const todoController = new TodosController();

    //app is part of the server, what we have here is the router
    // router.get("/api/todos", todoController.getTodos);
    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}
