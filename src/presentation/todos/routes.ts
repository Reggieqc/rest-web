import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrasctructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrasctructure/repositories/todo.repository.impl";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const dataSource = new TodoDatasourceImpl();
    const repository = new TodoRepositoryImpl(dataSource);

    const todoController = new TodosController(repository);
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
