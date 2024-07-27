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
  const [typeForm, setTypeForm] = useState<{
    create: boolean;
    update: boolean;
    delete: boolean;
  }>({
    create: false,
    update: false,
    delete: false,
  });
  const { enqueueSnackbar } = useSnackbar();
  const { closeModal, openModal, modalState } = useModal();
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } =
    usePaginate(1, 1);
  const [totalItems, setTotalItems] = useState(0);
  const [roleFilter, setRoleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  /* const [openModal, setOpenModal] = useState(false); */
  const [openDialog, setOpenDialog] = useState(false);

  const [userToEdit, setUserToEdit] = useState<IUserToEdit | null>(null);
  const [userToDelete, setUserToDelete] = useState<{
    userId: string;
    userName: string;
  } | null>(null);

  // ? User creation or update
  const handleSetUserToEdit = (user: User) => {
    setTypeForm((prev) => ({
      ...prev,
      update: !prev.update,
    }));
    setOpenDialog(true);

    api.get(`/users/${user.user_id}`).then((res) => {
      const { user_id, name, email, password, type_user } = res.data;
      setUserToEdit({
        name,
        email,
        password,
        typeUser: type_user,
        userId: user_id,
      });
    });
  };

  const handleCloseUserDialog = () => {
    setOpenDialog(false);
    setUserToEdit(null);
  };

  const handleUpdateOrCreateUser = (userData: any) => {
    console.log(userData);

    if (userToEdit) {
      api.put(`/admin/update-user/${userToEdit.userId}`, userData).then(() => {
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
  const handleTyPeForm = (typeForm: {
    create: boolean;
    update: boolean;
    delete: boolean;
  }) => {
    if (typeForm.create) {
      return (
        <UserForm userToEdit={undefined} onSubmit={handleUpdateOrCreateUser} />
      );
    }
    if (typeForm.update && userToEdit !== null) {
      return (
        <UserForm userToEdit={userToEdit} onSubmit={handleUpdateOrCreateUser} />
      );
    }
  };
  // ? Data fetching
  /*  useEffect(() => {
    getUsers();
  }, [page, rowsPerPage, roleFilter, nameFilter]); */
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
        {/* <Box
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

          <AddButton
            onClick={() => {
              setTypeForm((prev) => ({
                ...prev,
                create: !prev.create,
              })),
                setOpenDialog(true);
            }}
          />
        </Box> */}
        <TableUser />
        {/* <CustomTable
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
      /> */}

        {/* <CustomDialog
          open={openDialog}
          onClose={handleCloseUserDialog}
          title={userToEdit ? "Edit User" : "Create User"}
        >
          {handleTyPeForm(typeForm)}
        </CustomDialog> */}
        <CustomDialog
          open={modalState.type === "create"}
          onClose={closeModal}
          title={"Create User"}
        >
          <UserForm onSubmit={() => {}} />
        </CustomDialog>

        {/* <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        confirmText={`Are you sure to delete the user "${userToDelete?.userName}"?`}
        onConfirmDeletion={handleConfirmDeletion}
      /> */}
      </Box>
    </UserProvider>
  );
}
