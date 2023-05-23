FROM node as build-stage
WORKDIR /Front_end
ADD . .
RUN yarn install
RUN yarn run build

 

# production stage
FROM nginx:stable-alpine as production-stage
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

 

COPY --from=build-stage /Front_end/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]