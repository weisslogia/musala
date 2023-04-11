FROM node:18.15.0

# Create app directory
WORKDIR /usr/src/app

# Exporting the environment variable for the api, 4000 is the default value if is not provided
ENV PORT=4000

# Install app dependencies
COPY package*.json ./
RUN npm install 

# Copy the source code
COPY . .

# Install app dependencies
RUN npm install --prefix ./api 
RUN npm run build --prefix ./api
RUN npm install --prefix ./frontend 
RUN npm run build --prefix ./frontend

# Expose API and Frontend ports
EXPOSE 4000 8080

# Run the app
CMD [ "npm", "start" ]

