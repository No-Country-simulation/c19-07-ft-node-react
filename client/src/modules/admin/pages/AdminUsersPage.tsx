import { ChangeEvent, useEffect, useState } from "react";

import { Box } from "@mui/material";
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

  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [roleFilter, setRoleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [userToEdit, setUserToEdit] = useState<
    | {
        user_id?: string;
        name: string;
        email: string;
        type_user: string;
        password: string;
      }
    | undefined
  >(undefined);
  const [userToDelete, setUserToDelete] = useState<{
    userId: string;
    userName: string;
  } | null>(null);

  // const [isDeleting, setIsDeleting] = useState(false);
  // const [isLoadingUserToEdit, setIsLoadingUserToEdit] = useState(false);

  // ? User creation or update
  const handleSetUserToEdit = (user: User) => {
    setOpenDialog(true);

    api.get(`/users/${user.user_id}`).then((res) => {
      const { user_id, name, email, password, type_user } = res.data;
      setUserToEdit({ user_id, name, email, password, type_user });
    });
  };

  const handleCloseUserDialog = () => {
    setOpenDialog(false);
    setUserToEdit(undefined);
  };

  const handleUpdateOrCreateUser = (userData: any) => {
    console.log(userData);

    if (userToEdit) {
      api.put(`/admin/update-user/${userToEdit.user_id}`, userData).then(() => {
        getUsers();
        enqueueSnackbar("User successfully updated!", { variant: "success" });
        setOpenDialog(false);
      });
    } else {
      api.post("/admin/create-user", userData).then(() => {
        getUsers();
        enqueueSnackbar("User successfully created!", { variant: "success" });
        setOpenDialog(false);
      });
    }
  };

  // ? User deletion
  const handleDeleteUser = (user: any) => {
    setOpenModal(true);
    setUserToDelete({ userId: user.user_id, userName: user.name });
  };

  const handleConfirmDeletion = () => {
    api.delete(`/admin/delete-user/${userToDelete?.userId}`).then(() => {
      setUsers(users.filter((user) => user.user_id !== userToDelete?.userId));
      setTotalItems((prev) => prev - 1);
      enqueueSnackbar("User successfully deleted!", { variant: "success" });
      setOpenModal(false);
    });
  };

  // ? Table pagination
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUsers = async () => {
    setIsLoading(true);

    api
      .get<UsersResponse>(
        `/admin/users?page=${
          page + 1
        }&limit=${rowsPerPage}&name=${nameFilter}&type-user=${roleFilter}`
      )
      .then((res) => {
        setUsers(res.data.data.items);
        setTotalItems(res.data.data.meta.totalItems);
        setIsLoading(false);
      });
  };

  // ? Data fetching
  useEffect(() => {
    getUsers();
  }, [page, rowsPerPage, roleFilter, nameFilter]);

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
        <SearchInput onChange={setNameFilter} />

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
      >
        {/* {userToEdit !== undefined &&  */}
        <UserForm userToEdit={userToEdit} onSubmit={handleUpdateOrCreateUser} />
        {/* } */}
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
