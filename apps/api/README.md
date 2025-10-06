# MarioKart-projectのバックエンド

## セットアップ

*.env*を作成して以下の行を追加
```txt
DATABASE_URL="your-database-url"
```
[Prisma Postgres](https://www.prisma.io/postgres)を使う想定.

```txt
pnpm i
pnpm db:generate
pnpm dev
```
