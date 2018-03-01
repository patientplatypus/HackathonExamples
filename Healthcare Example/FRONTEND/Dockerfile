FROM node:8.9.4

WORKDIR /portals
COPY package.json /portals/package.json
RUN npm install
COPY . /portals

CMD ["npm", "start"]
