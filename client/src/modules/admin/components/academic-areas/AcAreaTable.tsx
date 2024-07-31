import { useState } from "react";

import { TablePagination } from "@mui/material";

import {
  CustomTable,
  ConfirmModal,
  CustomDialog,
} from "../../../../components";
import { acAreaTableColumns } from "../../constants";
import { useContextAcArea, useModal } from "../../hooks";
import { CreateAcAreaFormData, EditAcAreaFormData } from "../../schemas";

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
  const handleSubmitCreateForm = async (data: CreateAcAreaFormData) => {
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
      academic_area_id: row.academic_area_id,
      name: row.name,
      description: row.description,
      educational_level: row.educational_level,
    });
  };

  const handleSubmitEditForm = async (data: EditAcAreaFormData) => {
    console.log({ data });
    await updateAcArea(modalState.payload?.academic_area_id, data)
      .then((res) => {
        showStatusSnackbar(res);
        closeModal();
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

    await deleteAcArea(modalState.payload?.academic_area_id)
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
      actions={["edit"]}
      rows={acArea.data.items}
      columns={acAreaTableColumns}
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
      >
        <AcAreaEditForm
          acAreaToEdit={modalState.payload}
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
