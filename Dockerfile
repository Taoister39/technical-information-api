FROM node:18-buster-slim
WORKDIR /app
COPY . .
RUN npm install


CMD ["npm", "start"] 
