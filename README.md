# Codex Lark

English | [简体中文](README.zh-CN.md)

A Git-backed Codex Marketplace for Feishu/Lark workflows through the official [Lark CLI](https://github.com/larksuite/cli).

> This is a community-maintained integration and is not an official LarkSuite/Feishu release.

## Plugin

| Plugin | Purpose | Requirements |
| --- | --- | --- |
| `feishu2codex` | Adds 27 upstream Lark CLI Skills plus a guided setup Skill for Docs, Wiki, Base, messaging, calendar, tasks, meetings, mail, approvals, and more. | Node.js/npm for first-use runtime setup, plus Feishu/Lark OAuth authorization |

## Add This Marketplace to Codex

### Desktop app

1. Open **Codex → Plugins**.
2. Open the Marketplace source menu beside the plugin search field and select **+ Add More**.
3. Paste this repository URL:

   ```text
   https://github.com/zlsbksdxl/codex-lark.git
   ```

4. Select **Codex Lark**, open `feishu2codex`, and install it.

Use the Git repository URL, not a raw `marketplace.json` URL. Codex clones the repository and discovers `.agents/plugins/marketplace.json` automatically.

### CLI

```bash
codex plugin marketplace add \
  'https://github.com/zlsbksdxl/codex-lark.git' \
  --ref main \
  --sparse '.agents/plugins' \
  --sparse 'plugins'

codex plugin list --marketplace codex-lark --available --json
codex plugin add feishu2codex@codex-lark
```

Fully restart the ChatGPT/Codex desktop app after installation, then use a new task so the Skills are reloaded.

## Connect Feishu/Lark

Start a new task and ask:

> Set up and connect Feishu/Lark to Codex.

The bundled `lark-setup` Skill checks for `lark-cli`, installs the matching official runtime if it is missing, initializes app configuration, and starts browser/device OAuth. The equivalent manual commands are:

```bash
npx @larksuite/cli@1.0.73 install
lark-cli config init
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

Credentials remain local to the user. Grant only the scopes needed for the intended workflows.

## Update

```bash
codex plugin marketplace upgrade codex-lark
codex plugin add feishu2codex@codex-lark
```

## Migrating from the Former Combined Marketplace

The original `codex-plugins` Marketplace was split into this repository and [codex-exa](https://github.com/zlsbksdxl/codex-exa). If the former Marketplace is still configured, remove its installed plugins and source before adding the two new repositories:

```bash
codex plugin remove exa@codex-plugins
codex plugin remove feishu2codex@codex-plugins
codex plugin marketplace remove codex-plugins
```

Then add `codex-lark` using the commands above and add `codex-exa` from its own README.

## Repository Structure

```text
.
├── .agents/plugins/marketplace.json
└── plugins/
    └── feishu2codex/
```

## Upstream and Licensing

- [Lark CLI](https://github.com/larksuite/cli), MIT
- Packaging and documentation in this repository: [MIT](LICENSE)

## Development and Validation

```bash
./scripts/validate-marketplace.sh
```

GitHub Actions runs the same structure check for every push and pull request. Before publishing, also validate the plugin and Skills with Codex's `plugin-creator` and `skill-creator` validators.

See [SECURITY.md](SECURITY.md) for credential and vulnerability reporting guidance.
