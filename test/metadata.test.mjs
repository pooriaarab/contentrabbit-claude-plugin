import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function readJson(relativePath) {
  const contents = await readFile(resolve(pluginRoot, relativePath), "utf8");
  return JSON.parse(contents);
}

test("marketplace lists the Content Rabbit plugin from this directory", async () => {
  const marketplace = await readJson(".claude-plugin/marketplace.json");

  assert.equal(marketplace.name, "content-rabbit");
  assert.equal(marketplace.owner.name, "Content Rabbit");
  assert.deepEqual(marketplace.plugins, [
    {
      name: "content-rabbit",
      source: "./",
      description: "Manage Content Rabbit posts through Claude Code.",
    },
  ]);
});

test("plugin connects to the hosted MCP server with a Bearer API key", async () => {
  const plugin = await readJson(".claude-plugin/plugin.json");
  const server = plugin.mcpServers["content-rabbit"];

  assert.equal(plugin.name, "content-rabbit");
  assert.equal(server.type, "http");
  assert.equal(server.url, "https://contentrabbitai.com/api/v1/mcp");
  assert.equal(server.headers.Authorization, "Bearer ${CONTENTRABBIT_API_KEY}");
});

test("registry metadata names the remote server and its optional stdio package", async () => {
  const metadata = await readJson("server.json");
  const remote = metadata.remotes[0];
  const packageEntry = metadata.packages[0];

  assert.equal(metadata.name, "ai.contentrabbit/content-rabbit");
  assert.equal(metadata.version, "0.1.0");
  assert.equal(remote.type, "streamable-http");
  assert.equal(remote.url, "https://contentrabbitai.com/api/v1/mcp");
  assert.deepEqual(remote.headers, [
    {
      name: "Authorization",
      description: "Content Rabbit API key, sent as a Bearer token.",
      isRequired: true,
      isSecret: true,
    },
  ]);
  assert.equal(packageEntry.registryType, "npm");
  assert.equal(packageEntry.identifier, "@contentrabbit/mcp-server");
  assert.equal(packageEntry.version, "0.1.0");
  assert.equal(packageEntry.transport.type, "stdio");
});
