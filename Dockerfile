#build
FROM node:lts as build

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
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /base
COPY *.lock .
COPY *.json ./
RUN yarn install
COPY . .
SHELL ["/bin/bash", "-eo", "pipefail", "-c"]
RUN if [ ! -z "$DNS_ADDRESS" ]; then find * -type f -exec  sed -i 's:app.dracula.fairdatasociety.org:'"$DNS_ADDRESS"':g' {} +; fi
RUN bash -e -o pipefail -c 'env |grep REACT >> .env'

RUN yarn run build:production

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

