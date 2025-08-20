import { Router } from "express";
import { vendorRoutes } from "./routes/vendor.routes.js";

export const vendorRoute = () => {
  const router = Router();
  router.use("/", vendorRoutes);
  return router;
};

// This file serves as the entry point for the vendor routes in the application.
// It imports the vendor routes from the specified path and sets up the router to handle requests.
// The vendor routes include various endpoints for vendor registration, login, profile management, and administrative actions.
// The router is then exported for use in the main application file, allowing the vendor routes to be integrated into the overall routing structure of the application.
// The vendor routes are designed to handle both public and authenticated requests, ensuring that only authorized users can access certain functionalities.
// The routes are structured to provide a clear separation of concerns, with each route handling specific actions related to vendor management.
// The vendor routes are essential for managing vendor-related operations in the application, providing a robust and secure way to handle vendor data and actions.
// The use of middleware for authentication and authorization ensures that the routes are secure and only accessible to users with the appropriate roles.
// This modular approach allows for easier maintenance and scalability of the vendor-related functionalities in the application.
// The vendor routes are designed to be flexible and extensible, allowing for future enhancements and additional features as needed.
// The router is set up to handle various HTTP methods such as GET, POST, PUT, and DELETE, enabling a full range of CRUD operations for vendor management.
// The vendor routes are an integral part of the application's architecture, providing a structured way to manage vendor-related functionalities.
