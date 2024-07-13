import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { ProtectedRoute } from "./components";
import { HomePage, NotFoundPage } from "./pages";

import { LoginPage, AuthLayout } from "./modules/auth/";

import TeacherPage from "./modules/teacher/pages/TeacherPage.tsx";
import TeacherClass from "./modules/teacher/pages/TeacherClass.tsx";
import TeacherClassChosen from "./modules/teacher/pages/TeacherClassChosen.tsx";
import TeacherClassStudents from "./modules/teacher/pages/TeacherClassStudents.tsx";

import { PrincipalParentPage } from "./modules/parents/pages/index.ts";

import { Chat } from "./components/chat/Chat.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      // Teacher
      {
        path: "teacher",
        element: <TeacherPage />,
      },
      {
        path: "teacher/class",
        element: <TeacherClass />,
      },
      {
        path: "teacher/class/:id",
        element: <TeacherClassChosen />,
      },
      {
        path: "/teacher/class/students",
        element: <TeacherClassStudents />,
      },
      {
        path: "/teacher/chat",
        element: <Chat />,
      },
      // Parent
      {
        path: "parent",
        element: <PrincipalParentPage />,
      },
    ],
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
