import { Box } from "@mui/material";
import { UserProvider } from "../contexts/UserContext";

import { useModal } from "../hooks";
import { AddButton, UserTable, UserSearchBar } from "../components";

export default function AdminUsersPage() {
  const { openModal, closeModal, modalState } = useModal();

  return (
    <UserProvider>
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
          <UserSearchBar />

          <AddButton onClick={() => openModal("create")} />
        </Box>

        <UserTable
          openCreateModal={modalState.type === "create"}
          closeCreateModal={closeModal}
        />
      </Box>
    </UserProvider>
  );
}
