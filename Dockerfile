FROM circleci/node:latest-browsers


WORKDIR /usr/src/app/

## add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

USER $user

COPY package.json ./
# RUN npm config set unsafe-perm true
RUN yarn global add umi
RUN yarn install --network-timeout 1000000



COPY ./ ./

# Give owner rights to the current user
RUN chown -Rh $user:$user /usr/src/app/

#RUN npm run test:all

#RUN npm run fetch:blocks

CMD ["npm", "run", "build"]