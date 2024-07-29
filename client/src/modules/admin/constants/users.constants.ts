export const userTableColumns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "type_user", label: "Role" },
  { id: "state", label: "State" },
];

export const userFilterItems = [
  {
    value: "",
    label: "All",
  },
  {
    value: "student",
    label: "Student",
  },
  {
    value: "parents",
    label: "Parent",
  },
  {
    value: "professor",
    label: "Tearcher",
  },
];

export const userCreateFormFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  {
    name: "typeUser",
    label: "Role",
    select: [
      { value: "ADMIN", label: "Admin" },
      { value: "STUDENT", label: "Student" },
      { value: "PARENTS", label: "Parent" },
      { value: "PROFESSOR", label: "Teacher" },
    ],
  },
];

export const userEditFormFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
];
