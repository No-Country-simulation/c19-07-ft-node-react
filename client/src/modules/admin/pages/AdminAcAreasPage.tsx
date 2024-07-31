import { Box } from "@mui/material";
import { AcAreaProvider } from "../contexts";

import { useModal } from "../hooks";
import { AddButton, AcAreaTable, AcAreaSearchBar } from "../components";

export default function AdminAcAreasPagePage() {
  const { openModal, closeModal, modalState } = useModal();

  return (
    <AcAreaProvider>
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
          <AcAreaSearchBar />

          <AddButton onClick={() => openModal("create")} />
        </Box>

        <AcAreaTable
          openCreateModal={modalState.type === "create"}
          closeCreateModal={closeModal}
        />
      </Box>
    </AcAreaProvider>
  );
}
