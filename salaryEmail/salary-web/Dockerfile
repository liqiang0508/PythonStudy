# syntax=docker/dockerfile:1

# ---------- 阶段 1：装依赖 + 类型检查 + 构建前端 ----------
FROM node:22-alpine AS build
WORKDIR /app

# 先只拷贝依赖清单，package.json / package-lock.json 没变时可复用缓存
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build          # vue-tsc --noEmit && vite build -> /app/dist

# ---------- 阶段 2：运行（tsx 直跑 TS 后端，同时托管 dist 静态页） ----------
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    APP_ENV=production \
    PORT=3001 \
    TZ=Asia/Shanghai

# 定时发送依赖容器内的本地时间，装一下时区数据
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# 后端用 tsx 跑 TS（tsx 在 devDependencies 里），所以整份 node_modules 都带过来
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json tsconfig.json ./
COPY server ./server
COPY shared ./shared

# 运行期数据：settings.json / db.json / .session-secret
VOLUME ["/app/server/data"]

EXPOSE 3001

# 健康检查：/api/auth/state 无需登录，返回 200 即视为健康
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3001/api/auth/state').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npx", "tsx", "server/src/index.ts"]
