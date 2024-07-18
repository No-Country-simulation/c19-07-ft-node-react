import { useEffect } from "react";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { useAuthStore } from "./hooks";
import { LoginPage, AuthLayout } from "./modules/auth/";
import { HomePage, NotFoundPage, ParentStudientPrincipalPage } from "./pages";
import {
  RequireRole,
  PublicRoute,
  PrivateRoute,
  CheckingAuth,
} from "./components";

import {
  TeacherPage,
  TeacherClass,
  TeacherCalendar,
  TeacherClassChosen,
  TeacherClassStudents,
} from "./modules/teacher/pages/index.tsx";

import { Classmates } from "./modules/parents/pages/Classmates.tsx";
import TeacherClassNewStudents from "./modules/teacher/pages/TeacherClassNewStudents.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      // Teacher
      {
        path: "teacher",
        element: (
          <RequireRole allowedRoles={["PROFESSOR"]}>
            <TeacherPage />
          </RequireRole>
        ),
        children: [
          {
            path: "class",
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
        ],
      },
      // Parent
      {
        path: "parent",
        element: (
          <RequireRole allowedRoles={["PARENTS"]}>
            <ParentStudientPrincipalPage />
          </RequireRole>
        ),
        children: [
          {
            path: "parent/classmates",
            element: <Classmates />,
          },
        ],
      },
      // Student
      {
        path: "student",
        element: (
          <RequireRole allowedRoles={["STUDENT"]}>
            <ParentStudientPrincipalPage />
          </RequireRole>
        ),
        children: [],
      },
    ],
  },
  {
    path: "/auth/*",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
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
  const { status, startRefreshToken } = useAuthStore();

  useEffect(() => {
    startRefreshToken();
  }, []);

  if (status === "checking") return <CheckingAuth />;

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
