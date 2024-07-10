import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage, NotFoundPage } from "./pages";
import LoginPage from "./modules/auth/pages/LoginPage.tsx";

import { PrincipalParentPage } from "./modules/parents/pages/index.ts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "parent",
        element: <PrincipalParentPage/>,
        
      },
    ]
  },
  {
    path: "/auth",
    element: <LoginPage />,
  }
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
