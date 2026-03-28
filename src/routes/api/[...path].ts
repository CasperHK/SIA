import type { APIEvent } from "@solidjs/start/server";
import { api } from "../../api/hono";

// SolidStart API route handler - delegates all /api/* requests to Hono
export const GET = async (event: APIEvent) => {
  return api.fetch(event.request);
};

export const POST = async (event: APIEvent) => {
  return api.fetch(event.request);
};
