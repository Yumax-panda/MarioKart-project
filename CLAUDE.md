# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo for a blog application with a Next.js frontend and Cloudflare Workers API backend. The project uses pnpm workspaces, TypeScript, and shared schema validation across frontend and backend.

## Development Commands

### Root-level commands
- `pnpm dev` - Start all apps in development mode (blog on port 3001, API via Wrangler)
- `pnpm build` - Build all packages and apps
- `pnpm check-types` - Type check all packages
- `pnpm check` - Run Biome linter/formatter checks
- `pnpm fix` - Auto-fix Biome issues
- `pnpm fix:unsafe` - Apply unsafe fixes + safe fixes

### Blog app (apps/blog)
- `pnpm --filter blog dev` - Run Next.js dev server on port 3001 with Turbopack
- `pnpm --filter blog build` - Build Next.js app
- `pnpm --filter blog typegen` - Generate Next.js TypeScript types
- `pnpm --filter blog check-types` - Type check after generating types
- `pnpm --filter blog storybook` - Run Storybook on port 6006

### API app (apps/api)
- `pnpm --filter api dev` - Run Wrangler dev server for Cloudflare Workers
- `pnpm --filter api build` - Build API (runs cf-typegen + tsc)
- `pnpm --filter api cf-typegen` - Generate Cloudflare bindings types
- `pnpm --filter api db:generate` - Generate Prisma Client (no engine)
- `pnpm --filter api db:migrate` - Run Prisma migrations in dev
- `pnpm --filter api db:deploy` - Deploy Prisma migrations to production
- `pnpm --filter api db:studio` - Open Prisma Studio
- `pnpm --filter api deploy` - Deploy to Cloudflare Workers (minified)

### Schema package (packages/schema)
- `pnpm --filter @repo/schema build` - Compile TypeScript schemas to dist/
- `pnpm --filter @repo/schema dev` - Watch mode compilation

## Architecture

### Monorepo Structure
- **apps/blog**: Next.js 16 frontend with App Router, Tailwind CSS 4, Storybook, and Vitest
- **apps/api**: Cloudflare Workers API using Hono framework with Prisma + Accelerate
- **packages/schema**: Shared Zod schemas for type-safe validation across frontend and backend
- **packages/tailwind-config**: Shared Tailwind CSS configuration
- **packages/typescript-config**: Shared TypeScript configurations

### API Architecture (apps/api)

The API uses dependency injection (tsyringe) with a repository pattern:

- **Entry point**: `src/router/index.ts` - Sets up Hono app with DI container, registers all repositories as singletons
- **Repository layer**: `src/repository/` - Database access abstraction
  - `repository.ts` - Main Repository class that aggregates all domain repositories
  - Individual repositories: `authState.ts`, `posts.ts`, `sessions.ts`, `tags.ts`, `users.ts`, `accounts.ts`
  - `types/` - TypeScript interfaces for each repository
- **Routes**: `src/router/v1/` and `src/router/auth/` - API endpoint handlers
- **RPC client**: `src/lib/rpc.ts` - Exports typed client for frontend consumption using Hono's RPC feature
- **Database**: Prisma with PostgreSQL via Prisma Accelerate

### Database Schema

Key models in `apps/api/prisma/schema.prisma`:
- **User**: Users with name, email, image
- **Account**: OAuth provider accounts (Discord)
- **Post**: Blog posts with title, article (markdown), thumbnail, tags, published status
- **Tag**: Tags with many-to-many relationship to posts via TagsOnPosts
- **Session**: User sessions with token and expiry
- **AuthState**: OAuth state tracking for Discord authentication

### Frontend-Backend Communication

The blog app imports the API's RPC client type:
```typescript
import type { Client } from "api/lib/rpc";
```

This provides end-to-end type safety from backend routes to frontend API calls.

### Shared Schema Package

Located in `packages/schema/src/`, contains Zod schemas for:
- `auth/discord.ts` - Discord OAuth validation
- `post.ts` - Post creation/update schemas
- `presignedURL.ts` - S3 presigned URL validation
- `utils.ts` - Shared utility schemas

Both apps import from `@repo/schema` to ensure consistent validation.

### External Services

- **Database**: PostgreSQL via Prisma Accelerate (connection pooling for serverless)
- **Storage**: AWS S3/Cloudflare R2 for images/uploads with presigned URLs
- **Auth**: Discord OAuth (server-side flow)
- **Hosting**: Cloudflare Workers for API, Next.js deployment for frontend

## Configuration Files

- **wrangler.jsonc**: Cloudflare Workers config with dev/production environments
- **biome.json**: Biome linter/formatter settings (space indentation, import organization, CSS support)
- **turbo.json**: Turborepo pipeline with dev task depending on api#build
- **pnpm-workspace.yaml**: Defines `apps/*` and `packages/*` as workspace members

## Important Notes

- The API must be built before running `pnpm dev` (Turbo handles this via `dependsOn: ["api#build"]`)
- Prisma Client uses `--no-engine` flag for Cloudflare Workers compatibility
- Next.js config has `ignoreBuildErrors: true` (consider fixing type errors instead)
- CORS is configured to allow `http://localhost:3001` in API
- Discord authentication requires `ALLOWED_DISCORD_SERVER_ID` to restrict access
- Environment variables are defined in `wrangler.jsonc` (dev/production sections)
