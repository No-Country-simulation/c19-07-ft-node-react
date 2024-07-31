export const parentTableColumns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "relation", label: "Kinship" },
  {
    id: "createdAt",
    label: "Created At",
    format: (value: Date) => new Date(value).toLocaleDateString(),
  },
];

export const parentCreateFormFields = [
  { name: "user_id", label: "User", select: [] },
  { name: "relation", label: "Kinship" },
];

export const parentEditFormFields = [{ name: "relation", label: "Kinship" }];
