import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FundraiserPage from "./pages/FundraiserPage";

import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./components/AuthProvider";
import "./style.css";
import CreateFundraiserPage from "./pages/CreateFundraiserPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <LoginPage/> },
        { path: "/fundraiser/:id", element: <FundraiserPage /> },
        { path: "/create-fundraiser", element: <CreateFundraiserPage /> },
      ],
    },
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);