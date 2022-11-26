FROM node:15.5.1-alpine3.10

RUN mkdir -p /home/HelloErmine-GamePR/app && chown -R node:node /home/HelloErmine-GamePR/app

RUN apk update && apk upgrade


WORKDIR  /home/HelloErmine-GamePR/app
COPY .  /home/HelloErmine-GamePR/app
RUN yarn install
RUN yarn deploy

#USER node

EXPOSE 3001

CMD [ "yarn", "dev" ]
