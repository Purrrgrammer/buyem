import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomePage,
  Login,
  AboutPage,
  MarketPlacePage,
  AccountPage,
  DetailPage,
} from "./pages/index.tsx";
import { store } from "./store/index.tsx";
import { Provider } from "react-redux";
import CartPage from "./pages/cartpage/CartPage.tsx";
import Footer from "./component/footer/Footer.tsx";
import "./App.css";
import Navbar from "./component/navbar/Navbar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/marketplace",
    element: <MarketPlacePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/product/:productId",
    element: <DetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </Provider>
  </React.StrictMode>
);
