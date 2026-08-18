type Fetcher = {
  fetch(
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response>;
};

type D1Database = Parameters<typeof import("drizzle-orm/d1").drizzle>[0];

declare module "cloudflare:workers" {
  export const env: {
    DB?: Parameters<typeof import("drizzle-orm/d1").drizzle>[0];
  };
}
