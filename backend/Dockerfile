FROM mhart/alpine-node:14
WORKDIR /
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]