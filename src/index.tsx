import { Layout } from "components/Layout";
import "index.css";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { PositioningPage } from "routes/positioning-page";
import { ProductPage } from "routes/product-page";
import { ProductsPage } from "routes/products-page";
import { TasksPage } from "routes/tasks-page";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            path: "/",
            element: <Navigate to="/positioning" />,
         },
         {
            path: "/positioning",
            element: <PositioningPage />,
         },
         {
            path: "/tasks",
            element: <TasksPage />,
         },
         {
            path: "/products",
            element: <ProductsPage />,
         },
         {
            path: "/products/:id",
            element: <ProductPage />,
         },
      ],
   },
]);

root.render(<RouterProvider router={router} />);
