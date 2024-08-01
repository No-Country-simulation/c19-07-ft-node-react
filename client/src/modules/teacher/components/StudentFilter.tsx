import React, { useEffect, useState, useMemo } from "react";
import { TextField, Box, Button, ButtonGroup } from "@mui/material";
import { useAuthStore } from '../../../hooks/useAuthStore'; 
import { useAxiosPrivate } from "../../../hooks";

interface Student {
  student_id: string;
  user_id: string;
  telephone: string | null;
  age: number | null;
  grade: string;
  section: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  parentId: string;
  educational_level_id: string;
  feedback: string;
  name: string;
  educationalLevel: string;
  academicRecords: {
    historial_id: string;
    name: string;
    curso_id: string;
    mark: number;
    comment: string;
    date: string;
    student_id: string;
  }[];
}

interface StudentFilterProps {
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

const StudentFilter: React.FC<StudentFilterProps> = ({
  searchTerm,
  onSearchTermChange,
  onFilterChange,
  activeFilter,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const { user } = useAuthStore();
  const api = useAxiosPrivate();

  useEffect(() => {
    const fetchStudents = async () => {
      if (user && user.user_id) {
        try {
          const response = await api.get(
            `/professors/assigned_students/${user.Professors[0].professor_id}`
          );
          if (Array.isArray(response.data.data)) {
            const assignedStudents = response.data.data.flatMap(
              (item: any) => item.students
            );
            setStudents(assignedStudents);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    fetchStudents();
  }, [user]);

  const gradeSections = useMemo(() => {
    const uniqueCombinations = new Set<string>();
    students.forEach(student => {
      uniqueCombinations.add(`${student.grade}${student.section}`);
    });
    return Array.from(uniqueCombinations);
  }, [students]);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        variant="outlined"
        label="Search student"
        fullWidth
        value={searchTerm}
        onChange={onSearchTermChange}
      />
      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
        <ButtonGroup>
          <Button
            variant={activeFilter === "all" ? "contained" : "outlined"}
            onClick={() => onFilterChange("all")}
          >
            All
          </Button>
          {gradeSections.map((gradeSection) => (
            <Button
              key={gradeSection}
              variant={activeFilter === gradeSection ? "contained" : "outlined"}
              onClick={() => onFilterChange(gradeSection)}
            >
              {gradeSection}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default StudentFilter;
