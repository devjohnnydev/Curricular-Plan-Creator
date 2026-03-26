import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  const publicPath = path.join(process.cwd(), "artifacts/plano-ensino/dist/public");
  app.use(express.static(publicPath));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

export default app;
