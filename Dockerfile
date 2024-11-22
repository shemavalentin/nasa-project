# Here goes the instructions. It is going to be to select the base image.
# here we specified the version of node to be lts and added the base image we need to use to be alpine linux OS

FROM node:lts-alpine

# Creating a folder for our application
# app is the folder where our files will live/ where all subsequent commands will be run
WORKDIR /app  

# Then here in app folder I can run whatever commands 

# COPY . .   # Let's use the common pattern to avoid that every time this command changes
#  the other commands after it run from scratch

COPY package*.json ./

# For this project, we have broken the client and the server.
#  Before we install client, we need to copy client

COPY client/package*.json client/

# Install only dependancies needed for production. this helps to reduce the space

# RUN npm install --only=production

# Let's take advantage of Docker layers that helps to cash the state and change when
# there is a new change only

#  Doing this is very important as when the COPY . .  command changes and all of the
#  commands after it will need to be run again. building those layers from scratch. 
#  Let's make a slight change on copy to use the common pattern

# RUN npm run install-client --only=production   # updated
RUN npm run install-client --omit=dev


COPY server/package*.json server/
RUN npm install
#  Layer that will run the server install
# RUN npm run install-server --only=production   # update since NPM 8
RUN npm run install-server --omit=dev

# For the client to build, we need to copy over, this time the entire client folder onto 
# the client path which means now the npm run build command will only if the contents of
# client folder or any of the layers before that have changed.

COPY client/ client/
# Let's run our front end client
RUN npm run build --prefix client


#  finally, before we run our server, we need that last copy command to copy over
# the sever folder. like this
COPY server/ server/



# Setting for a normal user for security issue and use the least privillege principle 
# before we run the CMD commands so that when a hacker compromises will have privileges of a normal user
# Note that if this is not set, docker will run commands as a root user.
USER node

# The only mesure peace missing is what to do when this docker container starts up.
# How to do this?  we use the CMD option is used for
CMD [ "npm", "start", "--prefix", "server" ]

# Now the last step is to expose the PORT that our server is running on
EXPOSE 8000

#  ALL THE ABOVE CODES WRITTEN FOLLOWING THE BEST PRACTICES