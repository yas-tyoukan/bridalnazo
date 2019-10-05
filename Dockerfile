# install npm packages and timezone data
FROM node:10.15.3-alpine as installer
RUN apk update && apk add --no-cache tzdata git && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install --production --no-progress && \
    npx pm2 install pm2-intercom && \
    npx pm2 kill && \
    npm cache clean --force

# build webpack
FROM node:10.15.3-alpine as builder
COPY ./ /app
COPY --from=installer /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

# copy and run
FROM node:10.15.3-alpine
COPY . /app
COPY --from=installer /etc/localtime /etc/localtime
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=builder /app/public/js /app/public/js
WORKDIR /app
ENV NOROOT octcat
RUN addgroup -S $NOROOT && \
    adduser -S -g $NOROOT $NOROOT  && \
    chown -R $NOROOT:$NOROOT /app
USER $NOROOT
EXPOSE 3000
CMD ["npx", "pm2", "start", "process.json", "--no-daemon"]
