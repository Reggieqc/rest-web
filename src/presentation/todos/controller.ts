import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodosById = async (req: Request, res: Response) => {
    if (!req.params.id) {
      return;
    }
    if (isNaN(+req.params.id)) {
      return res.status(400).json({ error: "Id argument is not a number" });
    }
    const id = +req.params.id;
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found  ` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body || {});
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id!;
    const [error, updateTodoDto] = UpdateTodoDto.update({
      id,
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found  ` });

    const updateTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: updateTodoDto!.values,
    });
    return res.json(updateTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    if (!req.params.id) {
      return;
    }
    const id = +req.params.id;
    const todo = await prisma.todo.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found  ` });
    }

    const deleteTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    if (!deleteTodo) {
      return res.status(400).json({ error: `TODO with id ${id} not found  ` });
    }

    return res.json(deleteTodo);
  };
}
