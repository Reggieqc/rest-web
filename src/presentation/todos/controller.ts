import { Request, Response } from "express";
const todos = [
  {
    id: 1,
    text: "Buy milk",
    createdAt: new Date(),
  },
  {
    id: 2,
    text: "Buy bread",
    createdAt: null,
  },
  {
    id: 3,
    text: "Buy butterd",
    createdAt: new Date(),
  },
];

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodosById = (req: Request, res: Response) => {
    if (!req.params.id) {
      return;
    }
    if (isNaN(+req.params.id)) {
      return res.status(400).json({ error: "Id argument is not a number" });
    }
    const id = +req.params.id;
    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found  ` });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    const newTodo = {
      id: todos.length + 1,
      text,
      createdAt: new Date(),
    };

    todos.push(newTodo);
    return res.json(newTodo);
  };
}
