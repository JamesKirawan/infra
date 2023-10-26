FROM node:16-alpine AS backend
WORKDIR /root
COPY package*.json ./
RUN apk add --no-cache python3 py3-pip
RUN npm install
COPY . .
EXPOSE 4040
CMD ["node", "index.js"]