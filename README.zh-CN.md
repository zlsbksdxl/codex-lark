# Codex Lark

[English](README.md) | 简体中文

这是一个通过官方 [Lark CLI](https://github.com/larksuite/cli) 提供飞书/Lark 工作流的 Git-backed Codex Marketplace。

> 本仓库由社区维护，不代表 LarkSuite/飞书官方发布。

## 插件

| 插件 | 功能 | 额外要求 |
| --- | --- | --- |
| `feishu2codex` | 提供 27 个上游 Lark CLI Skills 和 1 个引导设置 Skill，覆盖文档、知识库、多维表格、消息、日历、任务、会议、邮箱、审批等工作流 | 首次设置运行时需要 Node.js/npm，并需完成飞书/Lark OAuth 授权 |

## 插件功能

本插件将官方 [Lark CLI](https://github.com/larksuite/cli) 面向 AI Agent 的工作流打包到 Codex，通过结构化 CLI 命令操作飞书/Lark。

### Lark CLI 业务能力

| 领域 | 支持的能力 |
| --- | --- |
| 日历 | 查看、创建、搜索和更新日程，管理参会人、邀请回复、会议室、忙闲和时间建议。 |
| 即时通讯 | 发送和回复消息，创建和管理群聊与成员，搜索聊天记录和话题，传输媒体文件，添加表情回复，处理交互卡片和发送加急消息。 |
| 云文档 | 创建、读取和更新文档，处理文档素材、嵌入资源、画板和思维笔记。 |
| 云空间 | 上传、下载、搜索、复制、移动、删除、导入和导出文件，管理文件夹、元数据、权限、评论、订阅、版本和密级标签。 |
| Markdown | 创建、读取、局部 patch、覆盖、比较和上传云空间中的原生 Markdown 文件。 |
| 多维表格 | 管理数据表、字段、记录、视图、公式、lookup、表单、仪表盘、工作流、角色、权限和聚合分析。 |
| 电子表格 | 创建工作簿与工作表；读写单元格、公式、样式、图片和批注；管理图表、透视表、筛选器、条件格式及导入导出。 |
| 幻灯片 | 创建演示文稿、读取内容，以及新增、删除、读取或局部替换单个页面。 |
| 任务 | 创建、查询、更新、完成和组织任务、清单、子任务、负责人、提醒、评论、附件和任务智能体。 |
| 知识库 | 创建和管理知识空间、成员、节点、文档、快捷方式和节点层级。 |
| 通讯录 | 按姓名、邮箱、手机号或 Open ID 解析人员，并获取个人资料、部门、联系方式、状态和签名。 |
| 邮箱 | 浏览、搜索和阅读邮件；创建与编辑草稿；发送、回复、转发、撤回、标记和监听邮件；管理联系人和收信规则。 |
| 视频会议 | 搜索历史会议，获取参会人、总结、待办、章节、逐字稿、妙记产物和录制。 |
| 考勤打卡 | 查询当前登录用户的考勤打卡记录。 |
| 审批 | 搜索审批定义，发起和查看实例，查询、同意、拒绝、转交、回退、加签、催办、撤回或抄送审批任务。 |
| OKR | 查询、创建和更新周期、目标、关键结果、对齐关系、指标和进展记录。 |
| 妙搭 Spark/Miaoda 应用 | 创建和开发应用，发布 HTML 和全栈项目，管理云端生成、数据库、文件、环境、角色、可观测性、可用范围和自动化。 |

### 插件工作流与扩展能力

| 能力 | 补充功能 |
| --- | --- |
| 安装与授权 | 安装匹配的 Lark CLI 运行时，初始化应用配置，引导浏览器/设备 OAuth，验证身份并管理 scope。 |
| 画板 | 将画板导出为图片或原始节点，并通过支持的结构化格式更新画板。 |
| 妙记与会议纪要 | 搜索、上传、下载、读取和编辑妙记产物；读取已知会议纪要的元数据、关联文档和原始逐字稿。 |
| 会中 Agent | 在功能开通后以应用机器人身份加入或离开进行中的会议，读取会中事件，发送会中文本或表情。 |
| 实时事件 | 以有界或长时运行的 NDJSON 流订阅和消费消息、审批、任务、会议、妙记和画板事件。 |
| 会议汇总工作流 | 汇总指定时间范围内的会议内容，生成结构化报告。 |
| 站会摘要工作流 | 组合日历议程和未完成任务，生成每日或每周站会摘要。 |
| OpenAPI 探索 | 发现并调用现有封装命令未覆盖的飞书官方 OpenAPI。 |
| 自定义 Skill | 将可重复的 Lark CLI 或 OpenAPI 操作封装为可复用 Skill。 |

Lark CLI 支持用户与应用两种身份、按 scope 授权、结构化 JSON 输出、`dry-run` 预览和高风险写操作确认门禁；本插件在 Codex 工作流中保留这些安全控制。

**当前未包含：**飞书项目/Meegle。上游 Lark CLI README 将该领域交给独立的 [meegle-cli](https://github.com/larksuite/meegle-cli)，本插件目前没有打包它。其他能力仍取决于租户已开通的产品、应用 scope、用户 OAuth scope 和功能灰度。妙搭 Spark/Miaoda 仅适用于飞书品牌，会中 Agent 还需要额外的应用权限。

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

安装后请完全重启 ChatGPT/Codex 桌面应用，检查并信任插件的设置 Hook，然后在新任务中使用插件，以便加载 Skills 和 Hook。

## 连接飞书/Lark

新建一个任务并输入：

> 帮我设置并连接飞书/Lark 到 Codex。

Codex 不会在 Marketplace 安装事务内执行任意命令。首个新任务启动时，插件中已信任的设置 Hook 会在缺失时安装匹配的 `lark-cli` 运行时，并在完成设置前将飞书/Lark 工作流标记为未就绪。内置的 `lark-setup` Skill 随后初始化应用配置并启动浏览器/设备 OAuth。对应的手动命令如下：

```bash
npm install --global --no-audit --no-fund @larksuite/cli@1.0.73
lark-cli config init --new
lark-cli auth login --recommend
lark-cli auth status --json --verify
```

凭据保存在用户本机。建议按实际任务申请最小权限。

## 更新

```bash
codex plugin marketplace upgrade codex-lark
codex plugin add feishu2codex@codex-lark
```

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
