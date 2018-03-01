FROM node:8.9.4

WORKDIR /backend
RUN npm install -g nodemon
COPY package.json /backend/package.json
RUN npm install
RUN mv /backend/node_modules /node_modules
COPY . /backend

CMD ["npm", "start"]
