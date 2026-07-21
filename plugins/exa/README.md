# Exa Web Search for Codex

Community packaging of the official [Exa MCP server](https://github.com/exa-labs/exa-mcp-server) for Codex.

The plugin provides:

- `web_search_exa` for current web search
- `web_fetch_exa` for full-page retrieval
- the implicitly invoked `exa-web-search` Skill, which prefers Exa for general online research

The launcher reads `EXA_API_KEY` from the environment or from `~/.codex/mcp/exa-mcp.env`, then starts the official `exa-mcp-server` npm package. No credential is included in this repository.

See the repository [README](../../README.md#配置-exa) for installation and setup.
