import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
const todos = [
  {
    id: 1,
    text: "Buy milk",
    completedAt: new Date(),
  },
  {
    id: 2,
    text: "Buy bread",
    completedAt: null,
  },
  {
    id: 3,
    text: "Buy butterd",
    completedAt: new Date(),
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

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const todo = await prisma.todo.create({
      data: {
        text,
      },
    });

    return res.json(todo);
  };

  public updateTodo = (req: Request, res: Response) => {
    if (!req.params.id) {
      return;
    }
    if (isNaN(+req.params.id)) {
      return res.status(400).json({ error: "Id argument is not a number" });
    }
    const id = +req.params.id;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found  ` });
    }
    const { text, completedAt } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    todo.text = text || todo.text;

    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    return res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    if (!req.params.id) {
      return;
    }
    if (isNaN(+req.params.id)) {
      return res.status(400).json({ error: "Id argument is not a number" });
    }
    const id = +req.params.id;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found  ` });
    }

    todos.splice(todos.indexOf(todo), 1);
    return res.json(todo);
  };
}
