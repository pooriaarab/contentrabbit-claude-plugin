# Content Rabbit Claude Code Plugin Design

## Overview

This contract covers setup instructions and tracked metadata for the Claude Code plugin.
The surface type is `developer-ui`.

Use `README.md` for the setup flow.
Use `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` for plugin metadata.
Use `server.json` for MCP registry metadata.

The repository has no graphical interface.
Keep its output readable in Claude Code, terminals, Markdown, and JSON tools.

## Colors

No color system exists in this repository.
The host application and terminal own their palettes.

Do not add ANSI color or depend on color for meaning.
Keep JSON and copied commands free of terminal styling.

## Typography

No font is owned or loaded here.
The host application and terminal choose the typeface.

Use code spans for commands, paths, environment variables, packages, and endpoints.
Use sentence case for headings and instructions.

Do not use capitalization or font weight as the only distinction between required and optional steps.

## Layout

Present setup in execution order:

1. Add the marketplace.
2. Install `content-rabbit@content-rabbit`.
3. Set `CONTENTRABBIT_API_KEY`.
4. Reload plugins.
5. Confirm the server with `/mcp`.

Place the local stdio alternative after the hosted transport.
Keep publishing instructions separate from user setup.

Use fenced blocks for commands and JSON.
Keep placeholders visibly non-secret.

Preserve two-space indentation in tracked JSON files.

## Elevation & Depth

Not applicable.
The repository has no shadows, overlays, or stacking contexts.

Represent hierarchy with Markdown headings, ordered steps, and JSON nesting.

## Shapes

Use standard Markdown bullets, numbered lists, code fences, and JSON delimiters.
Use no decorative boxes, icons, or emoji as required structure.

Keep the environment placeholder `${CONTENTRABBIT_API_KEY}` unchanged in plugin metadata.

## Components

`.claude-plugin/marketplace.json` lists the local plugin source.
`.claude-plugin/plugin.json` defines identity, metadata, and the hosted MCP connection.

`server.json` lists the Streamable HTTP remote first.
It lists `@contentrabbit/mcp-server` as the optional stdio package.

`README.md` owns setup, authentication, transport, and publishing instructions.
`test/metadata.test.mjs` checks names, endpoints, authentication, and transport metadata.

Keep interface names consistent across all four files.
Run `node --test` after changing them.

## Do's and Don'ts

- Do use `Content Rabbit` for the display name.
- Don't rename only one manifest entry.
- Do keep `content-rabbit` identifiers consistent.
- Don't copy the shared MCP tool registry into this repository.
- Do show credentials only as placeholders.
- Don't commit or print a real API key.
- Do present hosted HTTP before optional local stdio.
- Don't claim this repository deploys the shared site or API.
- Do run metadata tests after edits.
- Don't invent visual tokens or interface states.
