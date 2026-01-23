# MLHub Technology Map

> Quick reference of all technologies and concepts. Use this to explore and learn on your own.

---

## 1. Frontend

### Core
- **Next.js 14** → App Router, file-based routing, layouts
- **React 18** → Hooks, Server Components, Client Components (`"use client"`)
- **TypeScript** → Types, interfaces, generics, type inference
- **Tailwind CSS** → Utility classes, responsive design, custom themes

### State & Data
- **Zustand** → Global state, stores, selectors
- **TanStack Query** → Server state, caching, mutations, invalidation

### Utilities
- **Lucide React** → Icon library
- **clsx + tailwind-merge** → Conditional classNames
- **class-variance-authority** → Component variants

---

## 2. Backend

### Core
- **Fastify** → Routes, plugins, hooks, request lifecycle
- **Bun** → Runtime, package manager, bundler
- **Pino** → Structured JSON logging

### Plugins
- `@fastify/cors` → Cross-origin requests
- `@fastify/helmet` → Security headers
- `@fastify/rate-limit` → Request throttling
- `@fastify/jwt` → Token authentication
- `@fastify/multipart` → File uploads
- `@fastify/swagger` → OpenAPI documentation

### Validation
- **Zod** → Schema definition, parsing, type inference

---

## 3. Database

### Storage
- **PostgreSQL 16** → Relational data, indexes, constraints
- **Redis 7** → Caching, sessions, rate limits, queues

### ORM
- **Prisma** → Schema, migrations, queries, relations
  - `prisma migrate` → Database versioning
  - `prisma generate` → Type-safe client
  - `prisma studio` → Data browser

---

## 4. Authentication

### Methods
- **JWT** → Access tokens, refresh tokens, expiry
- **API Keys** → Generation, hashing (SHA-256), scopes

### Security
- **bcrypt** → Password hashing, salt rounds
- **CORS** → Origin whitelist
- **Helmet** → CSP, XSS protection, HSTS

---

## 5. Background Jobs

### Queue System
- **BullMQ** → Jobs, workers, retries, progress
- **Redis** → Queue backend

### Job Types
- Build jobs → Docker image creation
- Prediction jobs → ML inference
- Webhook jobs → External notifications

---

## 6. File Storage

### Stack
- **AWS S3** → Production storage
- **MinIO** → Local S3-compatible dev

### Patterns
- Pre-signed URLs → Direct client uploads
- Multipart uploads → Large files
- `@aws-sdk/client-s3` → S3 operations

---

## 7. Payments

### Stripe
- **Customers** → User billing profiles
- **Connect** → Marketplace payouts (Express accounts)
- **Transfers** → Model owner earnings
- **Webhooks** → Payment events

### Business Logic
- Usage metering → Per-second billing
- Revenue split → 50/50 platform/creator

---

## 8. GPU Infrastructure

### Provider
- **RunPod Serverless** → On-demand GPUs

### Runtime
- **Docker** → Container packaging
- **NVIDIA CUDA** → GPU compute
- **runpod SDK** → Serverless handlers

### Concepts
- Cold starts → Model loading
- Auto-scaling → 0 to N workers
- Idle timeout → Cost optimization

---

## 9. Python SDK

### Packaging
- `pyproject.toml` → Modern Python config
- `hatchling` → Build backend
- `pip install -e .` → Editable installs

### Patterns
- **BasePredictor** → Abstract class, setup/predict
- **Decorators** → `@gpu()`, `@cpu()`
- **Type hints** → Pydantic, Input types
- **CLI** → Click framework

---

## 10. TypeScript SDK

### Packaging
- `package.json` → exports, types, files
- ESM + CJS → Dual module support
- `.d.ts` → Type declarations

### Patterns
- **Client class** → Auth, fetch wrapper
- **Polling** → Wait for completion
- **Error handling** → Custom error types

---

## 11. DevOps

### Containers
- **Docker** → Dockerfile, multi-stage builds
- **Docker Compose** → Local dev stack

### Monorepo
- **Bun workspaces** → Package linking
- Project structure → apps/, packages/

### Config
- **Zod** → Environment validation
- `.env` files → Secret management

---

## 12. Design System

### Theme: "Neon Terminal Brutalism"
- Colors → `neon-cyan`, `neon-purple`, `neon-green`, `void`, `surface`
- Fonts → Space Grotesk (display), Geist Mono (code)

