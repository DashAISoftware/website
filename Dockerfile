FROM node:20.16.0-bullseye-slim

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias con pnpm
RUN pnpm install
COPY . .

#RUN pnpm run build

CMD ["pnpm", "run", "dev"]
