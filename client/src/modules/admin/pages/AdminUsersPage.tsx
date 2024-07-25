import { ChangeEvent, useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";

import {
  CustomTable,
  SearchInput,
  CustomDialog,
  CustomSelect,
  ConfirmModal,
} from "../../../components";
import { AddButton, UserForm } from "../components";
import { useAxiosPrivate } from "../../../hooks";
import { User, UsersResponse } from "../../../interfaces";

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

export default function AdminUsersPage() {
  const api = useAxiosPrivate();

  const debounceRef = useRef<NodeJS.Timeout>();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [roleFilter, setRoleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

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

  // const handleUpdateOrCreateUser = (userData: any) => {
  //   api.post("/users", userData).then((res) => {
  //     setUsers([...users, res.data]);
  //     setOpenDialog(false
  // };

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

  // ? Table pagination
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // ? Filtering
  const handleQueryChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setNameFilter(value);
    }, 500);
  };

  // ? Data fetching
  useEffect(() => {
    setIsLoading(true);

    api
      .get<UsersResponse>(
        `/admin/users?page=${page + 1}&limit=${rowsPerPage}&name=${nameFilter}`
      )
      .then((res) => {
        setUsers(res.data.data.items);
        setTotalItems(res.data.data.meta.totalItems);
        setIsLoading(false);
      });
  }, [api, page, rowsPerPage, roleFilter, nameFilter]);

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
        <SearchInput onChange={handleQueryChange} />

        <CustomSelect
          label="Select a role"
          items={filterItems}
          onChange={setRoleFilter}
        />

        <AddButton onClick={() => setOpenDialog(true)} />
      </Box>

      <CustomTable
        count={totalItems}
        rows={users}
        page={page}
        rowsPerPage={rowsPerPage}
        columns={userTableColumns}
        isLoading={isLoading}
        onEdit={handleSetUserToEdit}
        onDelete={handleDeleteUser}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <CustomDialog
        open={openDialog}
        onClose={handleCloseUserDialog}
        title={userToEdit ? "Edit User" : "Create User"}
        btnLabel={userToEdit ? "Update" : "Create"}
      >
        <UserForm onSubmit={(data) => console.log(data)} />
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
