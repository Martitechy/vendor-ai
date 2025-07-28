# Vendors/Dockerfile

FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy Vendor service code
COPY ./src ./src

# Copy shared code (adjust path if needed)
COPY ../_shared ./_shared

# Copy package.json and install dependencies
COPY ./package*.json ./
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the vendor service
CMD ["npm", "start"]
