export type MastraMiddleware = (
  c: any,
  next: () => Promise<void>
) => Promise<Response | void>;
