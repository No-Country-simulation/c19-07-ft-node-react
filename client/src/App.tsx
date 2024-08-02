import { useEffect } from "react";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { HomePage, WelcomePage, NotFoundPage } from "./pages";
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
  ParentsLayout,
  ParentsChatPage,
  ParentsContactsPage,
} from "./modules/parents";
import {
  AdminLayout,
  AdminUsersPage,
  AdminParentsPage,
  AdminStudentsPage,
  AdminTeachersPage,
  AdminDashboardPage,
  AdminAcademicAreasPage,
} from "./modules/admin";
import {
  StudentLayout,
  StudentOverviewPage,
  StudentPerformancePage,
  StudentAssessmentsPage,
} from "./modules/student";

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
            path: "class/student/report/:studentId/:courseId",
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
            path: "my-child/overview",
            // element: < />,
          },
          {
            path: "my-child/performance",
            // element: < />,
          },
          {
            path: "my-child/assessments",
            // element: < />,
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
            <StudentLayout />
          </RequireRole>
        ),
        children: [
          {
            path: "overview",
            element: <StudentOverviewPage />,
          },
          {
            path: "performance",
            element: <StudentPerformancePage />,
          },
          {
            path: "assessments",
            element: <StudentAssessmentsPage />,
          },
          {
            path: "*",
            element: <Navigate to="overview" replace />,
          },
        ],
      },
      // Admin
      {
        path: "admin/*",
        element: (
          <RequireRole allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </RequireRole>
        ),
        children: [
          {
            path: "dashboard",
            element: <AdminDashboardPage />,
          },
          {
            path: "users",
            element: <AdminUsersPage />,
          },
          {
            path: "students",
            element: <AdminStudentsPage />,
          },
          {
            path: "teachers",
            element: <AdminTeachersPage />,
          },
          {
            path: "parents",
            element: <AdminParentsPage />,
          },
          {
            path: "academic-areas",
            element: <AdminAcademicAreasPage />,
          },
          {
            path: "*",
            element: <Navigate to="dashboard" replace />,
          },
        ],
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
