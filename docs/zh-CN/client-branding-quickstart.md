# 客户品牌化快速操作手册

这是一份给交付人员或客户运维使用的简版说明，目标是用最短路径完成品牌替换、页面验收和部署准备。

## 你需要改什么

交付前通常只需要确认两类内容：

1. 品牌配置
   - `web/app/branding.ts`
   - 应用标题
   - 默认 Logo 路径
   - 深色模式 Logo 路径
   - 站点图标路径

2. 品牌资源文件
   - `/logo/logo.svg`
   - `/logo/logo-monochrome-white.svg`
   - `/logo/logo-site.png`
   - `/logo/logo-site-dark.png`

如果只是替换客户 Logo，优先保持文件名不变，这样最省事。

## 如何快速验收页面效果

推荐先验收本地源码前端，而不是直接看 Docker 页面。

### 1. 启动本地前端

```bash
cd web
corepack enable
corepack pnpm install
cp .env.example .env.local
corepack pnpm run dev
```

### 2. 最少配置这些变量

```bash
NEXT_PUBLIC_DEPLOY_ENV=DEVELOPMENT
NEXT_PUBLIC_EDITION=SELF_HOSTED
NEXT_PUBLIC_API_PREFIX=http://localhost/console/api
NEXT_PUBLIC_PUBLIC_API_PREFIX=http://localhost/api
NEXT_PUBLIC_COOKIE_DOMAIN=
```

如果前后端在不同子域名下，启用：

```bash
NEXT_PUBLIC_COOKIE_DOMAIN=1
```

### 3. 打开验收页面

- `http://localhost:3000/install`
- `http://localhost:3000`

重点检查：

- Logo 是否为客户版本
- 标题是否正确
- 主按钮颜色是否符合品牌色
- 安装页和控制台的整体视觉是否一致

## Docker 部署前必须知道的一点

Docker 默认的 `web` 服务使用的是官方发布镜像，不一定会直接反映你本地刚改过的前端源码。

所以正确顺序是：

1. 先用本地源码前端确认品牌效果
2. 再准备 Docker 自托管部署
3. 如需完全一致的线上效果，再构建或替换自定义前端镜像

## 交付前检查清单

- 客户标题已写入 `web/app/branding.ts`
- 客户 Logo 文件已替换
- 本地页面已人工确认
- 前端校验已执行

建议执行：

```bash
corepack pnpm type-check:tsgo
corepack pnpm test app/components/base/logo/__tests__/dify-logo.spec.tsx app/components/base/logo/__tests__/logo-site.spec.tsx
```

## 需要更详细步骤时

如果你还需要完整部署说明，请继续参考：

- [客户品牌化部署指南](./client-branding-deployment.md)
