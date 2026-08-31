import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});

after(async () => {
  await vite.close();
});

async function readCssTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readCssTree(entryPath);
      }
      return entry.name.endsWith(".css") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

test("emits the catalog's animation and scrolling utilities", async () => {
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /--tw-enter-opacity/);
  assert.match(css, /scrollbar-width:\s*thin/);
  assert.match(css, /scrollbar-width:\s*none/);
  assert.match(css, /scrollbar-gutter:\s*stable/);
  assert.match(css, /scroll-fade-reveal-b/);
  assert.match(css, /mask-image:/);
  assert.match(css, /tw-shimmer/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));

  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
  assert.match(html, /data-state="loading"/);
});

test("emits chart themes for the starter's media dark mode", async () => {
  const { ChartStyle } = await vite.ssrLoadModule("/components/ui/chart.tsx");
  const html = renderToStaticMarkup(
    React.createElement(ChartStyle, {
      id: "contract",
      config: {
        latency: { theme: { light: "#ffffff", dark: "#000000" } },
      },
    }),
  );

  assert.match(html, /\[data-chart=contract\]/);
  assert.match(html, /@media \(prefers-color-scheme: dark\)/);
  assert.doesNotMatch(html, /\.dark/);
});

test("renders sidebar skeletons deterministically", async () => {
  const { SidebarMenuSkeleton } = await vite.ssrLoadModule(
    "/components/ui/sidebar.tsx",
  );
  const first = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));
  const second = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));

  assert.equal(first, second);
  assert.match(first, /--skeleton-width:70%/);
});

test("keeps the guided curriculum complete and internally consistent", async () => {
  const { modules, officialSources, stages } = await vite.ssrLoadModule(
    "/lib/curriculum.ts",
  );

  assert.equal(stages.length, 4);
  assert.equal(modules.length, 16);
  assert.deepEqual(
    modules.map((module) => module.order),
    Array.from({ length: 16 }, (_, index) => index + 1),
  );
  assert.equal(new Set(modules.map((module) => module.id)).size, 16);
  assert.ok(modules.every((module) => module.steps.length === 3));
  assert.ok(modules.every((module) => module.goals.length >= 3));
  assert.ok(
    modules.every(
      (module) =>
        module.check.correct >= 0 &&
        module.check.correct < module.check.options.length,
    ),
  );
  assert.ok(officialSources.length >= 10);
  assert.ok(officialSources.every((source) => source.url.startsWith("https://")));
  assert.ok(officialSources.every((source) => !source.url.includes("wikipedia")));
});

test("calculates introductory molecular representations", async () => {
  const {
    approximateMolarMass,
    molecularFormula,
    moleculeExamples,
    valenceReport,
  } = await vite.ssrLoadModule("/lib/chemistry.ts");
  const water = moleculeExamples[0];

  assert.equal(molecularFormula(water.atoms), "H2O");
  assert.equal(approximateMolarMass(water.atoms).toFixed(3), "18.015");
  assert.ok(valenceReport(water.atoms, water.bonds).every((atom) => atom.state === "complete"));
});
