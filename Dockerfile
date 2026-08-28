# Image de production de therapeutelarochelle.fr.
#
# Remplace la construction nixpacks, qui produisait 1,26 Go parce qu'elle garde
# dans l'image finale la chaîne de compilation, les dépendances de développement
# et le cache de build.
#
# Les choix de fond sont justifiés dans le Dockerfile de thimothe-das/dastech.
# Trois points méritent d'être rappelés ici :
#
# 1. `HEALTHCHECK` déclaré dans l'image, et sonde Coolify désactivée en
#    conséquence. Les deux sont exclusives : Coolify ne lit la directive d'un
#    Dockerfile que si sa propre sonde est éteinte. La sienne exécute
#    `curl … || wget …` sur `http://localhost:PORT/`, ce qui échoue deux fois
#    ici : `curl` est absent d'une image minimale, et le `wget` de BusyBox
#    résout `localhost` en `::1` quand Next n'écoute qu'en IPv4.
#
# 2. `NEXT_PUBLIC_API_URL` est le seul argument de construction, et c'est
#    volontaire. Next inscrit les variables `NEXT_PUBLIC_*` dans le JavaScript
#    livré au navigateur : leur valeur est donc publique par construction, et la
#    voir dans `docker history` n'ajoute aucune exposition. Le secret du dépôt,
#    `REVALIDATE_SECRET_KEY`, n'est **pas** un argument de construction et ne
#    doit jamais le devenir : il est lu à l'exécution.
#
# 3. Aucune dépendance à un service externe pendant la construction. Le site
#    consomme l'API d'administration à l'exécution, pas au build.

# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1
RUN corepack enable

# --- dépendances -------------------------------------------------------------
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

# --- construction ------------------------------------------------------------
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# Déclenche `output: "standalone"` dans next.config.ts. Hors de cette étape la
# configuration reste inchangée, donc `next dev` et `next start` continuent de
# fonctionner et le dépôt n'a pas de jour de bascule.
ENV BUILD_STANDALONE=1 NODE_ENV=production
RUN pnpm build

# --- exécution ---------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3002 HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# Le mode autonome ne recopie ni `public/` ni `.next/static` : Next attend que
# l'image le fasse. Les oublier donne un site qui répond 200 sans aucun style.
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3002

# NE PAS SUPPRIMER CETTE DIRECTIVE SANS RÉACTIVER LA SONDE DANS COOLIFY.
# C'est elle qui retient le déploiement tant que la nouvelle version ne répond
# pas, donc ce qui empêche une version cassée de remplacer une version qui
# marche. Coolify saute cette attente quand sa propre sonde est éteinte *et*
# qu'il ne trouve pas de HEALTHCHECK ici. La retirer seule désarme le garde-fou
# en silence, ce qui sur un site client est le pire des deux mondes.
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=6 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
