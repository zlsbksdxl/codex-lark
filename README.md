# zlsbksdxl Codex Plugins

[English](README.en.md)

这是一个可通过 Git 安装的 Codex 插件市场，目前包含 Exa 网络搜索和飞书/Lark 两个插件。

> 本仓库是社区维护的集成，不代表 Exa 或 LarkSuite/飞书官方发布。插件调用对应的官方服务与运行时，使用时仍需遵守各服务的条款。

## 插件

| 插件 | 功能 | 额外要求 |
| --- | --- | --- |
| `exa` | 使用 Exa MCP 搜索网络、获取网页全文；一般网络检索会优先调用 Exa | Node.js 16+、`npx`、用户自己的 Exa API Key |
| `feishu2codex` | 为飞书/Lark 文档、知识库、多维表格、消息、日历、任务、会议、邮箱、审批等工作流提供 27 个 Codex Skills | Node.js 16+、官方 `lark-cli`、飞书/Lark 应用与 OAuth 授权 |

## 安装 Marketplace

```bash
codex plugin marketplace add zlsbksdxl/codex-plugins
```

安装需要的插件：

```bash
codex plugin add exa@zlsbksdxl-codex-plugins
codex plugin add feishu2codex@zlsbksdxl-codex-plugins
```

安装后请完全重启 ChatGPT/Codex 桌面应用，并在新任务中使用插件，以便重新加载 Skills 和 MCP。

## 配置 Exa

1. 从 [Exa Dashboard](https://dashboard.exa.ai/api-keys) 获取自己的 API Key。
2. 在本机创建 `~/.codex/mcp/exa-mcp.env`，内容如下：

```bash
mkdir -p ~/.codex/mcp
```

```dotenv
EXA_API_KEY=your_exa_api_key
```

3. 限制文件权限：

```bash
chmod 600 ~/.codex/mcp/exa-mcp.env
```

不要把真实 API Key 写入本仓库、issue、日志或聊天记录。插件也支持从进程环境变量 `EXA_API_KEY` 读取密钥。

## 配置飞书/Lark

安装官方 CLI：

```bash
npx @larksuite/cli@latest install
```

完成应用配置和 OAuth 登录：

```bash
lark-cli config init
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

凭据保存在用户本机，不应提交到此仓库。建议按实际任务申请最小权限，而不是长期授予不需要的 scope。

## 更新

```bash
codex plugin marketplace upgrade zlsbksdxl-codex-plugins
codex plugin add exa@zlsbksdxl-codex-plugins
codex plugin add feishu2codex@zlsbksdxl-codex-plugins
```

## 仓库结构

```text
.
├── .agents/plugins/marketplace.json
└── plugins/
    ├── exa/
    └── feishu2codex/
```

每个插件拥有独立的 manifest、版本、Skills、资源和运行时要求。Marketplace 只负责发现与安装，不会共享你的 Exa Key、飞书应用凭据或 OAuth Token。

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
