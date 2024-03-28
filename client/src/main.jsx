import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import PostDetail from "@/pages/PostDetail";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import UserProfile from "@/pages/UserProfile";
import Authors from "@/pages/Authors";
import CreatePost from "@/pages/CreatePost";
import EditPost from "@/pages/EditPost";
import CategoryPosts from "@/pages/CategoryPosts";
import AuthorPosts from "@/pages/AuthorPosts";
import Dashboard from "@/pages/Dashboard";
import Logout from "@/pages/Logout";
import DeletePost from "./pages/DeletePost";
import AuthProvider from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/profile/:userId", element: <UserProfile /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/posts/:postId", element: <PostDetail /> },
      { path: "/posts/:postId/edit", element: <EditPost /> },
      { path: "/posts/:postId/delete", element: <DeletePost /> },
      { path: "/authors", element: <Authors /> },
      { path: "/posts/categories/:category", element: <CategoryPosts /> },
      { path: "/posts/users/:userId", element: <AuthorPosts /> },
      { path: "/myposts/:userId", element: <Dashboard /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
