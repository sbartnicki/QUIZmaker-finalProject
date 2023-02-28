import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";

const router = createBrowserRouter([
    {
        path: "/",
        element: <WelcomeScreen />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
