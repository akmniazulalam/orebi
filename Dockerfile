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


# services:
#   frontend:
  
#     build: 
#       context: ./frontend
#       dockerfile: Dockerfile
#     ports:
#       - "3000:3000"
#     restart: always
#     networks:
#       - app-network
#     depends_on:
#       - backend

#   backend:
#     build: 
#       context: ./backend
#       dockerfile: Dockerfile
#     ports:
#       - "5843:5843"
#     restart: on-failure
#     environment:
#       - DB_HOST=db
#       - PORT=5843
#     networks:
#       - app-network
#       - db-network
#     secrets:
#       - db_user
#       - db_password
#     depends_on:
#       db: 
#         condition: service_healthy

#   db:
#     image: postgres:15-alpine
#     restart: always
#     environment:
#       - POSTGRES_USER_FILE=/run/secrets/db_user
#       - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
#       - POSTGRES_DB=taskdb
#     ports:
#       - "5432:5432"
#     volumes:
#       - postgres_data:/var/lib/postgresql/data
#     networks:
#       - db-network
#     secrets:
#       - db_user
#       - db_password
#     healthcheck:
#       test: ["CMD-SHELL", "pg_isready -U $$(cat /run/secrets/db_user)"]
#       interval: 10s
#       timeout: 5s
#       retries: 5

# secrets:
#   db_user:
#     file: ./secrets/db_user.txt
#   db_password:
#     file: ./secrets/db_password.txt

# networks:
#   app-network:
#     driver: bridge
#   db-network:
#     internal: true

# volumes:
#   postgres_data:
#     driver: local