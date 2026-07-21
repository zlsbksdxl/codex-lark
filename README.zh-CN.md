# Codex Lark

[English](README.md) | 简体中文

这是一个通过官方 [Lark CLI](https://github.com/larksuite/cli) 提供飞书/Lark 工作流的 Git-backed Codex Marketplace。

> 本仓库由社区维护，不代表 LarkSuite/飞书官方发布。

## 插件

| 插件 | 功能 | 额外要求 |
| --- | --- | --- |
| `feishu2codex` | 提供 27 个上游 Lark CLI Skills 和 1 个引导设置 Skill，覆盖文档、知识库、多维表格、消息、日历、任务、会议、邮箱、审批等工作流 | 首次设置运行时需要 Node.js/npm，并需完成飞书/Lark OAuth 授权 |

## 在 Codex 中添加这个 Marketplace

### 桌面应用

1. 打开 **Codex → Plugins**。
2. 打开插件搜索框旁的 Marketplace 来源菜单，选择 **+ Add More**。

   ![打开 Add marketplace 菜单](docs/images/add-marketplace-menu.png)

3. 粘贴本仓库地址：

   ```text
   https://github.com/zlsbksdxl/codex-lark.git
   ```

   ![输入 Codex Lark 仓库地址](docs/images/add-marketplace-dialog.png)

4. 选择 **Codex Lark**，打开 `feishu2codex` 并安装。

必须填写 Git 仓库 URL，不要填写原始 `marketplace.json` URL。Codex 会克隆仓库并自动发现 `.agents/plugins/marketplace.json`。

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

安装后请完全重启 ChatGPT/Codex 桌面应用，并在新任务中使用插件，以便重新加载 Skills。

## 连接飞书/Lark

新建一个任务并输入：

> 帮我设置并连接飞书/Lark 到 Codex。

内置的 `lark-setup` Skill 会检查 `lark-cli`，缺失时安装与插件匹配的官方运行时，然后初始化应用配置并启动浏览器/设备 OAuth。对应的手动命令如下：

```bash
npx @larksuite/cli@1.0.73 install
lark-cli config init
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

凭据保存在用户本机。建议按实际任务申请最小权限。

## 更新

```bash
codex plugin marketplace upgrade codex-lark
codex plugin add feishu2codex@codex-lark
```

## 从原合并 Marketplace 迁移

原 `codex-plugins` Marketplace 已拆分为本仓库和 [codex-exa](https://github.com/zlsbksdxl/codex-exa)。如果旧 Marketplace 仍在配置中，请先移除其插件实例和来源：

```bash
codex plugin remove exa@codex-plugins
codex plugin remove feishu2codex@codex-plugins
codex plugin marketplace remove codex-plugins
```

然后按上面的命令添加 `codex-lark`，并根据 `codex-exa` 的 README 添加 Exa 插件。

## 仓库结构

```text
.
├── .agents/plugins/marketplace.json
└── plugins/
    └── feishu2codex/
```

## 上游与许可证

- [Lark CLI](https://github.com/larksuite/cli), MIT
- 本仓库的打包和文档使用 [MIT License](LICENSE)

## 开发与校验

```bash
./scripts/validate-marketplace.sh
```

GitHub Actions 会对每次 push 和 pull request 执行同一结构校验。发布前还应使用 Codex 的 `plugin-creator` 和 `skill-creator` 校验器检查插件与 Skills。

安全问题请参阅 [SECURITY.md](SECURITY.md)。
