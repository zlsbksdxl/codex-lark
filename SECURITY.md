# Security Policy

## Credentials

Never commit or report real API keys, Lark/Feishu app secrets, OAuth tokens, verification URLs, device codes, cookies, or local configuration files.

- Store Exa credentials in `~/.codex/mcp/exa-mcp.env` with mode `600`, or provide `EXA_API_KEY` through the process environment.
- Store Lark/Feishu credentials only through the official `lark-cli` configuration and authentication flow.
- Revoke and rotate any credential that was accidentally committed, even if the commit is later deleted.

## Reporting

Report a suspected vulnerability privately to the repository owner through GitHub's private vulnerability reporting feature. Do not include live credentials or private user data in the report.

Security issues in Exa MCP or Lark CLI should also be reported to the corresponding upstream project.
