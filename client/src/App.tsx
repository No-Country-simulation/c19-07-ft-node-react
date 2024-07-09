import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage, NotFoundPage } from "./pages";
import LoginPage from "./modules/auth/pages/LoginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
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
