# zlsbksdxl Codex Plugins

[中文](README.md)

A Git-backed Codex marketplace containing community integrations for Exa web search and Feishu/Lark workflows.

> This is a community-maintained integration and is not an official release from Exa or LarkSuite. The plugins use the corresponding official services and runtimes.

## Plugins

| Plugin | Purpose | Requirements |
| --- | --- | --- |
| `exa` | Search the web and fetch full pages through Exa MCP. General web research prefers Exa automatically. | Node.js 16+, `npx`, and the user's own Exa API key |
| `feishu2codex` | Adds 27 Codex Skills for Feishu/Lark Docs, Wiki, Base, messaging, calendar, tasks, meetings, mail, approvals, and more. | Node.js 16+, official `lark-cli`, and Feishu/Lark app plus OAuth authorization |

## Install

```bash
codex plugin marketplace add zlsbksdxl/codex-plugins
codex plugin add exa@zlsbksdxl-codex-plugins
codex plugin add feishu2codex@zlsbksdxl-codex-plugins
```

Fully restart the ChatGPT/Codex desktop app after installation, then use a new task so Skills and MCP servers are reloaded.

## Configure Exa

Create `~/.codex/mcp/exa-mcp.env` with your own key:

```bash
mkdir -p ~/.codex/mcp
```

```dotenv
EXA_API_KEY=your_exa_api_key
```

Then restrict access:

```bash
chmod 600 ~/.codex/mcp/exa-mcp.env
```

Never commit a real API key. The plugin also reads `EXA_API_KEY` from the process environment.

## Configure Feishu/Lark

```bash
npx @larksuite/cli@latest install
lark-cli config init
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

Credentials remain local to the user. Grant only the scopes needed for the intended workflows.

## Update

```bash
codex plugin marketplace upgrade zlsbksdxl-codex-plugins
codex plugin add exa@zlsbksdxl-codex-plugins
codex plugin add feishu2codex@zlsbksdxl-codex-plugins
```

## Upstream and licensing

- [Exa MCP](https://github.com/exa-labs/exa-mcp-server), MIT
- [Lark CLI](https://github.com/larksuite/cli), MIT
- Packaging, documentation, and launcher changes in this repository: [MIT](LICENSE)

## Development and validation

Run the repository structure check after adding or updating a plugin:

```bash
./scripts/validate-marketplace.sh
```

GitHub Actions runs the same check for every push and pull request. Before publishing, also validate individual plugins and Skills with Codex's `plugin-creator` and `skill-creator` validators.

See [SECURITY.md](SECURITY.md) for credential and vulnerability reporting guidance.
