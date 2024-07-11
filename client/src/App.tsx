import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage, NotFoundPage } from "./pages";
import LoginPage from "./modules/auth/pages/LoginPage.tsx";
import TeacherPage from "./modules/teacher/pages/TeacherPage.tsx";
import TeacherClass from "./modules/teacher/pages/TeacherClass.tsx";
import TeacherClassChosen from "./modules/teacher/pages/TeacherClassChosen.tsx";
import TeacherClassStudents from "./modules/teacher/pages/TeacherClassStudents.tsx";

import { PrincipalParentPage } from "./modules/parents/pages/index.ts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {

        path: "teacher",
        element: <TeacherPage />,
      },
      {
        path: "class",
        element: <TeacherClass />,
      },
      {
        path: "classChosen",
        element: <TeacherClassChosen />,
      },
      {
        path: "classStudents",
        element: <TeacherClassStudents />,
      },
      {
      path: "parent",
        element: <PrincipalParentPage/>,
      }
    ],
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