### Patterns
- Glassmorphism → `bg-surface/50 backdrop-blur-xl border-white/10`
- Dark-first → `bg-void`, `text-white`, `text-gray-400`

---

## 13. API Design

### REST Patterns
- Versioning → `/v1/`
- Resources → `/models`, `/predictions`, `/billing`
- Actions → `POST /:id/cancel`

### Response Patterns
- Pagination → `{ data, pagination: { page, limit, total } }`
- Errors → `{ error, code, details }`
- Webhooks → `{ event, data, timestamp }`

---

## Learning Phases

| Phase | Duration | Focus |
|-------|----------|-------|
| **1. Foundations** | 2-4 weeks | TypeScript, React, Next.js, Tailwind |
| **2. Backend** | 3-4 weeks | Fastify, Prisma, Redis, BullMQ |
| **3. Infrastructure** | 2-3 weeks | Docker, S3, RunPod |
| **4. Payments** | 2 weeks | Stripe, Connect, Webhooks |
| **5. SDKs** | 1-2 weeks | Python/TS packaging, CLI |

---

## Quick Commands

```bash
# Dev
docker-compose -f infrastructure/docker/docker-compose.yml up -d
bun run dev

# Database
bun run db:generate
bun run db:migrate

# Build
bun run build
```

---

## Mindmap

```
                                    ┌─────────────────┐
                                    │     MLHub       │
                                    └────────┬────────┘
                                             │
            ┌────────────────────────────────┼────────────────────────────────┐
            │                                │                                │
            ▼                                ▼                                ▼
    ┌───────────────┐               ┌───────────────┐               ┌───────────────┐
    │   Frontend    │               │    Backend    │               │Infrastructure │
    └───────┬───────┘               └───────┬───────┘               └───────┬───────┘
            │                               │                               │
    ┌───────┼───────┐               ┌───────┼───────┐               ┌───────┼───────┐
    │       │       │               │       │       │               │       │       │
    ▼       ▼       ▼               ▼       ▼       ▼               ▼       ▼       ▼
 Next.js  React  Tailwind       Fastify  Prisma  Redis           Docker  S3    RunPod
    │       │       │               │       │       │               │       │       │
    │       │       │               │       │       │               │       │       │
    ▼       ▼       ▼               ▼       ▼       ▼               ▼       ▼       ▼
 App     Hooks   Utilities        Zod    Postgres BullMQ         Compose MinIO   GPU
 Router  Query   Design           JWT    Migrations Jobs         Bun     Upload  Workers
         Zustand System           Keys   Relations  Webhooks     Env     URLs    CUDA


                    ┌─────────────────────────────────────┐
                    │           Business Logic            │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
            ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
            │   Payments    │ │    SDKs       │ │   Security    │
            └───────┬───────┘ └───────┬───────┘ └───────┬───────┘
                    │                 │                 │
            ┌───────┼───────┐ ┌───────┼───────┐ ┌───────┼───────┐
            ▼       ▼       ▼ ▼       ▼       ▼ ▼       ▼       ▼
         Stripe  Connect  50/50   Python    TS    JWT   bcrypt  Rate
         Customer Payouts Split   Predictor Client Keys Helmet  Limit
```

---

## Topic Index (A-Z)

| Topic | Section | Keywords |
|-------|---------|----------|
| API Keys | Auth | generation, hashing, scopes |
| bcrypt | Auth | password, salt, hash |
| BullMQ | Jobs | queue, worker, retry |
| Docker | DevOps | container, compose, image |
| Fastify | Backend | routes, plugins, hooks |
| JWT | Auth | token, verify, expiry |
| MinIO | Storage | S3, local, bucket |
| Next.js | Frontend | app router, RSC, SSR |
| Postgres | Database | SQL, indexes, relations |
| Prisma | Database | ORM, schema, migrate |
| React Query | Frontend | cache, fetch, mutate |
| Redis | Database | cache, queue, session |
| RunPod | GPU | serverless, worker, scale |
| Stripe | Payments | customer, connect, transfer |
| Tailwind | Frontend | utility, responsive, theme |
| TypeScript | Core | types, generics, inference |
| Zod | Validation | schema, parse, infer |
| Zustand | Frontend | store, state, selector |

---

*Explore each topic. Build your knowledge. Ship great software.*
