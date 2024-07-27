import { useEffect } from "react";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import {
  HomePage,
  WelcomePage,
  NotFoundPage,
  ParentStudientPrincipalPage,
} from "./pages";
import {
  RequireRole,
  PublicRoute,
  PrivateRoute,
  CheckingAuth,
} from "./components";

import { LoginPage, AuthLayout } from "./modules/auth/";
import {
  TeacherClass,
  TeacherLayout,
  TeacherCalendar,
  TeacherChatPage,
  TeacherClassChosen,
  TeacherContactsPage,
  TeacherClassStudents,
  TeacherReport,
} from "./modules/teacher";
import {
  Classmates,
  ParentsLayout,
  ParentsChatPage,
  ParentsContactsPage,
} from "./modules/parents";

// import TeacherClassNewStudents from "./modules/teacher/pages/TeacherClassNewStudents.tsx";

import { useAuthStore } from "./hooks";

const router = createBrowserRouter([
  {
    path: "/*",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      // Welcome
      {
        path: "welcome",
        element: <WelcomePage />,
      },
      // Teacher
      {
        path: "teacher/*",
        element: (
          <RequireRole allowedRoles={["PROFESSOR"]}>
            <TeacherLayout />
          </RequireRole>
        ),
        children: [
          {
            path: "class",
            element: <TeacherClass />,
          },
          {
            path: "class/:classId",
            element: <TeacherClassChosen />,
          },
          {
            path: "class/students",
            element: <TeacherClassStudents />,
          },
          {
            path: "contacts",
            element: <TeacherContactsPage />,
          },
          {
            path: "chat/:parentId",
            element: <TeacherChatPage />,
          },
          {
            path: "class/student/report/:studentId",
            element: <TeacherReport />,
          },
          // {
          //   path: "classNewStudents",
          //   element: <TeacherClassNewStudents />,
          // },
          {
            path: "calendar",
            element: <TeacherCalendar />,
          },
          {
            path: "*",
            element: <Navigate to="class" replace />,
          },
        ],
      },
      // Parent
      {
        path: "parents/*",
        element: (
          <RequireRole allowedRoles={["PARENTS"]}>
            <ParentsLayout />
          </RequireRole>
        ),
        children: [
          {
            path: "classmates",
            element: <Classmates />,
          },
          {
            path: "contacts",
            element: <ParentsContactsPage />,
          },
          {
            path: "chat/:teacherId",
            element: <ParentsChatPage />,
          },
          {
            path: "*",
            element: <Navigate to="classmates" replace />,
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
      {
        path: "*",
        element: <Navigate to="welcome" replace />,
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
        path: "*",
        element: <Navigate to="login" replace />,
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
