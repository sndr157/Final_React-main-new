import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as postLoader } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { AddEvent } from "./pages/AddEvent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import "./chakra-theme";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        // loader: postListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: postLoader,
        // // action: addComment,
      },
      {
        path: "/event/new",
        element: <AddEvent />,
        // action: createEvent,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
