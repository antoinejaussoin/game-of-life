FROM --platform=$BUILDPLATFORM node:lts as Node

ENV NODE_ENV=production

WORKDIR /home/node/app
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN chown -R node:node /home/node/app

USER node

RUN npm i

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./index.html ./index.html
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./types ./types
COPY --chown=node:node ./vite.config.ts ./vite.config.ts
COPY --chown=node:node ./svelte.config.js ./svelte.config.js
COPY --chown=node:node ./tailwind.config.cjs ./tailwind.config.cjs
COPY --chown=node:node ./postcss.config.js ./postcss.config.js
COPY --chown=node:node ./tsconfig.json ./tsconfig.json
COPY --chown=node:node ./tsconfig.node.json ./tsconfig.node.json

RUN npm run build

FROM nginx:alpine

COPY --from=Node /home/node/app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]