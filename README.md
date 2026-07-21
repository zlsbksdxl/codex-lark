# Codex Lark

English | [简体中文](README.zh-CN.md)

A Git-backed Codex Marketplace for Feishu/Lark workflows through the official [Lark CLI](https://github.com/larksuite/cli).

> This is a community-maintained integration and is not an official LarkSuite/Feishu release.

## Plugin

| Plugin | Purpose | Requirements |
| --- | --- | --- |
| `feishu2codex` | Adds 27 upstream Lark CLI Skills plus a guided setup Skill for Docs, Wiki, Base, messaging, calendar, tasks, meetings, mail, approvals, and more. | Node.js/npm for first-use runtime setup, plus Feishu/Lark OAuth authorization |

## Features

The plugin packages the agent-oriented workflows from the official [Lark CLI](https://github.com/larksuite/cli) so Codex can work across Feishu/Lark through structured CLI commands.

| Area | Capabilities |
| --- | --- |
| Messaging | Send and reply to messages, search chat history, manage chats and members, handle media, reactions, interactive cards, and urgent notifications. |
| Docs and Drive | Create, read, and edit documents; upload, download, organize, search, import, and export files; manage permissions, comments, versions, and secure labels. |
| Markdown, Wiki, and Whiteboards | Edit native Markdown files, manage knowledge spaces and nodes, and inspect or update embedded whiteboards. |
| Sheets and Base | Build and edit spreadsheets, formulas, charts, pivot tables, and formatting; manage Base tables, fields, records, views, forms, dashboards, workflows, and roles. |
| Slides | Create presentations, read slide content, and add, remove, or update individual slides. |
| Calendar and Tasks | Manage events, attendees, rooms, availability, and scheduling; create and organize tasks, lists, subtasks, reminders, assignees, and attachments. |
| Meetings and Minutes | Search past meetings, retrieve summaries, action items, chapters, transcripts, recordings, and Minutes artifacts; support authorized in-meeting agent actions. |
| Mail and Contacts | Search, read, draft, send, reply to, and forward mail; manage mail rules and resolve people by name, email, phone number, or Open ID. |
| Approvals, Attendance, and OKRs | Query and process approval tasks and instances, inspect personal attendance records, and manage objectives, key results, alignment, metrics, and progress. |
| Apps, Events, and Automation | Create and publish Miaoda/Spark apps, manage environments and automation, consume real-time Feishu events, and generate meeting-summary or standup reports. |
| Extensibility | Explore raw Feishu OpenAPI operations not covered by existing commands and package repeatable API workflows as custom Skills. |

Lark CLI supports user and bot identities, scoped OAuth, structured JSON output, dry-run previews, and confirmation gates for high-risk writes. The plugin keeps those controls in the Codex workflow.

## Add This Marketplace to Codex

### Desktop app

1. Open **Codex → Plugins**.
2. Open the Marketplace source menu beside the plugin search field and select **+ Add More**.

   ![Open the Add marketplace command](docs/images/add-marketplace-menu.png)

3. Paste this repository URL:

   ```text
   https://github.com/zlsbksdxl/codex-lark.git
   ```

   ![Enter the Codex Lark repository URL](docs/images/add-marketplace-dialog.png)

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

Fully restart the ChatGPT/Codex desktop app after installation, review and trust the plugin's setup hook, then use a new task so the Skills and hook are loaded.

## Connect Feishu/Lark

Start a new task and ask:

> Set up and connect Feishu/Lark to Codex.

Codex does not run arbitrary commands inside the Marketplace install transaction. On the first new task, the plugin's trusted setup hook installs the matching `lark-cli` runtime if it is missing and requires setup before Feishu/Lark workflows are treated as ready. The bundled `lark-setup` Skill then initializes app configuration and starts browser/device OAuth. The equivalent manual commands are:

```bash
npm install --global --no-audit --no-fund @larksuite/cli@1.0.73
lark-cli config init --new
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

Credentials remain local to the user. Grant only the scopes needed for the intended workflows.

## Update

```bash
codex plugin marketplace upgrade codex-lark
codex plugin add feishu2codex@codex-lark
```

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
