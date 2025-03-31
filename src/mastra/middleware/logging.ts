import { MastraMiddleware } from "./type";

export const loggingMiddleware: MastraMiddleware = async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(`${c.req.method} ${c.req.url} - ${duration}ms`);
};
