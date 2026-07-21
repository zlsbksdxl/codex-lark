# Feishu to Codex

Community packaging of the Skills from the official [Lark CLI](https://github.com/larksuite/cli) project, plus a Codex setup Skill.

The bundled Skills are synced from [`larksuite/cli@6675e3c`](https://github.com/larksuite/cli/commit/6675e3c2472f773035524d57651a081f81c7fd06), CLI version `1.0.73`.

After installing the plugin, start a new task and ask:

> Set up and connect Feishu/Lark to Codex.

The `lark-setup` Skill checks for the official runtime, installs the matching version when needed, and then follows the browser/device OAuth flow. Manual fallback:

```bash
npx @larksuite/cli@1.0.73 install
```

Then configure and authorize it locally:

```bash
lark-cli config init
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

The plugin does not contain application secrets, OAuth tokens, or local configuration. `lark-cli` keeps credentials in its local configuration and OS credential storage. See the repository [README](../../README.md#connect-feishulark) for complete installation instructions.
