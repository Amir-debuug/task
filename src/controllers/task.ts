import { NextFunction, Request, Response } from "express";
import { taskBodyValidation, taskUpdateBodyValidation } from "../utils/validationSchema";
import { Task } from "../models/task";

export class TaskController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const { error } = taskBodyValidation(req.body);
    if (error) return res.status(400).json({ error: true, message: error.details[0].message });

    try {
      const task = await Task.create(req.body);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(400).json({ error: true, message: error });
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    let { userId } = req.body;
    let { _id } = req.params;

    const task = await Task.findOneAndDelete({ _id, userId });

    if (!task) {
      return res.status(404).json({ error: true, message: "task not found" });
    }

    return res.status(204).json();
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { error } = taskUpdateBodyValidation(req.body);
    if (error) return res.status(400).json({ error: true, message: error.details[0].message });

    let { userId } = req.body;
    let { _id } = req.params;

    const task = await Task.findOneAndUpdate({ _id, userId }, req.body, { new: true });

    if (!task) {
      return res.status(404).json({ error: true, message: "task not found" });
    }

    return res.status(201).json(task);
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    let { userId } = req.body;
    let { _id } = req.params;

    const task = await Task.findOne({ _id, userId });

    if (!task) {
      return res.status(404).json({ error: true, message: "task not found" });
    }

    return res.status(200).json(task);
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    let { userId } = req.body;
    let { page, limit, priority, status, search } = req.query;

    let filter: any = { userId };

    if (priority) {
      filter = { ...filter, priority: priority === "true" };
    }

    if (status) {
      filter = { ...filter, status };
    }

    if (search) {
      filter = {
        ...filter,
        $or: [
          { name: new RegExp(search as string, "i") },
          { description: new RegExp(search as string, "i") }
        ]
      };
    }

    const tasks = await Task.find(filter)
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .limit(parseInt(limit as string));

    const totalTasks = await Task.count(filter);

    const totalPages = Math.ceil(totalTasks / parseInt(limit as string));

    return res.status(200).json({
      data: tasks,
      pagination: { pages: totalPages, limit: parseInt(limit as string), total: totalTasks }
    });
  }
}
