# ==============================================================================
# Dockerfile - InfoLine Frontend (Angular)
# ==============================================================================
# Build multi-stage pour optimiser la taille de l'image finale :
#   Stage 1 (build)  : image Node.js complète — compile Angular
#   Stage 2 (runtime): image Nginx Alpine légère — sert les fichiers
#
# L'image finale ne contient ni Node.js, npm, les sources TypeScript
# ni les node_modules.
# Ne reste que les fichiers statiques et Nginx.
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1 : Build Angular
# ------------------------------------------------------------------------------
# node:20-alpine : Node.js Alpine Linux — image de build légère.
# Alpine réduit considérablement le temps de pull dans le pipeline CI/CD GitHub Actions.
# ------------------------------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Copie des fichiers de dépendances en premier — optimisation du cache Docker.
# Le wildcard package*.json copie à la fois package.json et package-lock.json.
COPY package*.json ./

# npm ci (clean install) : installation déterministe depuis package-lock.json.
# Plus fiable que npm install en CI/CD car garantit que les mêmes versions sont installées à chaque build.
RUN npm ci

# Copie du code source après les dépendances
COPY . .

# Build de production Angular (ng build).
# Génère les fichiers optimisés dans /app/dist/infoline-app/browser
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2 : Serve avec Nginx
# ------------------------------------------------------------------------------
# nginx:alpine : image Nginx officielle sur Alpine — image légère.
# ------------------------------------------------------------------------------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Suppression des fichiers de démonstration Nginx par défaut
# pour ne garder que les fichiers Angular.
RUN rm -rf ./*

# Copie des fichiers statiques Angular buildés depuis le stage 1.
COPY --from=build /app/dist/infoline-app/browser ./

# Remplacement de la configuration Nginx par défaut — nécessaire pour
# le routing Angular SPA et le cache des assets statiques.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port d'écoute Nginx — mappé par le Service Kubernetes (targetPort: 80).
EXPOSE 80

# "daemon off" obligatoire dans Docker — si Nginx passe en background,
# le processus principal se termine et Kubernetes redémarre le pod.
CMD ["nginx", "-g", "daemon off;"]