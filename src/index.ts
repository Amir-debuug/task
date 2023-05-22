import express from "express";
import swaggerUi from "swagger-ui-express";
import compression from "compression";
import cors from "cors";
import swaggerAutogen from "swagger-autogen";

import UserRoutes from "./routes/user";
import RefreshRoutes from "./routes/token";
import TaskRoutes from "./routes/task";
import run from "./connectdb";
import { PORT } from "./utils/secret";
import swaggerFile from "./swagger_output.json";
import { doc, endpointsFiles, options, outputFile } from "./swagger";
import AuthorizationMiddleware from "./middlewares/auth";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.mongo();
    this.open();
  }

  private open(): void {
    swaggerAutogen(options)(outputFile, endpointsFiles, doc);
  }

  public routes(): void {
    this.app.use("/api/user", new UserRoutes().router);
    this.app.use("/api/refresh", new RefreshRoutes().router);
    this.app.use("/api/task", AuthorizationMiddleware, new TaskRoutes().router);
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  public config(): void {
    this.app.set("port", PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(cors());
  }

  private mongo() {
    run().catch((error) => console.error(error));
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`API is running at http://localhost:${this.app.get("port")}`);
    });
  }
}

const server = new Server();

server.start();
