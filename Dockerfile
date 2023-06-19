#build
FROM node:17 as build

ARG REACT_APP_BEE_URL
ENV REACT_APP_BEE_URL=$REACT_APP_BEE_URL
ARG REACT_APP_ENVIRONMENT
ENV REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT
ARG REACT_APP_BATCH_ID
ENV REACT_APP_BATCH_ID=$REACT_APP_BATCH_ID
ARG REACT_APP_BACKEND_BASE_URL
ENV REACT_APP_BACKEND_BASE_URL=$REACT_APP_BACKEND_BASE_URL
ARG REACT_APP_FAIROSHOST
ENV REACT_APP_FAIROSHOST=$REACT_APP_FAIROSHOST
ARG REACT_APP_FAIROSHOST_LOGIN
ENV REACT_APP_FAIROSHOST_LOGIN=$REACT_APP_FAIROSHOST_LOGIN
ARG REACT_APP_FAIRDRIVEHOST
ENV REACT_APP_FAIRDRIVEHOST=$REACT_APP_FAIRDRIVEHOST
ARG DNS_ADDRESS
ENV DNS_ADDRESS=$DNS_ADDRESS
ENV SKIP_PREFLIGHT_CHECK true

WORKDIR /base
COPY *.json ./
RUN npm install
COPY . .
SHELL ["/bin/bash", "-eo", "pipefail", "-c"]
RUN if [ ! -z "$REACT_APP_BACKEND_BASE_URL" ]; then \
    DNS_ADDRESS=${REACT_APP_BACKEND_BASE_URL#*//} \
    DNS_ADDRESS=${DNS_ADDRES%/} \
    find * -type f -exec  sed -i 's:app.dracula.dev.fairdatasociety.org:'"$DNS_ADDRESS"':g' {} +; fi
RUN bash -e -o pipefail -c 'env |grep REACT >> .env'

RUN npm run build:production

#webserver
FROM nginx:stable-alpine
COPY --from=build /base/build /usr/share/nginx/html
COPY --from=build /base/build/mock-backend/ /usr/share/nginx/html
RUN echo "real_ip_header X-Forwarded-For;" \
    "real_ip_recursive on;" \
    "set_real_ip_from 0.0.0.0/0;" > /etc/nginx/conf.d/ip.conf
RUN sed -i '/index  index.html index.htm/c\        try_files $uri /index.html;' /etc/nginx/conf.d/default.conf
RUN chown -R nginx /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

