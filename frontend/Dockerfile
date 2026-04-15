#node:20-alpineはNode.jsの公式イメージ
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

#WORKDIR をappに設定
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; fi

COPY . .

EXPOSE 5173
