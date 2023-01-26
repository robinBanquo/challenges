FROM mhart/alpine-node:14
WORKDIR /
COPY package.json ./
RUN npm i
COPY . .
CMD ["npm", "start"]