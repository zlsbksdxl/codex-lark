---
name: lark-setup
description: "Set up Feishu/Lark after installing feishu2codex: install the official lark-cli runtime if missing, initialize app configuration, start browser/device OAuth, and verify the signed-in account."
---

# Set up Feishu/Lark

Use this workflow when the user installs `feishu2codex`, asks to connect Feishu/Lark, or a bundled Lark skill cannot run because `lark-cli` is missing or unauthenticated.

## 1. Ensure the official runtime exists

Check without changing state:

```bash
command -v lark-cli && lark-cli --version
```

If `lark-cli` is missing, verify that `npx` is available, then install the runtime version matching the bundled Skills:

```bash
npx @larksuite/cli@1.0.73 install
```

Run `lark-cli --version` again and require version `1.0.73` before continuing. If `npx` is unavailable, tell the user that Node.js/npm is required and stop before attempting authentication.

## 2. Configure and authenticate

Read the sibling `../lark-shared/SKILL.md` completely, then follow its configuration and split OAuth flow exactly. In particular:

- initialize missing app configuration with `lark-cli config init --new`;
- prefer least-privilege domain or scope authorization for the user's intended workflow;
- return the unmodified verification URL and generate the required QR code;
- never print app secrets, access tokens, device codes, or stored credentials;
- verify completion with `lark-cli auth status --json --verify`.

Do not claim setup is complete until the verification response reports a valid signed-in user identity.
