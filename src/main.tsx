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
import AccountSettings from "./pages/Settings/Account";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import CreatePage from "./pages/CreatePage";
import PostDetail from "./pages/PostDetail";
import SearchPage from "./pages/SearchPage"
import NotificationPage from "./pages/NotificationPage";

const queryClient = new QueryClient();
// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main Layout Component
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "post/:postId" ,element: <PostDetail  />},
      { path: "search", element: <SearchPage /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "messages", element: <MessagePage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "notifications", element:<NotificationPage />},
          // Setting subpages
          { path: "settings/account", element: <AccountSettings /> },
        ] 
      },
      { path: "*", element: <NotFound /> }, 
    ],
  },
  // Outside App page routing
  { path: "login", 
    element: <LoginPage /> },
  {
    path: "signin",
    element: <SignInPage/>
  },
  { path: "create",
    element: <CreatePage/>
  }
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
