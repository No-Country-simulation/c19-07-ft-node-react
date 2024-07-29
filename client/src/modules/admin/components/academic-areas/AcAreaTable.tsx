import { useState } from "react";

import { TablePagination } from "@mui/material";

import {
  CustomTable,
  ConfirmModal,
  CustomDialog,
} from "../../../../components";
import { parentTableColumns } from "../../constants";
import { useContextAcArea, useModal } from "../../hooks";
import { CreateParentFormData, EditParentFormData } from "../../schemas";

import { AcAreaEditForm } from "./AcAreaEditForm";
import { AcAreaCreateForm } from "./AcAreaCreateForm";
import { showStatusSnackbar } from "../../../../helpers";

interface AcAreaTableProps {
  openCreateModal: boolean;
  closeCreateModal: () => void;
}

export const AcAreaTable = ({
  openCreateModal,
  closeCreateModal,
}: AcAreaTableProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { closeModal, openModal, modalState } = useModal();
  const {
    acArea,
    filter,
    setFilter,
    createAcArea,
    updateAcArea,
    deleteAcArea,
  } = useContextAcArea();

  // ? Creation
  const handleSubmitCreateForm = async (data: CreateParentFormData) => {
    await createAcArea(data)
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
    await updateAcArea(modalState.payload?.user_id, data)
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

    await deleteAcArea(modalState.payload?.user_id)
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

  if (acArea === null) return <p>Loading...</p>;

  return (
    <CustomTable
      rows={acArea.data.items}
      columns={parentTableColumns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isLoading={false}
    >
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        component="div"
        count={acArea.data.meta.totalItems}
        rowsPerPage={Number(filter.limit)}
        page={Number(filter.page) - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CustomDialog
        open={modalState.type === "edit"}
        onClose={closeModal}
        title="Edit Academic Area"
        sx={{ width: "450px" }}
      >
        <AcAreaEditForm
          userToEdit={modalState.payload}
          onSubmit={handleSubmitEditForm}
        />
      </CustomDialog>

      <CustomDialog
        open={openCreateModal}
        onClose={closeCreateModal}
        title="Create Academic Area"
      >
        <AcAreaCreateForm onSubmit={handleSubmitCreateForm} />
      </CustomDialog>

      <ConfirmModal
        open={modalState.type === "delete"}
        isLoading={isDeleting}
        onClose={closeModal}
        confirmText={`Are you sure to delete the academic area "${modalState.payload?.name}"?`}
        onConfirm={handleConfirmDeletion}
      />
    </CustomTable>
  );
};
