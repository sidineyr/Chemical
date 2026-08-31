import assert from "node:assert/strict";
import test from "node:test";

test("renders the Chemical identity and Portuguese document language", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<html[^>]*\blang=["']pt-BR["']/i);
  assert.match(html, /<title>Chemical — Laboratório de Aprendizagem<\/title>/i);
  assert.match(html, /Entre curioso/);
  assert.match(html, /Sidiney Rodrigues/);
  assert.doesNotMatch(html, /Starter Project/);
  assert.doesNotMatch(html, /codex-preview/);
});
