// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
/* ************************************************************************* */

// Import the main app component
import App from "./App";
import AdminGames from "./pages/Admin/AdminGames";
import AdminHome from "./pages/Admin/AdminHome";
import AdminPrize from "./pages/Admin/AdminPrizes";
import AdminUsers from "./pages/Admin/AdminUsers";
import Games from "./pages/Games";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Play from "./pages/Play";
import RankingPage from "./pages/RankingPage";
import Room from "./pages/Room";
import UserProfile from "./pages/UserProfile";
import PrizePage from "./pages/prizePage";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "prizes",
        element: <PrizePage />,
      },
      { path: "games", element: <Games /> },
      { path: "play", element: <Play /> },
      { path: "about_us", element: <Room /> },
      { path: "login", element: <LoginPage /> },
      { path: "admin", element: <AdminHome /> },
      { path: "admin/games", element: <AdminGames /> },
      { path: "admin/prizes", element: <AdminPrize /> },
      { path: "user_profile", element: <UserProfile /> },
      { path: "admin/users", element: <AdminUsers /> },
      { path: "ranking", element: <RankingPage /> },
    ],
  },
]);
// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}
// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
