# Stage 1: Install Dependencies
FROM node:22-bookworm-slim AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build Application
FROM node:22-bookworm-slim AS builder

WORKDIR /app

ARG VITE_API_URL
ARG VITE_NEW_ARRIVALS_API_URL
ARG VITE_BEST_SELLERS_API_URL
ARG VITE_SPECIAL_OFFERS_API_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_NEW_ARRIVALS_API_URL=${VITE_NEW_ARRIVALS_API_URL}
ENV VITE_BEST_SELLERS_API_URL=${VITE_BEST_SELLERS_API_URL}
ENV VITE_SPECIAL_OFFERS_API_URL=${VITE_SPECIAL_OFFERS_API_URL}

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# Stage 3: Serve static files with Nginx
FROM nginx:stable-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html 




# FROM node:22-bookworm-slim AS deps

# RUN apk add --no-cache libc6-compat

# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci


# FROM node:22-alpine AS builder
# ARG VITE_API_URL
# ENV VITE_API_URL=${VITE_API_URL}

# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# RUN npm run build


# FROM node:22-alpine AS runner

# WORKDIR /app

# ENV NODE_ENV=production

# RUN addgroup -S -g 1001 nodejs
# RUN adduser -S -u 1001 nextjs

# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV HOSTNAME="0.0.0.0"

# CMD [ "node", "server.js" ]
