import { Memory } from "@mastra/memory";
import { productionStorage, vectorStore } from "../storage";

// カスタム設定でメモリを初期化
export const memory = new Memory({
  storage: productionStorage,
  vector: vectorStore,
  options: {
    lastMessages: 10,
    semanticRecall: {
      topK: 3,
      messageRange: 2,
    },
  },
});
