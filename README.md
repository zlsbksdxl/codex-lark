# Codex Plugins

English | [简体中文](README.zh-CN.md)

A Git-backed Codex marketplace containing community integrations for Exa web search and Feishu/Lark workflows.

> This is a community-maintained integration and is not an official release from Exa or LarkSuite. The plugins use the corresponding official services and runtimes.

## Plugins

| Plugin | Purpose | Requirements |
| --- | --- | --- |
| `exa` | Search the web and fetch full pages through the official Exa remote MCP. General web research prefers Exa automatically. | Exa account connected through browser OAuth |
| `feishu2codex` | Adds 27 official Lark CLI Skills plus guided setup for Feishu/Lark Docs, Wiki, Base, messaging, calendar, tasks, meetings, mail, approvals, and more. | Node.js/npm for first-use runtime setup, plus Feishu/Lark OAuth authorization |

## Add this Marketplace to Codex

### Desktop app

1. Open **Codex → Plugins**.
2. Open the marketplace source menu beside the plugin search field and select **+ Add More**.
3. Paste this repository URL:

   ```text
   https://github.com/zlsbksdxl/codex-plugins.git
   ```

4. Select **Codex Plugins**, open `exa` or `feishu2codex`, and install it.

Use the Git repository URL, not a raw `marketplace.json` URL. Codex clones the repository and discovers `.agents/plugins/marketplace.json` automatically.

### CLI

```bash
codex plugin marketplace add \
  'https://github.com/zlsbksdxl/codex-plugins.git' \
  --ref main \
  --sparse '.agents/plugins' \
  --sparse 'plugins'

codex plugin list --marketplace codex-plugins --available --json
codex plugin add exa@codex-plugins
codex plugin add feishu2codex@codex-plugins
```

Fully restart the ChatGPT/Codex desktop app after installation, then use a new task so Skills and MCP servers are reloaded.

## Configure Exa

The plugin uses Exa's official remote MCP OAuth endpoint. During installation, or the first time Exa is used, Codex opens an account connection flow. Sign in to Exa and approve access; no API key needs to be pasted into the repository or plugin configuration.

## Configure Feishu/Lark

After installation, start a new task and ask:

> Set up and connect Feishu/Lark to Codex.

The bundled `lark-setup` Skill checks for `lark-cli`, installs the matching official runtime if it is missing, initializes the app configuration, and starts browser/device OAuth. The equivalent manual commands are:

```bash
npx @larksuite/cli@1.0.73 install
lark-cli config init
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

Credentials remain local to the user. Grant only the scopes needed for the intended workflows.

## Update

```bash
codex plugin marketplace upgrade codex-plugins
codex plugin add exa@codex-plugins
codex plugin add feishu2codex@codex-plugins
```

## Repository structure

```text
.
├── .agents/plugins/marketplace.json
└── plugins/
    ├── exa/
    └── feishu2codex/
```

Each plugin has its own manifest, version, Skills, assets, and runtime requirements. The marketplace handles discovery and installation. Exa authentication is delegated to the official OAuth service; Feishu/Lark credentials stay in the official CLI's local configuration and OS credential storage.

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
