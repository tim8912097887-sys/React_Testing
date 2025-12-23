# Stage 1: Build the application
FROM node:20-slim AS build

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy lockfile and package.json first to leverage Docker caching
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile --config.node-linker=hoisted

# Copy the rest of your source code
COPY . .

# Build the TypeScript project
RUN pnpm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine AS runtime

# Copy the build output from the previous stage to Nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]