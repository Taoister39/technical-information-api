FROM node:18-buster-slim
WORKDIR /app
COPY . .
RUN npm install


RUN npm run build

CMD [ "npm","run","preview" ]
