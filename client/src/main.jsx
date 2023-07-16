import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root.jsx";
import Error from "./utils/Error.jsx";
import GamesPage from "./routes/GamePage/GamesPage.jsx";
import GamePage from "./routes/GamePage/GamePage.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import Login from "./routes/Login/Login.jsx";
import Profile from "./routes/Profile/Profile.jsx";
import ForumPage from "./routes/ForumPage/ForumPage";
import PostPage from "./routes/ForumPage/PostPage";
import { PostProvider } from "./Contexts/PostsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
        path: "forum",
        element: <ForumPage />,
      },
      {
        path: "/forum/posts/:postId",
        element: (
          <PostProvider>
            <PostPage />
          </PostProvider>
        ),
      },
      {
        path: "/games/:gameId",
        element: <GamePage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
