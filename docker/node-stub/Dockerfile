FROM node:4.2.1

RUN npm config set strict-ssl false
RUN npm config set registry "http://registry.npmjs.org"
RUN npm config set proxy http://pcyvipncp2n.edf.fr:3128
RUN npm config set https-proxy http://pcyvipncp2n.edf.fr:3128

ENV appdir=/usr/src/app
ENV tmpdir=/usr/src/tmp

RUN mkdir -p ${appdir}
RUN mkdir -p ${tmpdir}
WORKDIR ${tmpdir}

RUN npm install express express-generator
RUN ${tmpdir}/node_modules/express-generator/bin/express -f ${appdir}

WORKDIR ${appdir}
COPY . ${appdir}
#RUN rm node_modules/ -r && npm install
RUN npm install

RUN npm install --global babel-cli webpack grunt-cli

CMD ["npm", "start"]