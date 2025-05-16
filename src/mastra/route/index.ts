// カスタムルート

import { registerApiRoute } from "@mastra/core/server";

const customRoute = registerApiRoute("/my-custom-route", {
  method: "GET",
  middleware: [
    async (c, next) => {
      console.log(`🔧${c.req.method} ${c.req.url}`);
      await next();
    },
  ],
  handler: async (c) => {
    // // you have access to mastra instance here
    // const mastra = c.get("mastra");

    // // you can use the mastra instance to get agents, workflows, etc.
    // const agents = await mastra.getAgent("my-agent");

    return c.json({ message: "Hello, world!" });
  },
});

export { customRoute };
