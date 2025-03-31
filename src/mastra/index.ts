import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { weatherWorkflow } from "./workflows";
import { weatherAgent } from "./agents";
import {
  corsMiddleware,
  authMiddleware,
  loggingMiddleware,
  specialMiddleware,
} from "./middleware";
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
  serverMiddleware: [
    {
      path: "/api/*",
      handler: corsMiddleware,
    },
    {
      path: "/api/*",
      handler: authMiddleware,
    },
    {
      path: "/api/*",
      handler: loggingMiddleware,
    },
    {
      path: "/api/*",
      handler: specialMiddleware,
    },
  ],
  deployer: new CloudflareDeployer({
    scope: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
    projectName: "ai-backend-starter",
    workerNamespace: "ai-backend",
    env: {
      NODE_ENV: process.env.NODE_ENV || "production",
      API_VERSION: "v1",
    },
    auth: {
      apiToken: process.env.CLOUDFLARE_API_TOKEN ?? "",
      apiEmail: process.env.CLOUDFLARE_EMAIL,
    },
  }),
});
