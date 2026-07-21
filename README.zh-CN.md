# Codex Plugins

[English](README.md) | 简体中文

这是一个可通过 Git 安装的 Codex 插件市场，目前包含 Exa 网络搜索和飞书/Lark 两个插件。

> 本仓库是社区维护的集成，不代表 Exa 或 LarkSuite/飞书官方发布。插件调用对应的官方服务与运行时，使用时仍需遵守各服务的条款。

## 插件

| 插件 | 功能 | 额外要求 |
| --- | --- | --- |
| `exa` | 通过官方 Exa 远程 MCP 搜索网络、获取网页全文；一般网络检索会优先调用 Exa | 通过浏览器 OAuth 连接 Exa 账号 |
| `feishu2codex` | 提供 27 个官方 Lark CLI Skills，并引导设置飞书/Lark 文档、知识库、多维表格、消息、日历、任务、会议、邮箱、审批等工作流 | 首次设置运行时需要 Node.js/npm，并需完成飞书/Lark OAuth 授权 |

## 在 Codex 中添加这个 Marketplace

### 桌面应用

1. 打开 **Codex → Plugins**。
2. 打开插件搜索框旁的 Marketplace 来源菜单，选择 **+ Add More**。
3. 粘贴本仓库地址：

   ```text
   https://github.com/zlsbksdxl/codex-plugins.git
   ```

4. 选择 **Codex Plugins**，打开 `exa` 或 `feishu2codex` 并安装。

这里必须填写 Git 仓库 URL，不要填写原始 `marketplace.json` 文件 URL。Codex 会克隆仓库并自动发现 `.agents/plugins/marketplace.json`。

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

安装后请完全重启 ChatGPT/Codex 桌面应用，并在新任务中使用插件，以便重新加载 Skills 和 MCP。

## 配置 Exa

插件使用 Exa 官方远程 MCP OAuth 地址。安装时或首次使用 Exa 时，Codex 会打开账号连接流程；登录 Exa 并确认授权即可，不需要把 API Key 粘贴到仓库或插件配置中。

## 配置飞书/Lark

安装后新建一个任务，并输入：

> 帮我设置并连接飞书/Lark 到 Codex。

内置的 `lark-setup` Skill 会检查 `lark-cli`，缺失时安装与插件匹配的官方运行时，然后初始化应用配置并启动浏览器/设备 OAuth。对应的手动命令如下：

```bash
npx @larksuite/cli@1.0.73 install
lark-cli config init
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

凭据保存在用户本机，不应提交到此仓库。建议按实际任务申请最小权限，而不是长期授予不需要的 scope。

## 更新

```bash
codex plugin marketplace upgrade codex-plugins
codex plugin add exa@codex-plugins
codex plugin add feishu2codex@codex-plugins
```

## 仓库结构

```text
.
├── .agents/plugins/marketplace.json
└── plugins/
    ├── exa/
    └── feishu2codex/
```

每个插件拥有独立的 manifest、版本、Skills、资源和运行时要求。Marketplace 负责发现与安装；Exa 认证交给官方 OAuth 服务，飞书/Lark 凭据保存在官方 CLI 的本地配置与系统凭据存储中。

## 上游与许可证

- Exa MCP: [exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server), MIT
- Lark CLI 与 Skills: [larksuite/cli](https://github.com/larksuite/cli), MIT
- 本仓库新增的打包、说明和启动脚本使用 [MIT License](LICENSE)

## 开发与校验

新增或更新插件后运行：

```bash
./scripts/validate-marketplace.sh
```

GitHub Actions 会对每次 push 和 pull request 执行相同的结构校验。发布前还应使用 Codex 的 `plugin-creator` 和 `skill-creator` 校验器检查具体插件内容。

安全问题请参阅 [SECURITY.md](SECURITY.md)。
