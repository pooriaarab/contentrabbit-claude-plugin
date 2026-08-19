# Content Rabbit for Claude Code

This plugin connects Claude Code to Content Rabbit's hosted MCP server. It exposes the shared
Content Rabbit MCP tool registry for posts, teams, accounts, queues, webhooks, media, generation,
and analytics.

## Install the plugin

From a Content Rabbit checkout, add this directory as a marketplace:

```text
/plugin marketplace add ./integrations/claude-plugin
/plugin install content-rabbit@content-rabbit
```

If this directory is published as its own repository, use the repository instead:

```text
/plugin marketplace add <owner>/<repo>
/plugin install content-rabbit@content-rabbit
```

Restart Claude Code or run `/reload-plugins` after installation. Use `/mcp` to confirm that the
`content-rabbit` server is connected.

## Connect an API key

Set `CONTENTRABBIT_API_KEY` in the environment before starting Claude Code:

```bash
export CONTENTRABBIT_API_KEY="your-content-rabbit-api-key"
```

You can create a key in Content Rabbit Settings > API Keys. Agents can create a new account and
key with the signup endpoint:

```bash
curl -X POST https://contentrabbitai.com/api/v1/agent/signup \
  -H 'content-type: application/json' \
  -d '{"email":"you@example.com","name":"Claude Code"}'
```

The response shows the key once. Store it securely. Add `"sandbox":true` to the request for a
key that simulates mutating calls without changing or billing an account.

The plugin sends the key as `Authorization: Bearer <key>` to:

```text
https://contentrabbitai.com/api/v1/mcp
```

This is the hosted Streamable HTTP server. It authenticates each request and scopes tools to the
team that owns the key. The plugin does not copy or reimplement MCP tools.

## Local stdio alternative

The MCP registry entry also lists the existing `@contentrabbit/mcp-server` package. Use it when a
local stdio process is preferred:

```json
{
  "mcpServers": {
    "content-rabbit": {
      "command": "npx",
      "args": ["-y", "@contentrabbit/mcp-server"],
      "env": {
        "CONTENTRABBIT_API_KEY": "your-content-rabbit-api-key"
      }
    }
  }
}
```

The stdio package and hosted server use the same shared tool registry. Set
`CONTENTRABBIT_BASE_URL` only when the stdio client must use a custom API base URL.

## Publish to the MCP Registry

The registry metadata is in `server.json`. Validate it before publishing:

```bash
brew install mcp-publisher
mcp-publisher validate integrations/claude-plugin/server.json
```

The `ai.contentrabbit` namespace requires ownership of `contentrabbit.ai`. Add the public key
from the MCP Registry DNS challenge as a TXT record, then authenticate and publish:

```bash
mcp-publisher login dns --domain=contentrabbit.ai --private-key="$MCP_REGISTRY_PRIVATE_KEY"
mcp-publisher publish integrations/claude-plugin/server.json
```

The published entry advertises the hosted Streamable HTTP server first and the existing npm stdio
package as an optional local transport.
