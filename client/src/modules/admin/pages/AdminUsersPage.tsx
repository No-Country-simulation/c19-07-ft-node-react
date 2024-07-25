import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import {
  AddButton,
  CustomTable,
  SearchInput,
  CustomDialog,
  CustomSelect,
  ConfirmModal,
} from "../../../components";
import { User } from "../../../interfaces";
import { useAxiosPrivate } from "../../../hooks";

const userTableColumns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "type_user", label: "Role" },
  { id: "state", label: "State" },
];

const filterItems = [
  {
    value: "",
    label: "All",
  },
  {
    value: "students",
    label: "Student",
  },
  {
    value: "professors",
    label: "Tearcher",
  },
  {
    value: "parents",
    label: "Parent",
  },
];

export default function AdminUsersPage() {
  const api = useAxiosPrivate();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<{
    userId: string;
    userName: string;
  } | null>(null);

  // ? User creation or update
  const handleSetUserToEdit = (user: User) => {
    setOpenDialog(true);
    setUserToEdit(user);
  };

  const handleCloseUserDialog = () => {
    setOpenDialog(false);
    setUserToEdit(null);
  };

  const handleUpdateOrCreateUser = (userData: any) => {
    // api.post("/users", userData).then((res) => {
    //   setUsers([...users, res.data]);
    //   setOpenDialog(false
  };

  // ? User deletion
  const handleDeleteUser = (user: any) => {
    setOpenModal(true);
    setUserToDelete({ userId: user.user_id, userName: user.name });
  };

  const handleConfirmDeletion = () => {
    console.log(userToDelete?.userId);
    // api.delete(`/users/${userToDelete?.userId}`).then(() => {
    //   setUsers(users.filter((user) => user.id !== userToDelete?.userId));
    //   setOpenModal(false);
    // });
  };

  useEffect(() => {
    setIsLoading(true);

    api.get<User[]>("/users").then((res) => {
      setUsers(res.data);
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
      >
        <SearchInput />

        <CustomSelect
          label="Select a role"
          items={filterItems}
          onChange={() => {}}
        />

        <AddButton
          label="Add"
          variant="outlined"
          sx={{ width: { xs: "100%", sm: "120px" }, ml: { xs: 0, sm: "auto" } }}
          onClick={() => setOpenDialog(true)}
        />
      </Box>

      <CustomTable
        totalCount={0}
        rows={users}
        columns={userTableColumns}
        isLoading={isLoading}
        onEdit={handleSetUserToEdit}
        onDelete={handleDeleteUser}
      />

      <CustomDialog
        open={openDialog}
        onClose={handleCloseUserDialog}
        title={userToEdit ? "Edit User" : "Create User"}
        btnLabel={userToEdit ? "Update" : "Create"}
      >
        {/* User Form here */}
      </CustomDialog>

      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        confirmText={`Are you sure to delete the user "${userToDelete?.userName}"?`}
        onConfirmDeletion={handleConfirmDeletion}
      />
    </Box>
  );
}
