import { ChangeEvent, useEffect, useState } from "react";

import { Box } from "@mui/material";
import { useSnackbar } from "notistack";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  CustomForm,
  CustomTable,
  SearchInput,
  CustomDialog,
  CustomSelect,
  ConfirmModal,
} from "../../../components";
import { AddButton } from "../components";
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

const createFormFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  {
    name: "typeUser",
    label: "Role",
    // type: "select",
    select: [
      { value: "STUDENT", label: "Student" },
      { value: "PARENTS", label: "Parent" },
      { value: "PROFESSOR", label: "Teacher" },
      { value: "ADMIN", label: "Admin" },
    ],
  },
];

const editFormFields = [
  { name: "name", placeholder: "Name", type: "text" },
  { name: "email", placeholder: "Email", type: "email" },
];

const createUserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  typeUser: z.string().refine((value) => {
    return ["STUDENT", "PARENTS", "PROFESSOR", "AMDMIN"].includes(value);
  }),
});

const editUserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;
type EditUserFormData = z.infer<typeof editUserFormSchema>;

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
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);

  const [userToEdit, setUserToEdit] = useState<User | undefined>(undefined);
  const [userToDelete, setUserToDelete] = useState<{
    userId: string;
    userName: string;
  } | null>(null);

  // const [isDeleting, setIsDeleting] = useState(false);

  // ? Hook Forms
  const {
    reset: resetCreateForm,
    register: registerCreateForm,
    handleSubmit: handleSubmitCreateForm,
    formState: {
      errors: errorsCreateForm,
      isSubmitting: isSubmittingCreateForm,
    },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const {
    reset: resetEditForm,
    register: registerEditForm,
    setValue: setEditFormValues,
    handleSubmit: handleSubmitEditForm,
    formState: { errors: errorsEditForm },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserFormSchema),
  });

  // ? User creation or update
  const handleSetUserToEdit = (user: User) => {
    setUserToEdit(user);
    setOpenEditUserDialog(true);
    api.get(`/users/${user.user_id}`).then((res) => {
      setEditFormValues("name", res.data.name, { shouldDirty: true });
      setEditFormValues("email", res.data.email, { shouldDirty: true });
    });
  };

  const handleCloseEditUserDialog = () => {
    setUserToEdit(undefined);
    setOpenEditUserDialog(false);
    resetEditForm();
  };

  const onSubmitCreateForm: SubmitHandler<CreateUserFormData> = async (
    data
  ) => {
    console.log({ data });

    await api.post("/admin/create-user", data).then(() => {
      getUsers();
      enqueueSnackbar("User successfully created!", { variant: "success" });
      setOpenCreateUserDialog(false);
      resetCreateForm();
    });
  };

  const onSubmitEditForm: SubmitHandler<EditUserFormData> = async (data) => {
    if (userToEdit) {
      api.put(`/admin/update-user/${userToEdit.user_id}`, data).then(() => {
        getUsers();
        enqueueSnackbar("User successfully updated!", { variant: "success" });
        setOpenEditUserDialog(false);
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
    <Box p={2} height="auto" bgcolor="#e8e4e6" borderRadius={1}>
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

        <AddButton onClick={() => setOpenCreateUserDialog(true)} />
      </Box>

      {/* <Box height="100%" overflow="auto"> */}
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
      {/* </Box> */}

      {/* User creation form dialog */}
      <CustomDialog
        open={openCreateUserDialog}
        onClose={() => setOpenCreateUserDialog(false)}
        title="Create User"
      >
        <CustomForm
          formFields={createFormFields}
          submitButtonLabel="Create"
          register={registerCreateForm}
          errors={errorsCreateForm}
          onSubmit={handleSubmitCreateForm(onSubmitCreateForm)}
          isSubmitting={isSubmittingCreateForm}
        />
      </CustomDialog>

      {/* User edition form dialog */}
      <CustomDialog
        open={openEditUserDialog}
        onClose={handleCloseEditUserDialog}
        title="Edit User"
      >
        <CustomForm
          formFields={editFormFields}
          submitButtonLabel="Update"
          register={registerEditForm}
          errors={errorsEditForm}
          onSubmit={handleSubmitEditForm(onSubmitEditForm)}
        />
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
