import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { CustomTable } from "../../../components";
import { Student } from "../../../interfaces";
import { useAxiosPrivate } from "../../../hooks";

const studentTableColumns = [
  { id: "user_id", label: "User" },
  { id: "telephone", label: "Phone Number" },
  { id: "age", label: "Age" },
  { id: "grade", label: "Grade" },
  { id: "section", label: "Section" },
];

export default function AdminStudentsPage() {
  const api = useAxiosPrivate();

  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    api.get<Student[]>("/students").then((res) => {
      setStudents(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Box
      p={2}
      height="auto"
      maxHeight="100%"
      bgcolor="#e8e4e6"
      borderRadius={1}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        pb={2}
        gap={2}
      ></Box>

      <CustomTable
        rows={students}
        columns={studentTableColumns}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </Box>
  );
}
