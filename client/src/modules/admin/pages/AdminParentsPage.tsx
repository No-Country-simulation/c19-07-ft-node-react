import { Box } from "@mui/material";
import { ParentProvider } from "../contexts";

import { useModal } from "../hooks";
import { AddButton, ParentTable, ParentSearchBar } from "../components";

export default function AdminParentsPage() {
  const { openModal, closeModal, modalState } = useModal();

  return (
    <ParentProvider>
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
          <ParentSearchBar />

          <AddButton onClick={() => openModal("create")} />
        </Box>

        <ParentTable
          openCreateModal={modalState.type === "create"}
          closeCreateModal={closeModal}
        />
      </Box>
    </ParentProvider>
  );
}
