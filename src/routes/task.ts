import { Router } from "express";
import { TaskController } from "../controllers/task";

class taskRoutes {
  router: Router;
  public taskController: TaskController = new TaskController();

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.post("/create", this.taskController.create);
    this.router.delete("/delete/:_id", this.taskController.delete);
    this.router.patch("/update/:_id", this.taskController.update);
    this.router.get("/single/:_id", this.taskController.get);
    this.router.get("/all", this.taskController.getAll);
  }
}

export default taskRoutes;
