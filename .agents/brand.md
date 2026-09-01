# Content Rabbit Claude Code Plugin Brand

## Identity

Use `Content Rabbit` as the display name.
Use `content-rabbit` for the plugin, marketplace, and MCP server key.

Describe this repository as the Content Rabbit plugin for Claude Code.
Do not describe it as the Content Rabbit application.

## Purpose

The plugin connects Claude Code to Content Rabbit's hosted MCP server.
It exposes the shared tool registry without copying tool implementations.

The registry covers posts, accounts, queues, webhooks, and analytics.
Use only capabilities named by current metadata or shared registry evidence.

## Audience

Address Claude Code users who have a Content Rabbit API key.
Address maintainers who validate plugin and MCP registry metadata.

## Promise

Lead with one configured plugin connection to the shared Content Rabbit tools.
Explain the hosted Streamable HTTP transport before the optional local stdio transport.

Do not promise hosted service availability or tool behavior from this repository.

## Voice

Use direct setup instructions.
Name commands, environment variables, transports, and endpoints exactly.

Separate required steps from optional alternatives.
State security boundaries near credential instructions.

## Message order

1. Install the marketplace and plugin.
2. Set `CONTENTRABBIT_API_KEY` before starting Claude Code.
3. Reload plugins and confirm the connection with `/mcp`.
4. Introduce the optional local stdio package when relevant.
5. Explain sandbox signup keys only when safe simulation matters.

## Claims

Support connection claims with `.claude-plugin/plugin.json` and `server.json`.
Support installation claims with `README.md`.
Support metadata claims with `test/metadata.test.mjs`.

The shared homepage and API endpoint do not prove deployment ownership here.
Do not claim this repository deploys or operates either service.

## Security

Call the credential `CONTENTRABBIT_API_KEY`.
Describe it as a Bearer token without showing a real value.

State that signup responses show the key once.
Tell users to store it securely.

## Assets

The repository defines no logo, font, color palette, or visual asset.
Do not invent a visual identity for the plugin.
