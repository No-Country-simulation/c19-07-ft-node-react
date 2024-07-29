import { useState } from "react";

import { TablePagination } from "@mui/material";

import {
  CustomTable,
  ConfirmModal,
  CustomDialog,
} from "../../../../components";
import { userTableColumns } from "../../constants";
import { useContextUser, useModal } from "../../hooks";
import { CreateUserFormData, EditUserFormData } from "../../schemas";

import { UserEditForm } from "./UserEditForm";
import { UserCreateForm } from "./UserCreateForm";
import { showStatusSnackbar } from "../../../../helpers";

interface UserTableProps {
  openCreateModal: boolean;
  closeCreateModal: () => void;
}

export const UserTable = ({
  openCreateModal,
  closeCreateModal,
}: UserTableProps) => {
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  const { closeModal, openModal, modalState } = useModal();
  const { user, createUser, updateUser, deleteUser, filter, setFilter } =
    useContextUser();

  // ? User creation
  const handleSubmitCreateForm = async (data: CreateUserFormData) => {
    await createUser(data)
      .then((res) => {
        showStatusSnackbar(res);
        closeCreateModal();
      })
      .catch((error) => {
        showStatusSnackbar(error);
      });
  };

  // ? User update
  const handleEditUser = (row: any) => {
    openModal("edit", {
      user_id: row.user_id,
      name: row.name,
      email: row.email,
    });
  };

  const handleSubmitEditForm = async (data: EditUserFormData) => {
    await updateUser(modalState.payload?.user_id, data)
      .then((res) => {
        showStatusSnackbar(res);
        closeCreateModal();
      })
      .catch((error) => {
        showStatusSnackbar(error);
      });
  };

  // ? User deletion
  const handleDeleteUser = (row: any) => {
    openModal("delete", row);
  };

  const handleConfirmDeletion = async () => {
    setIsDeletingUser(true);

    await deleteUser(modalState.payload?.user_id)
      .then((res) => {
        showStatusSnackbar(res);
        closeModal();
        setIsDeletingUser(false);
      })
      .catch((error) => {
        setIsDeletingUser(false);
        showStatusSnackbar(error);
      });
  };

  // ? Pagination
  const handleChangePage = (_: any, newPage: number) => {
    setFilter((prev) => ({
      ...prev,
      page: String(newPage + 1),
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter((prev) => ({
      ...prev,
      limit: event.target.value,
      page: "1",
    }));
  };

  if (user === null) return <p>...cargando</p>;

  return (
    <CustomTable
      rows={user.data.items}
      columns={userTableColumns}
      onEdit={handleEditUser}
      onDelete={handleDeleteUser}
      isLoading={false}
    >
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        component="div"
        count={user.data.meta.totalItems}
        rowsPerPage={Number(filter.limit)}
        page={Number(filter.page) - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CustomDialog
        open={modalState.type === "edit"}
        onClose={closeModal}
        title="Edit User"
      >
        <UserEditForm
          userToEdit={modalState.payload}
          onSubmit={handleSubmitEditForm}
        />
      </CustomDialog>

      <CustomDialog
        open={openCreateModal}
        onClose={closeCreateModal}
        title="Create User"
      >
        <UserCreateForm onSubmit={handleSubmitCreateForm} />
      </CustomDialog>

      <ConfirmModal
        open={modalState.type === "delete"}
        isLoading={isDeletingUser}
        onClose={closeModal}
        confirmText={`Are you sure to delete the user "${modalState.payload?.name}"?`}
        onConfirm={handleConfirmDeletion}
      />
    </CustomTable>
  );
};
