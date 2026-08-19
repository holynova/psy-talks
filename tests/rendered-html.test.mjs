import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesheetLink = /<link[^>]+rel=["']stylesheet["'][^>]*>/i;

test("renders static home and v2 pages with CSS assets", async () => {
  const pages = [
    ["dist/index.html", "助人对话练习册"],
    ["dist/v2/index.html", "助人对话训练手册"],
  ];

  for (const [file, marker] of pages) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    assert.match(html, stylesheetLink, `${file} should include a stylesheet`);
    assert.match(html, new RegExp(marker), `${file} should contain its page marker`);
    assert.doesNotMatch(html, /\/psy-talks\/_next\//, `${file} should not use Next assets`);
  }
});
