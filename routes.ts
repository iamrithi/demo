/**
 * An array of routes that are accesible to the public
 * There routes do not need authendication
 * @type {string[]}
 */

export const publicRoutes = ["/access-denied"];

/**
 * An array of routes that are used for authendication
 * There routes will redirect logged in user to /setting page
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/"];

/**
 * There routes do not need authendication and dont stop by middleware ever.
 * @type {string}
 */

export const apiAuthPrefix = "/api";
/**
 * Default redirect path after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * An object of routes that are used for authendication based on role
 * There routes will redirect logged in user to /setting page
 * @type {string[]}
 *
 */

export const roleBasedRoutes = {
  ADMIN: [
    "/dashboard",
    "/user",
    "/canteen",
    "/grievance",
    "/faq",
    "/docs",
    "/faq/type",
    "/grievance/type",
    "/stock",
    "/stock/inventory",
  ],
  MANAGER: ["/dashboard", "/user", "/grievance", "/stock", "/stock/inventory"],
  STAFF: ["/user", "/stock/inventory"],
};
