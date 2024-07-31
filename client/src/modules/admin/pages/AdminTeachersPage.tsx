import { Box } from "@mui/material";
import { TeacherProvider } from "../contexts";

import { useModal } from "../hooks";
import { AddButton, TeacherTable, TeacherSearchBar } from "../components";

export default function AdminTeachersPage() {
  const { openModal, closeModal, modalState } = useModal();

  return (
    <TeacherProvider>
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
        >
          <TeacherSearchBar />

          <AddButton onClick={() => openModal("create")} />
        </Box>

        <TeacherTable
          openCreateModal={modalState.type === "create"}
          closeCreateModal={closeModal}
        />
      </Box>
    </TeacherProvider>
  );
}
