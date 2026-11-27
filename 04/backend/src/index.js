import Fastify from "fastify";
import cors from "@fastify/cors";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE"],
});

const pages = [
  ["/", "../../frontend/index.html", "text/html; charset=utf-8"],
  ["/style.css", "../../frontend/style.css", "text/css; charset=utf-8"],
  ["/script.js", "../../frontend/script.js", "application/javascript; charset=utf-8"],
];

for (const [route, filename, contentType] of pages) {
  const file = new URL(filename, import.meta.url);
  app.get(route, async (_request, reply) => {
    return reply.type(contentType).send(await readFile(file));
  });
}

/** @type {Map<string, { id: string, title: string, done: boolean, created_at: string }>} */
const tasks = new Map();

app.get("/task", async () => {
  return [...tasks.values()];
});

app.post("/task", async (request, reply) => {
  const { title } = request.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    return reply.code(400).send({ error: "title is required" });
  }

  const task = {
    id: randomUUID(),
    title: title.trim(),
    done: false,
    created_at: new Date().toISOString(),
  };

  tasks.set(task.id, task);
  return reply.code(201).send(task);
});

app.put("/task/:id", async (request, reply) => {
  const { id } = request.params;
  const task = tasks.get(id);

  if (!task) {
    return reply.code(404).send({ error: "task not found" });
  }

  const { title, done } = request.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    return reply.code(400).send({ error: "title is required" });
  }

  if (typeof done !== "boolean") {
    return reply.code(400).send({ error: "done must be boolean" });
  }

  const updated = {
    ...task,
    title: title.trim(),
    done,
  };

  tasks.set(id, updated);
  return updated;
});

app.delete("/task/:id", async (request, reply) => {
  const { id } = request.params;
  const ok = tasks.delete(id);

  if (!ok) {
    return reply.code(404).send({ ok: false });
  }

  return { ok: true };
});

const port = Number(process.env.PORT) || 5000;
const host = process.env.HOST || "127.0.0.1";

try {
  await app.listen({ port, host });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
