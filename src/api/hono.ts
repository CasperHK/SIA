import { Hono } from "hono";
import { poems, categories } from "../poems";
import type { Poem } from "../poems";

const api = new Hono().basePath("/api");

// GET /api/poems - list all poems (supports ?category= and ?keyword= filters)
api.get("/poems", (c) => {
  const category = c.req.query("category");
  const keyword = c.req.query("keyword");
  const limit = parseInt(c.req.query("limit") || "100", 10);

  let result: Poem[] = poems;

  if (category) {
    result = result.filter((p) => p.category === category);
  }
  if (keyword) {
    const kw = keyword.toLowerCase();
    result = result.filter(
      (p) =>
        p.keywords.some((k) => k.toLowerCase().includes(kw)) ||
        p.titleZh.includes(kw) ||
        p.title.toLowerCase().includes(kw) ||
        p.content.some((line) => line.includes(kw))
    );
  }

  result = result.slice(0, Math.min(limit, 100));

  return c.json({
    data: result,
    total: result.length,
    timestamp: new Date().toISOString(),
  });
});

// GET /api/poems/:id - get a single poem by ID
api.get("/poems/:id", (c) => {
  const id = c.req.param("id");
  const poem = poems.find((p) => p.id === id);

  if (!poem) {
    return c.json({ error: "Poem not found", id }, 404);
  }

  return c.json({ data: poem });
});

// GET /api/categories - list all categories
api.get("/categories", (c) => {
  const enriched = Object.entries(categories).map(([key, cat]) => ({
    key,
    ...cat,
    count: poems.filter((p) => p.category === key).length,
  }));

  return c.json({ data: enriched });
});

// GET /api/singularity - the "singularity inspiration" endpoint
api.get("/singularity", (c) => {
  // Return a random poem as the "singularity inspiration"
  const randomPoem = poems[Math.floor(Math.random() * poems.length)];
  return c.json({
    inspiration: randomPoem,
    message: "量子坍縮完成——靈感已降臨。",
    timestamp: new Date().toISOString(),
  });
});

export { api };
