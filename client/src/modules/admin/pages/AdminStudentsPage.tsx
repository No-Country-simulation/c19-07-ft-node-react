import { Box } from "@mui/material";
import { StudentProvider } from "../contexts";

import { useModal } from "../hooks";
import { AddButton, StudentTable, StudentSearchBar } from "../components";

export default function AdminStudentsPage() {
  const { openModal, closeModal, modalState } = useModal();

  return (
    <StudentProvider>
      <Box
        p={2}
        height="auto"
        maxHeight="100%"
        bgcolor="white"
        borderRadius={1}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          pb={2}
          gap={2}
        >
          <StudentSearchBar />

          <AddButton onClick={() => openModal("create")} />
        </Box>

        <StudentTable
          openCreateModal={modalState.type === "create"}
          closeCreateModal={closeModal}
        />
      </Box>
    </StudentProvider>
  );
}
