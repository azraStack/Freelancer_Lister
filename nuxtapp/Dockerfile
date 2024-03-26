FROM node:16.17.0-bullseye-slim

# set the working directory in the docker image
WORKDIR /nuxtapp

COPY package*.json ./
RUN npm install

# copy the all file form host directory to Docker image working directory, note .dockerignore
COPY . .

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 3000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000
# set Nodeapp URL
ENV NODEAPP_URL=http://localhost:8080

# start the app
CMD [ "npm", "start" ]