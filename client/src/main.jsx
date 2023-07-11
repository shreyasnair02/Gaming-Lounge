import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.jsx";
import "./index.css";
import Root from "./routes/Root.jsx";
import Error from "./utils/Error.jsx";
import GamesPage from "./routes/GamePage/GamesPage.jsx";
import GamePage from "./routes/GamePage/GamePage.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import Login from "./routes/Login/Login.jsx";
import Profile from "./routes/Profile/Profile.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "games",
        element: <GamesPage />,
      },
      {
        path: "/games/:id",
        element: <GamePage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
