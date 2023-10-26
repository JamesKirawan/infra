FROM node:16-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN yarn add uuid
RUN yarn install
RUN npm install -g @angular/cli
COPY . .
RUN yarn run build
EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
# COPY --chown=node:node . .