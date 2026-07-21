# Feishu to Codex

Community packaging of the Skills from the official [Lark CLI](https://github.com/larksuite/cli) project.

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

The plugin does not contain application secrets, OAuth tokens, or local configuration. See the repository [README](../../README.md#配置飞书lark) for complete installation instructions.
