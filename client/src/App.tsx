import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { ProtectedRoute } from "./components";
import { HomePage, NotFoundPage, ParentStudientPrincipalPage } from "./pages";

import { LoginPage, AuthLayout } from "./modules/auth/";
import {TeacherCalendar, TeacherClass, TeacherClassChosen, TeacherClassStudents, TeacherPage} from './modules/teacher/pages/index.tsx'
import { Classmates } from "./modules/parents/pages/Classmates.tsx";
import TeacherClassNewStudents from "./modules/teacher/pages/TeacherClassNewStudents.tsx";

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
        path: "classNewStudents",
        element: <TeacherClassNewStudents />,
      },
      {
        path: "teacher/calendar",
        element: <TeacherCalendar />,
      },
      {
        path: "parent",
        element: <ParentStudientPrincipalPage />,
      },
      {
        path: "parent/classmates",
        element: <Classmates />,
      },
      {
        path: "studient",
        element: <ParentStudientPrincipalPage />,
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
