import { createBrowserRouter, Navigate } from "react-router-dom";
import Beers from "components/Beers";
import CustomBeers from "components/CustomBeers";
import Header from "components/Header";

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Navigate to='/all-beers' replace />,
      },
      {
        path: "/all-beers",
        element: <Beers />,
      },
      {
        path: "/custom-beers",
        element: <CustomBeers />,
      },
    ],
  },
]);

export default router;
