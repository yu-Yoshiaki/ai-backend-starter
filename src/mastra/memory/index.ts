import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/core/storage/libsql";
import { LibSQLVector } from "@mastra/core/vector/libsql";

// カスタム設定でメモリを初期化
export const memory = new Memory({
  storage: new LibSQLStore({
    config: {
      url: process.env.DATABASE_URL || "file:local.db",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  vector: new LibSQLVector({
    connectionUrl:
      process.env.DATABASE_URL_HTTP ||
      process.env.DATABASE_URL ||
      "file:local.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  }),
  options: {
    lastMessages: 10,
    semanticRecall: {
      topK: 3,
      messageRange: 2,
    },
  },
});
