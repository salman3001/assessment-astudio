import { appConfig } from "@src/app.config";

/**
 * All the api urls are to be defined here.
 * so in future if any changes in routes can be adjusted here
 */
export const apiRoutes = {
  users: () => appConfig.apiUrl + "/users",
  products: () => appConfig.apiUrl + "/products",
  // ...add more urls here
};
