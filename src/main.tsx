import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router"; // Use "react-router-dom" instead
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App"; // Your main layout component
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./index.css";
import MessagePage from "./pages/Message";
import SettingsPage from "./pages/Settings/Setting";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import AccountSettings from "./pages/Settings/Account";
const queryClient = new QueryClient();
// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main Layout Component
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { 
        element: <PrivateRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "messages", element: <MessagePage /> },
          { path: "settings", element: <SettingsPage /> },
          // Setting subpages
          { path: "settings/account", element: <AccountSettings /> },
        ] 
      },
      { path: "*", element: <NotFound /> }, 
    ],
  },
]);

// Render the app
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
      </QueryClientProvider>
  </React.StrictMode>
);
