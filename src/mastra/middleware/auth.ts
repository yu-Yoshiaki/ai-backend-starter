import { MastraMiddleware } from "./type";

const isDevelopment = () => {
  // 環境変数による判定
  if (process.env.NODE_ENV === "development") return true;

  // mastra dev のデフォルトポート(4111)での実行判定
  const appUrl = process.env.APP_URL;
  if (!appUrl) return false;
  try {
    const url = new URL(appUrl);
    return url.port === "4111";
  } catch {
    return false;
  }
};

export const authMiddleware: MastraMiddleware = async (c, next) => {
  // 開発環境の場合は認証をスキップ
  if (isDevelopment()) {
    await next();
    return;
  }

  // API Key認証
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return new Response("Unauthorized: API key is required", { status: 401 });
  }

  // Bearer スキーマの確認
  const [scheme, apiKey] = authHeader.split(" ");
  if (scheme !== "Bearer" || !apiKey) {
    return new Response("Unauthorized: Invalid authorization format", {
      status: 401,
    });
  }

  // API Keyの検証
  const validApiKey = process.env.API_KEY;
  if (!validApiKey || apiKey !== validApiKey) {
    return new Response("Unauthorized: Invalid API key", { status: 401 });
  }

  // 認証成功、次のミドルウェアまたはルートハンドラーへ
  await next();
};
