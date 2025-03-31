import { MastraMiddleware } from "./type";

export const corsMiddleware: MastraMiddleware = async (c, next) => {
  // Add CORS headers
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (c.req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  return next();
};
