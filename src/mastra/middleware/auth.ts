import { MastraMiddleware } from "./type";

export const authMiddleware: MastraMiddleware = async (c, next) => {
  // Example: Add authentication check
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Continue to the next middleware or route handler
  await next();
};
