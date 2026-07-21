# Feishu to Codex

Community packaging of the Skills from the official [Lark CLI](https://github.com/larksuite/cli) project.

The bundled Skills are synced from [`larksuite/cli@6675e3c`](https://github.com/larksuite/cli/commit/6675e3c2472f773035524d57651a081f81c7fd06), CLI version `1.0.73`.

This plugin installs the Codex Skills only. Install the official runtime separately:

```bash
npx @larksuite/cli@latest install
```

Then configure and authorize it locally:

```bash
lark-cli config init
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

The plugin does not contain application secrets, OAuth tokens, or local configuration. See the repository [README](../../README.md#configure-feishulark) for complete installation instructions.
