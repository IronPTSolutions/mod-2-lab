FROM node:18.17-slim

COPY . /opt/mod-2-lab
WORKDIR /opt/mod-2-lab
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
