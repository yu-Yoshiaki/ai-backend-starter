import { LibSQLStore } from "@mastra/core/storage/libsql";
import { LibSQLVector } from "@mastra/core/vector/libsql";
/**
 * 参照
 * https://mastra.ai/ja/docs/memory/overview
 * https://mastra.ai/ja/reference/storage/libsql
 *
 * メモリで使用する。
 */

// ファイルデータベース（開発環境）
const developmentStorage = new LibSQLStore({
  config: {
    url: "file:./storage.db",
  },
});

// 永続的データベース（本番環境）
const productionStorage = new LibSQLStore({
  config: {
    url: process.env.DATABASE_URL ?? "",
    authToken: process.env.DATABASE_AUTH_TOKEN ?? "",
  },
});

const vectorStore = new LibSQLVector({
  connectionUrl:
    process.env.DATABASE_URL_HTTP ||
    process.env.DATABASE_URL ||
    "file:local.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});


export { developmentStorage, productionStorage, vectorStore };
