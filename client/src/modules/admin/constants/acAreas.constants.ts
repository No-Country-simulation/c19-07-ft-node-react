export const acAreaTableColumns = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "educational_level", label: "Educational Level" },
  {
    id: "createdAt",
    label: "Created At",
    format: (value: Date) => new Date(value).toLocaleDateString(),
  },
];

export const acAreaCreateFormFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", multiline: true },
  { name: "educational_level", label: "Educational Level" },
];

export const acAreaEditFormFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", multiline: true },
  { name: "educational_level", label: "Educational Level" },
];
