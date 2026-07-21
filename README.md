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

### Lark CLI business capabilities

| Area | Capabilities |
| --- | --- |
| Calendar | View, create, search, and update events; manage attendees, invitations, meeting rooms, free/busy status, and time suggestions. |
| Messenger | Send and reply to messages, create and manage chats and members, search history and threads, transfer media, add reactions, process interactive cards, and send urgent notifications. |
| Docs | Create, read, and update documents; handle document media, embedded resources, whiteboards, and mind notes. |
| Drive | Upload, download, search, copy, move, delete, import, and export files; manage folders, metadata, permissions, comments, subscriptions, versions, and secure labels. |
| Markdown | Create, fetch, patch, overwrite, compare, and upload Drive-native Markdown files. |
| Base | Manage tables, fields, records, views, formulas, lookups, forms, dashboards, workflows, roles, permissions, and aggregated analysis. |
| Sheets | Create workbooks and sheets; read and write cells, formulas, styles, images, and comments; manage charts, pivot tables, filters, conditional formatting, and imports or exports. |
| Slides | Create presentations, read content, and add, remove, read, or partially replace individual slides. |
| Tasks | Create, query, update, complete, and organize tasks, lists, subtasks, assignees, reminders, comments, attachments, and task agents. |
| Wiki | Create and manage knowledge spaces, members, nodes, documents, shortcuts, and node hierarchies. |
| Contacts | Resolve people by name, email, phone number, or Open ID and retrieve profiles, departments, contact details, status, and signatures. |
| Mail | Browse, search, and read mail; create and edit drafts; send, reply to, forward, recall, label, and watch messages; manage contacts and inbox rules. |
| Meetings | Search historical meetings and retrieve participants, summaries, action items, chapters, transcripts, Minutes artifacts, and recordings. |
| Attendance | Query the signed-in user's attendance check-in records. |
| Approval | Search approval definitions; initiate and inspect instances; query, approve, reject, transfer, roll back, add signers to, remind, cancel, or CC approval work. |
| OKR | Query, create, and update cycles, objectives, key results, alignment, metrics, and progress records. |
| Miaoda/Spark Apps | Create and develop apps, publish HTML and full-stack projects, manage cloud generation, databases, files, environments, roles, observability, access scope, and automation. |

### Plugin workflow and extension capabilities

| Capability | What it adds |
| --- | --- |
| Setup and authorization | Installs the matching Lark CLI runtime, initializes app configuration, guides browser/device OAuth, verifies identities, and manages scopes. |
| Whiteboards | Export whiteboards as images or raw nodes and update diagrams through supported structured formats. |
| Minutes and meeting notes | Search, upload, download, read, and edit Minutes artifacts; retrieve a known meeting note's metadata, linked document, and raw transcript. |
| Live meeting agent | Join or leave active meetings as an app bot, inspect live meeting events, and send in-meeting text or reactions where enabled. |
| Real-time events | Subscribe to and consume Feishu/Lark events as bounded or long-running NDJSON streams for messages, approvals, tasks, meetings, Minutes, and whiteboards. |
| Meeting-summary workflow | Aggregate meetings over a time range into a structured summary report. |
| Standup workflow | Combine calendar agendas and unfinished tasks into daily or weekly standup summaries. |
| OpenAPI explorer | Discover and call official Feishu OpenAPI endpoints not yet covered by a packaged command. |
| Custom Skill maker | Turn repeatable Lark CLI or OpenAPI operations into reusable Skills. |

Lark CLI supports user and bot identities, scoped OAuth, structured JSON output, dry-run previews, and confirmation gates for high-risk writes. The plugin keeps those controls in the Codex workflow.

**Not included:** Feishu Projects/Meegle. The upstream Lark CLI README delegates that domain to the separate [meegle-cli](https://github.com/larksuite/meegle-cli), and this plugin does not currently package it. Other capabilities depend on the tenant's enabled products, app scopes, user OAuth scopes, and rollout eligibility. Miaoda/Spark is Feishu-only, and live meeting agent actions require additional app privileges.

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
