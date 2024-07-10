import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { ProtectedRoute } from "./components";
import { HomePage, NotFoundPage } from "./pages";
import { LoginPage, AuthLayout } from "./modules/auth/";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/auth/*",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
      },
      {
        path: "*",
        element: <Navigate to="/auth/login" />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </>
  );
}

export default App;
