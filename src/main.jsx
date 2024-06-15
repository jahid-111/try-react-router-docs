import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import Contact from "./Contact";
import { getContactLoader, getContactsLoaders } from "./loaders/contactsLoader";
import {
  createContactsAction,
  deleteContactAction,
  editContactAction,
  updateFavAction,
} from "./actions/contactsActions";
import EditContact from "./EditContact";
import Index from "./Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    loader: getContactsLoaders,
    action: createContactsAction,
    children: [
      {
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            index: true,
            element: <Index></Index>,
          },
          {
            path: "/contacts/:contactId",
            element: <Contact></Contact>,
            loader: getContactLoader,
            action: updateFavAction,
          },
          {
            path: "/contacts/:contactId/edit",
            element: <EditContact></EditContact>,
            loader: getContactLoader,
            action: editContactAction,
          },
          {
            path: "/contacts/:contactId/destroy",
            action: deleteContactAction,
            errorElement: (
              <div>
                {" "}
                <h3>
                  {
                    "Opps...!  You Can't Delete This Contact  (CONTEXTUAL ERROR)"
                  }
                </h3>
              </div>
            ),
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
