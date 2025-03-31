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

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
  serverMiddleware: [
    // {
    //   path: "/api/weather",
    //   handler: corsMiddleware,
    // },
    // {
    //   path: "/api/*",
    //   handler: authMiddleware,
    // },
    {
      path: "/api/*",
      handler: loggingMiddleware,
    },
    {
      path: "/api/*",
      handler: specialMiddleware,
    },
  ],
});
