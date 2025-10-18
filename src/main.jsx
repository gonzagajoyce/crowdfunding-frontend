import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FundraiserPage from "./pages/FundraiserPage";

import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <LoginPage/> },
        { path: "/fundraiser/:id", element: <FundraiserPage /> },
      ],
    },
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);