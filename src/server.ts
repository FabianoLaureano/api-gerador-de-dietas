import Fastify from "fastify";
import cors from "@fastify/cors";
import { planRoutes } from "./routes/plan";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
});

app.get("/", async () => {
  return { hello: "world" };
});

app.register(planRoutes);

app
  .listen({ port: Number(process.env.PORT) || 3333, host: "0.0.0.0" })
  .then(() => {
    console.log(`HTTP server running on port ${process.env.PORT}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
