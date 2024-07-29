import { useState } from "react";

import { TablePagination } from "@mui/material";

import {
  CustomTable,
  ConfirmModal,
  CustomDialog,
} from "../../../../components";
import { parentTableColumns } from "../../constants";
import { useContextTeacher, useModal } from "../../hooks";
import { CreateParentFormData, EditParentFormData } from "../../schemas";

import { TeacherEditForm } from "./TeacherEditForm";
import { TeacherCreateForm } from "./TeacherCreateForm";
import { showStatusSnackbar } from "../../../../helpers";

interface TeacherTableProps {
  openCreateModal: boolean;
  closeCreateModal: () => void;
}

export const TeacherTable = ({
  openCreateModal,
  closeCreateModal,
}: TeacherTableProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { closeModal, openModal, modalState } = useModal();
  const {
    teacher,
    filter,
    setFilter,
    createTeacher,
    updateTeacher,
    deleteTeacher,
  } = useContextTeacher();

  // ? Creation
  const handleSubmitCreateForm = async (data: CreateParentFormData) => {
    await createTeacher(data)
      .then((res) => {
        showStatusSnackbar(res);
        closeCreateModal();
      })
      .catch((error) => {
        showStatusSnackbar(error);
      });
  };

  // ? Update
  const handleEdit = (row: any) => {
    openModal("edit", {
      user_id: row.user_id,
      name: row.name,
      email: row.email,
    });
  };

  const handleSubmitEditForm = async (data: EditParentFormData) => {
    await updateTeacher(modalState.payload?.user_id, data)
      .then((res) => {
        showStatusSnackbar(res);
        closeCreateModal();
      })
      .catch((error) => {
        showStatusSnackbar(error);
      });
  };

  // ? Deletion
  const handleDelete = (row: any) => {
    openModal("delete", row);
  };

  const handleConfirmDeletion = async () => {
    setIsDeleting(true);

    await deleteTeacher(modalState.payload?.user_id)
      .then((res) => {
        showStatusSnackbar(res);
        closeModal();
        setIsDeleting(false);
      })
      .catch((error) => {
        setIsDeleting(false);
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

  if (teacher === null) return <p>Loading...</p>;

  return (
    <CustomTable
      rows={teacher.data.items}
      columns={parentTableColumns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isLoading={false}
    >
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        component="div"
        count={teacher.data.meta.totalItems}
        rowsPerPage={Number(filter.limit)}
        page={Number(filter.page) - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CustomDialog
        open={modalState.type === "edit"}
        onClose={closeModal}
        title="Edit Teacher"
        sx={{ width: "450px" }}
      >
        <TeacherEditForm
          userToEdit={modalState.payload}
          onSubmit={handleSubmitEditForm}
        />
      </CustomDialog>

      <CustomDialog
        open={openCreateModal}
        onClose={closeCreateModal}
        title="Create Teacher"
      >
        <TeacherCreateForm onSubmit={handleSubmitCreateForm} />
      </CustomDialog>

      <ConfirmModal
        open={modalState.type === "delete"}
        isLoading={isDeleting}
        onClose={closeModal}
        confirmText={`Are you sure to delete the teacher "${modalState.payload?.name}"?`}
        onConfirm={handleConfirmDeletion}
      />
    </CustomTable>
  );
};
