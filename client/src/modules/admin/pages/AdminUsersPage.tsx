import { ChangeEvent, useEffect, useState } from "react";
import { UserProvider } from "../context/userContext";
import { Box, ExtendButton } from "@mui/material";
import { useSnackbar } from "notistack";

import {
  CustomTable,
  SearchInput,
  CustomDialog,
  CustomSelect,
  ConfirmModal,
} from "../../../components";
import { useAxiosPrivate } from "../../../hooks";
import { AddButton, UserForm } from "../components";
import { User, UsersResponse } from "../../../interfaces";
import { UserFormData } from "../components/users/UserForm";
import { usePaginate } from "../components/hooks/usePaginate";
import { TableUser } from "../components/users/Tableuser";
import { SearchBarUser } from "../components/users/SearchBarUser";
import { useModal } from "../components/hooks/useModal";

export const userTableColumns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "type_user", label: "Role" },
  { id: "state", label: "State" },
];
export const filterItems = [
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
interface IUserToEdit extends UserFormData {
  userId: string;
}
export default function AdminUsersPage() {
  const api = useAxiosPrivate();

  const { enqueueSnackbar } = useSnackbar();
  const { closeModal, openModal, modalState } = useModal();

  // ? User creation or update

  // ? Table pagination

  console.log("modalState userPage------>", modalState);
  return (
    <UserProvider>
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
          <SearchBarUser />
          <AddButton
            onClick={() => {
              console.log("estoy en el add button");
              openModal("create");
            }}
          />
        </Box>

        <TableUser />

        <CustomDialog
          open={modalState.type === "create"}
          onClose={closeModal}
          title={"Create User"}
        >
          <UserForm onSubmit={() => {}} />
        </CustomDialog>
      </Box>
    </UserProvider>
  );
}
