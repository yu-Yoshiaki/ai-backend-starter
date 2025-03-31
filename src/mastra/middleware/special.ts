import { MastraMiddleware } from "./type";

export const specialMiddleware: MastraMiddleware = async (c, next) => {
  console.log("Special middleware", {
    url: c.req.url,
    method: c.req.method,
    headers: {
      "x-mastra-cloud": c.req.header("x-mastra-cloud"),
      "x-mastra-client-type": c.req.header("x-mastra-client-type"),
      "x-mastra-dev-playground": c.req.header("x-mastra-dev-playground"),
    },
  });

  // Check for Mastra-specific headers in incoming requests
  const isFromMastraCloud = c.req.header("x-mastra-cloud") === "true";
  const clientType = c.req.header("x-mastra-client-type"); // e.g., 'js', 'python'
  const isDevPlayground = c.req.header("x-mastra-dev-playground") === "true";

  // Customize behavior based on client information
  if (isFromMastraCloud) {
    // Special handling for Mastra Cloud requests
  }

  await next();
};
