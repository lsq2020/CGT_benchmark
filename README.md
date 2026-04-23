# 🧫 CGT Agent benchmark — 题目收集与管理平台

基因与细胞治疗 AI Agent 评测基准,面向科研团队的开放出题、审核、全生命周期管理平台。

## 快速启动

```bash
cd /data/siqing/2026_workpalce/20260421_proteinmaster/webapp_CGT
bash start.sh          # 默认 5000 端口
bash start.sh 8080     # 或指定端口
```

首次启动会自动安装依赖并在本地模式下创建 `backend/cgt_bench.db`。

打开浏览器访问 `http://localhost:5000` 即可使用。

## 目录结构

```
webapp_CGT/
├── backend/
│   ├── app.py              # Flask 应用 + REST API
│   ├── db.py               # 数据库初始化
│   ├── validators.py       # 字段校验
│   ├── export_utils.py     # Excel/JSON/Markdown 导出
│   ├── requirements.txt
│   └── cgt_bench.db        # 本地 SQLite(首次启动自动创建)
├── static/
│   ├── index.html
│   ├── css/styles.css
│   └── js/
│       ├── app.js
│       └── constants.js
├── render.yaml
├── start.sh
└── README.md
```

## 核心功能

- **4 个标签页**: 提交题目 / 已提交 / 已审核题目 / 题库总览
- **4 个难度层级**: L1 精准事实检索 / L2 生物逻辑推演 / L3 实验方案设计 / L4 转化决策与创新
- **3 个领域大类**: 递送系统 C1 / 基因治疗 C2 / 细胞工程 C3
- **Rubric 采分点**: 3-5 个采分点,总分必须为 10
- **双角色切换**: 出题人 / 审核员 (右上角下拉切换,存 localStorage)
- **批量导出**: xlsx / json / markdown 三种格式
- **实时看板**: 已收集 / 目标 / 已审核 / 待审核 / 需修改

## 角色权限

| 角色 | 权限 |
|---|---|
| 出题人 | 提交、编辑/撤回自有待审核题目、查看审核状态与意见、编辑重提、导出公开已审核题目 |
| 审核员 | 所有出题人权限 + 查看全量、进入单题审核页修改状态、填写审核意见、导出全量已审核题目 |

## 使用流程

1. 右上角切换身份,填写姓名 (存 localStorage,下次打开自动记住)
2. 「提交题目」填写表单 — 注意 Rubric 总分必须 = 10,3-5 个采分点
3. 「已提交」查看自有待审核题目,可编辑或撤回
4. 切换到审核员 — 「已审核题目」进入审核,给出「已审核」或「需修改」
5. 「题库总览」浏览已通过题目,按需导出

## 数据位置

- 本地开发: 默认存储在 `backend/cgt_bench.db`,也可通过 `DB_PATH` 指定其他 SQLite 文件
- Render / 生产环境: 如果设置 `DATABASE_URL`,后端会自动改用 Postgres
- 本地 SQLite 备份: 直接复制数据库文件即可

> 注意: Render Web Service 的本地文件系统不是可靠数据库存储。如果没有设置 `DATABASE_URL`,应用会使用 SQLite,服务重启、重部署或实例迁移后可能看起来像“数据消失”。生产环境请连接 Render Postgres。

## API 文档

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/stats` | 看板数据 |
| GET | `/api/questions` | 列表,支持 status/difficulty/domain/author_name/q/sort 参数 |
| POST | `/api/questions` | 提交 |
| GET | `/api/questions/<id>` | 详情 |
| PUT | `/api/questions/<id>` | 更新 |
| DELETE | `/api/questions/<id>` | 撤回 |
| POST | `/api/questions/<id>/review` | 审核 |
| GET | `/api/questions/export?format=xlsx\|json\|md` | 导出 |

请求头传递角色信息:
- `X-Role`: `submitter` 或 `reviewer`
- `X-User-Name`: 当前用户姓名(前端会自动编码)

## Render 部署(Postgres)

这个项目已经支持:
- 本地使用 SQLite
- Render 上通过 `DATABASE_URL` 自动切换到 Postgres

### 方式 1: 用仓库里的 `render.yaml`

1. 把项目推到 GitHub
2. 在 Render 里选择 `Blueprint`
3. 选择这个仓库
4. Render 会按 [`render.yaml`](./render.yaml) 创建:
   - 1 个 Python Web Service: `cgt-bench`
   - 1 个 Postgres 数据库: `cgt-bench-db`

默认启动命令:

```bash
cd backend && gunicorn app:app --bind 0.0.0.0:$PORT
```

### 方式 2: 手动创建

1. 新建一个 `Postgres` 数据库,例如 `cgt-bench-db`
2. 新建一个 `Web Service`
3. 选择你的 GitHub 仓库
4. 填写:

```bash
Build Command: pip install -r backend/requirements.txt
Start Command: cd backend && gunicorn app:app --bind 0.0.0.0:$PORT
```

5. 在环境变量里配置:

```bash
DATABASE_URL=<Render Postgres Internal Database URL>
```

### 部署说明

- 应用启动时会自动执行建表
- Render 上只要正确设置 `DATABASE_URL`,就不再使用 SQLite,因此重启或重新部署不会丢数据
- 在 Render Logs 里看到 `Database backend: Postgres` 才表示已经连上 Postgres
- 如果以后迁移到别的 Postgres 服务,只需要替换 `DATABASE_URL`

## 暂未实现 (后续可增)

- 真实登录鉴权 (JWT / session)
- 非结构化数据文件上传
- 定时备份
- 审计日志
- 更细粒度权限体系
