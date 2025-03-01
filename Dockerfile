ARG BASE_IMAGE

FROM $BASE_IMAGE AS build

WORKDIR /app

COPY . .

RUN npm run build-client

RUN sh +x post-build.sh

RUN npm run build-server

CMD ["sh", "-c", "npm run ssr"]