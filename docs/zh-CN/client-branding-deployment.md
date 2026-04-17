# 客户品牌化部署指南

本文档用于交付带有客户品牌定制的 Dify 前端版本，涵盖本地源码验证和 Docker 自托管部署两种路径。

## 这份定制版包含什么

这份定制版主要用于统一客户品牌展示，默认支持以下内容：

- 应用标题
- 默认 Logo 与深色模式 Logo
- 站点图标资源
- 全局品牌主题色和视觉覆盖

## 部署方式

根据你的目标，可以选择以下两种方式。

### 方式一：直接运行本地源码前端

当你需要优先确认客户 Logo、标题、按钮颜色、安装页视觉效果时，优先使用这种方式。

#### 前置条件

- Node.js
- Corepack 或 pnpm
- 本地可访问的 Dify 后端，默认按 `http://localhost` 处理

#### 安装依赖

```bash
cd web
corepack enable
corepack pnpm install
```

#### 创建前端环境文件

```bash
cp .env.example .env.local
```

在 `web/.env.local` 中至少配置这些值：

```bash
NEXT_PUBLIC_DEPLOY_ENV=DEVELOPMENT
NEXT_PUBLIC_EDITION=SELF_HOSTED
NEXT_PUBLIC_API_PREFIX=http://localhost/console/api
NEXT_PUBLIC_PUBLIC_API_PREFIX=http://localhost/api
NEXT_PUBLIC_COOKIE_DOMAIN=
```

说明：

- `NEXT_PUBLIC_API_PREFIX` 必须指向控制台接口。
- `NEXT_PUBLIC_PUBLIC_API_PREFIX` 必须指向应用公开接口。
- 如果前后端分别运行在不同子域名下，需要将 `NEXT_PUBLIC_COOKIE_DOMAIN` 作为开关启用，通常设置为 `1`，并保证它们仍属于同一个顶级域名。

#### 启动前端

```bash
corepack pnpm run dev
```

启动后打开：

- `http://localhost:3000/install`：检查安装页上的品牌样式是否生效
- `http://localhost:3000`：查看本地源码版前端首页

这条路径最适合做客户交付前的视觉验收。

### 方式二：使用 Docker Compose 部署完整服务

当你需要启动完整的 Dify 自托管服务时，使用这种方式。

#### 初始化 Docker 环境

```bash
cd docker
cp .env.example .env
```

启动前建议重点确认 `docker/.env` 中这些字段：

- `CONSOLE_API_URL`
- `CONSOLE_WEB_URL`
- `SERVICE_API_URL`
- `APP_API_URL`
- `APP_WEB_URL`
- `COOKIE_DOMAIN`
- `NEXT_PUBLIC_COOKIE_DOMAIN`

推荐规则：

- 如果控制台、API 和应用都使用同一个域名，可以先保持这些 URL 为空。
- 如果控制台、API 或应用部署在不同域名下，需要显式填写对应 URL。
- 如果前后端运行在不同子域名下，需要同时设置 `COOKIE_DOMAIN` 和 `NEXT_PUBLIC_COOKIE_DOMAIN`。

#### 品牌化注意事项

Docker 默认的 `web` 服务使用的是官方发布镜像，而不是你本地修改过的 `web` 源码。
如果你要先确认这次品牌化代码本身的效果，请优先使用“方式一”运行本地源码前端；确认无误后，再决定是否构建自定义镜像。

#### 启动服务

```bash
docker compose up -d
```

启动后打开：

- `http://localhost/install`：完成首次初始化

## 替换客户资源文件

正式交付给客户时，通常只需要替换这些路径对应的资源文件。

当前默认资源路径为：

- `/logo/logo.svg`
- `/logo/logo-monochrome-white.svg`
- `/logo/logo-site.png`
- `/logo/logo-site-dark.png`

如果你只是更换客户 Logo，保持这些文件名不变会最省事。
如果你要改成新的命名方式，记得同步更新 `web/app/branding.ts`。

## 建议交付流程

1. 在 `web/app/branding.ts` 中填写客户标题、Logo 和品牌配置。
2. 通过 `corepack pnpm run dev` 本地确认视觉效果。
3. 发布前执行前端校验：
   - `corepack pnpm type-check:tsgo`
   - `corepack pnpm test app/components/base/logo/__tests__/dify-logo.spec.tsx app/components/base/logo/__tests__/logo-site.spec.tsx`
4. 确认页面无误后，再用 Docker Compose 部署完整服务。

## 常见问题

- 如果 Docker 服务已经启动，但看不到本地品牌化改动，通常是因为你看到的是官方 `web` 镜像，而不是本地源码前端。
- 如果登录状态无法跨子域名共享，优先检查 `COOKIE_DOMAIN` 和 `NEXT_PUBLIC_COOKIE_DOMAIN`。
- 如果前端加载不到数据，优先检查 `NEXT_PUBLIC_API_PREFIX` 和 `NEXT_PUBLIC_PUBLIC_API_PREFIX` 是否正确。
