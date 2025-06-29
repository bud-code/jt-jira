import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";
import members from "@/features/members/server/route";
import projects from "@/features/projects/server/route";
import tasks from "@/features/tasks/server/route";
import workspaces from "@/features/workspaces/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", auth)
  .route("/workspaces", workspaces)
  .route("/members", members)
  .route("/projects", projects)
  .route("/tasks", tasks);

export const GET = handle(routes);
export const POST = handle(routes);
export const PATCH = handle(routes);
export const PUT = handle(routes);
export const DELETE = handle(routes);

export type AppType = typeof routes;
